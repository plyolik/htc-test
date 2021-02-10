import './scss/style.scss'
import 'bootstrap'
import './images/logo/sign.png'
import './images/logo/vector.png'
import './images/posters/hollywood.png'
import './images/posters/batmen.png'
import './images/posters/cat.png'
import './images/posters/striptease.png'
import './images/icons/one.png'
import './images/icons/2x2.png'
import './images/icons/amedia.png'
import './images/icons/fill1.png'
import './images/icons/fill2.png'

const contentMovies = document.getElementById('content-movies');
const contentTelevision = document.getElementById('content-television');
const activeContent = document.getElementById('video');
const passiveContent = document.getElementById('tele');

function moviesDisplay() {
    contentMovies.classList.remove('display-none')
    contentMovies.classList.add('display-block')
    activeContent.classList.add('tab--active')

    contentTelevision.classList.add('display-none')
    contentTelevision.classList.remove('display-block')
    passiveContent.classList.remove('tab--active')
}

function televosionDisplay() {
    contentMovies.classList.remove('display-block')
    contentMovies.classList.add('display-none')
    activeContent.classList.remove('tab--active')

    contentTelevision.classList.remove('display-none')
    contentTelevision.classList.add('display-block')
    passiveContent.classList.add('tab--active')
}

activeContent.addEventListener('click', () => {
    moviesDisplay()
})

passiveContent.addEventListener('click', () => {
    televosionDisplay()
})