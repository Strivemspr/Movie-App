// SCSS Webpack
import "../scss/main.scss";

// Preload
import { preload } from './utilities/preload';

function init() {
    preload();
}

init();

console.log('Hello From Controller');