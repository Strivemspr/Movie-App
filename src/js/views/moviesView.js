import img from '../../img/logo.svg';

class popularMoviesView {
    _type;
    _data;
    _parentElement = document.querySelector('.movies');

    render(data) {
        this._data = data;

        const html = this.generateDOM();

        this._parentElement.insertAdjacentHTML('afterbegin', html);
    }

    
    loadSpinner() {
        const html = `
            <div class="loader">
                <img src="${img}" alt="Loader Image">
            </div>
        `   
        this._parentElement.insertAdjacentHTML('afterbegin', html);
    }

    clearDom() {
        this._parentElement.innerHTML = '';
    }

    setType(type) {
        this._type = type; 
    }

    generateDOM() {
        const html = `
            <div class="text-container">
                <h2 class="">${this._type}</h2>
                <h3>Movies</h3>
            </div>

            <div class="movies-container">
                ${this.renderMovieCards()}
            </div>
        `
        return html;
    }

    renderMovieCards() {
        return this._data.map(data => {
            const card = `
                <div class="main-card">
                    <a href="#${data.id}">
                        <div class="main-card-image">
                            <img src="${data.posterPath}" alt="Movie">
                        </div>
                        <div class="main-card-text">
                            <h3>${data.title}</h3>
                            <p>${data.genres.map(genre => genre).join(', ')}</p>
                        </div>
                    </a>
                    <div class="main-card-top-container">
                        <div class="main-card-rating">${data.voteAverage}/10</div>
                        <div class="main-card-icon icon-container animated">
                            <i class="far fa-heart icon-element fa-lg"></i>
                        </div>
                    </div>
                </div>
            `

            return card;
        }).join('');
    }
}

export default new popularMoviesView()