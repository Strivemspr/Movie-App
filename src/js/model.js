// Modules 
import {genreURL, genresURL, searchURL, moviesURL, imageURL} from './config';
import image from '../img/image.svg'

export const state = {
    movies: [],
    currentPage: 1,
    totalPages: 0,
    genres: [],
    type: '',
    genreId: 0,
    functionCaller: '',
}

export const getMovies = async (type, page = 1) => {
    if(!type) return;
    const getMoviesURL = `${moviesURL}${type.replace(' ','_')}?api_key=${process.env.API_KEY}&language=en-US&page=${page}`
    await getGenres();

    const res = await fetch(getMoviesURL);
    const data = await res.json();

    const movies = createMovieObject(data);

    state.functionCaller = 'getMovies';
    state.type = type.replace('_', ' ');
    state.movies = movies;
    state.totalPages = data.total_pages;
    state.currentPage = data.page;

    console.log('state :>> ', state);

}

export const searchMovie = async (query, page = 1) => {
    if(!query) return;

    const getMovieURL = `${searchURL}?api_key=${process.env.API_KEY}&language=en-US&page=${page}&include_adult=false&query=${query}`

    const res = await fetch(getMovieURL);
    const data = await res.json();

    const movies = createMovieObject(data);

    state.functionCaller = 'searchMovie';
    state.type = query;
    state.movies = movies;
    state.totalPages = data.total_pages;
    state.currentPage = data.page;

    console.log('state :>> ', state);
}

export const getGenres = async() => {
    const genresFullURL = `${genresURL}list?api_key=${process.env.API_KEY}&language=en-US`

    const res = await fetch(genresFullURL);
    const data = await res.json();

    state.genres = data.genres;
}

export const getGenre = async(genre_id, page = 1) => {
    const genreFullURL = `${genreURL}?api_key=${process.env.API_KEY}&language=en-US&page=${page}&with_genres=${genre_id}`

    const res = await fetch(genreFullURL);
    const data = await res.json();

    const movies = createMovieObject(data)

    const {name} = state.genres.find(genre => genre.id === genre_id);

    state.genreId = genre_id;
    state.functionCaller = 'getGenre';
    state.type = name;
    state.movies = movies
    state.totalPages = data.total_pages;
    state.currentPage = data.page;

    console.log('state :>> ', state);
}

export const functionCaller = async (page) => {
    if(!page) return;
    if(state.functionCaller === 'getMovies') {
        await getMovies(state.type, page)
    }
    if(state.functionCaller === 'searchMovie') {
        await searchMovie(state.type, page)
    }
    if(state.functionCaller === 'getGenre') {
        await getGenre(state.genreId, page)
    }
}

// Complementary Functions


const createMovieObject = (data) => {
    const movies = data.results.map(movie => {
        // Get genres for each specific movie
        const genres = movie.genre_ids.map(id => {
            const movieGenres = state.genres.filter(genre => genre.id === id).map(genre => genre.name);
            const [name] = movieGenres; 
            return name;
        })

        return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            posterPath: movie.poster_path ? `${imageURL}${movie.poster_path}` : image,
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average,
            genres,
        }
    });

    return movies;
}