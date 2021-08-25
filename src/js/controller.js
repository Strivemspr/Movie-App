// SCSS Webpack
import "../scss/main.scss";

// Preload
import { preload } from './utilities/preload';

// Modules
import { 
    getMovies,
    getGenres,
    getGenre,
    searchMovie,
    functionCaller,
    state,
} from './model';
import moviesView from "./views/moviesView";
import resultsView from './views/resultsView';
import searchView from "./views/searchView";
import paginationView from "./views/paginationView";

const paginationController = async (page) => {
    //Clear Dom
    moviesView.clearDom();
    paginationView.clearDom();
    
    //loadSpinner
    moviesView.loadSpinner();
    
    // Call Function
    await functionCaller(page);

    // Render Buttons
    paginationView.renderButton(state.currentPage, state.totalPages);

    // Set Type
    moviesView.setType(state.type);
    
    // Clear loader and dom
    moviesView.clearDom();
    
    // render data
    moviesView.render(state.movies);
}

const searchController = async () => {
    // Clear Dom
    moviesView.clearDom();
    paginationView.clearDom();

    // Load Spinner
    moviesView.loadSpinner();

    // Get Query
    const query = searchView.getInputData();

    // Get movies with query
    await searchMovie(query);

    // Render Buttons
    paginationView.renderButton(state.currentPage, state.totalPages);

    // Set Type
    moviesView.setType(state.type);

    // Clear Dom to clear the spinner
    moviesView.clearDom();

    // Render Movies
    moviesView.render(state.movies);
}

const displayGenresController = async () => {
    // get genres
    await getGenres();

    // render genre links
    resultsView.render(state.genres);
}

const moviesController = async (type) => {
    //Clear Dom
    moviesView.clearDom();
    paginationView.clearDom();
    
    //loadSpinner
    moviesView.loadSpinner();
    
    // fetch popular movies or movies depending on type
    if(typeof type === 'string') {
        await getMovies(type);
    }

    if(typeof type === 'number'){
        await getGenre(type)        
    }
    // Render Buttons
    paginationView.renderButton(state.currentPage, state.totalPages);

    // Set Type
    moviesView.setType(state.type);
    
    // Clear loader and dom
    moviesView.clearDom();
    
    // render data
    moviesView.render(state.movies);
}

async function init() {
    preload();
    displayGenresController();
    await moviesController('popular');
    resultsView.handler(moviesController);
    searchView.handler(searchController);
    paginationView.handler(paginationController);
}

init();