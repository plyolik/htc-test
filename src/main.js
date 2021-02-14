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


const tabs = Array.from(document.querySelectorAll('.tab'));
const contents = Array.from(document.querySelector('.content').children)

function disableTabs() {
    tabs.forEach((tab) => {
        tab.classList.remove('tab--active')
    })
}

function hideContents() {
    contents.forEach((content) => {
        content.classList.add('display-none')
    })
}

function init() {
    tabs.forEach((tab) => {
        tab.addEventListener('click', ()=> {
            disableTabs()
            hideContents()
            tab.classList.add('.tab--active')
            contents[tabs.indexOf(tab)].classList.remove('display-none')
        })
    })
}

init()