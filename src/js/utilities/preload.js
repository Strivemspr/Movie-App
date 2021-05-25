export const preload = function() {
    window.addEventListener('load', function() {
        const body = document.querySelector('body');
        body.classList.remove('preload');
    });
} 