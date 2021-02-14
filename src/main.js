import './scss/style.scss'
import 'bootstrap'
import { Modal } from 'bootstrap/dist/js/bootstrap'
import './images/logo/sign.png'
import './images/logo/vector.png'
import './images/posters/hollywood.png'
import './images/posters/batmen.png'
import './images/posters/cat.png'
import './images/posters/striptease.png'
import './images/icons/one.png'
import './images/icons/2x2.png'
import './images/icons/amedia.png'
import './images/icons/rbc.png'


const tabs = Array.from(document.querySelectorAll('.tab'));
const contents = Array.from(document.querySelector('.content').children)

const openModalBtn = document.querySelector('#open-modal')
const modal = new Modal(document.querySelector('#exampleModal'))

const loginBtn = document.querySelector('.btn-modal > button')
const loginInput = document.querySelector('#login-field')

function login() {
    const str = loginInput.value
    if (!str) {
        alert('error')
        return
    }
    localStorage.setItem('username', str)
    modal.toggle()
}

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
            tab.classList.add('tab--active')
            contents[tabs.indexOf(tab)].classList.remove('display-none')
        })
    })

    openModalBtn.addEventListener('click', () => {
        modal.show()
    })

    loginBtn.addEventListener('click', e => {
        e.preventDefault();
        login()
    })
}

init()