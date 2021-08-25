class resultsView {
    _data;
    _parentElement = document.querySelector('.sidebar-menu');

    handler(callback) {
        this._parentElement.addEventListener('click', function(e) {
            // Get Link or Id from DOM target
            if(!(e.target.closest('.menu-link'))) return;
            const dataLink = e.target.closest('.menu-link').dataset.link;
            const dataId = e.target.closest('.menu-link').dataset.id;
            if(!(dataLink) && !(dataId)) return;
            
            // Send Link or ID
            if(dataLink) {
                callback(dataLink);
            } else if(dataId) {
                callback(+dataId);    
            }

            // Remove active class, Add Active Class
            const children = e.target.closest('.sidebar-menu').querySelectorAll('.menu-link');
            children.forEach(element => {
                element.classList.remove('active');
            });
            e.target.closest('.menu-link').classList.add('active');
        });
    }

    render(data) {
        this._data = data;

        const html = this.generateDOM();

        this._parentElement.insertAdjacentHTML('beforeend', html);
    }

    generateDOM() {
        const html = `
            <section class="sidebar-menu-genres">
                <h3>Genres</h3>
                <ul class="menu-genres">
                    ${this.generateLinks()}
                </ul>
            </section>
        `
        return html;
    }

    generateLinks() {
        return  this._data.map(data => {
            const link = `
                <li class="menu-link" data-id='${data.id}'>
                    <div class="icon-container small"><i class="fas fa-caret-right fa-sm icon-element"></i></div>
                    <a href="#">${data.name}</a>
                </li>
            `
            return link;
        }).join("");
    }
}

export default new resultsView();

//YvonneElora_1304
//144356
