class searchView {
    _parentElement = document.querySelector('.movies-pagination');

    handler(callback) {
        this._parentElement.addEventListener('click', function(e) {
            callback(e.target.dataset.page);
        })
    }

    renderButton(currentPage, totalPages) {
        console.log('currentPage :>> ', currentPage);
        console.log('totalPages :>> ', totalPages);

        const previousPage = currentPage - 1
        const nextPage = currentPage + 1;

        console.log('nextPage :>> ', nextPage);
        console.log('previousPage :>> ', previousPage);

        const previousButton = previousPage <= 0 ? '' : `
            <button class="btn btn--left" data-page="${previousPage}">
                <i class="fas fa-caret-left btn-icon-right"></i>
                ${`Page`} ${previousPage}
            </button>
        `

        const nextButton = nextPage > totalPages ? '' : `
            <button class="btn btn--right" data-page="${nextPage}">
                ${`Page`} ${nextPage}
                <i class="fas fa-caret-right btn-icon-left"></i>
            </button>  
        `

        const html = `
            ${previousButton}
            ${nextButton}
        `;

        this._parentElement.insertAdjacentHTML('afterbegin', html)
    }

    clearDom() {
        this._parentElement.innerHTML = '';
    }
}

export default new searchView()