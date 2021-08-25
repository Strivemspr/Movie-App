class searchView {
    _inputData;
    _parentElement = document.querySelector('.header-search-input');
    _buttonElement = document.querySelector('.header-search-icon')

    getInputData() {
        this._inputData = this._parentElement.value.trim();
        return this._inputData;
    }

    handler(callback) {
        this._buttonElement.addEventListener('click', function() {
            callback();
        })

        this._parentElement.addEventListener('keyup', function(e) {
            if(e.key === 'Enter' || e.keyCode === 13) {
                callback();
            } 
        })
    }

    clearInput() {
        this._parentElement.value = '';
    }
}

export default new searchView()