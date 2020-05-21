// hamburger handle
const hamburger = document.querySelector('.navbar__hamburger')
const nav = document.querySelector('ul')
const hamburgerElements = document.querySelectorAll('.navbar__hamburger_item')

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburgerElements.forEach(element => {
        element.classList.toggle('cross')
    });
});

// Fetch - no reload
const content = document.querySelector('.content')


function fetching(url) {
    let address = window.location.href + url + '.html';
    content.classList.add('hidden');
    setTimeout(() => {
        fetch(address)
            .then(response => response.text())
            .then(html => content.innerHTML = html);
        setTimeout(() => { content.classList.remove('hidden') }, 200);
    }, 500);
}