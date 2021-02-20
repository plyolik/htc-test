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
import { Scrollbar } from './js/scrollbar'

document.addEventListener('DOMContentLoaded', Scrollbar.iniitialize('.scrollbar'));

const tabs = Array.from(document.querySelectorAll('.tab'));
const contents = Array.from(document.querySelectorAll('.content-item'));

const openModalBtn = document.querySelector('#open-modal');
const modal = new Modal(document.querySelector('.modal'));

const loginBtn = document.querySelector('.btn-modal > button');
const loginField = document.querySelector('#login-field');
const passwordField = document.querySelector('#password-field');
const name = document.querySelector('.username');

const regExp = new RegExp(/^(?=[a-zA-Zа-яА-Я0-9._\s\.]{8,20}$)/);

function validateUsername(username) {
    if (!username) {
        alert('Имя пользователя не может быть пустым');
        return false;
    }
    if (!regExp.test(username)) {
        alert('Некорректное имя пользовтеля');
        return false;
    }
    return true;
}

function validatePassword(password) {
    if (!password) {
        alert('Пароль не может быть пустым');
        return false;
    }
    if (!regExp.test(password)) {
        alert('Некорректный пароль');
        return false;
    }
    return true;
}

function login() {
    const username = loginField.value.trim();
    const password = passwordField.value.trim();

    if (!validateUsername(username) || !validatePassword(password)) {
        return;
    }

    localStorage.setItem('username', username);
    modal.toggle();
    loginField.value = '';
    passwordField.value = '';
    name.value = localStorage.getItem('username');
    toggleLoginBtn();
}

function changeUsername() {
    const username = name.value;
    if (!validateUsername(username)) {
        name.value = localStorage.getItem('username');
        return;
    }
    localStorage.setItem('username', username);
}

function disableTabs() {
    tabs.forEach((tab) => {
        tab.classList.remove('tab--active');
    });
}

function hideContents() {
    contents.forEach((content) => {
        content.classList.add('d-none');
    });
}

function toggleLoginBtn() {
    openModalBtn.classList.toggle('entry');
    openModalBtn.classList.toggle('btn-search');
    openModalBtn.textContent = openModalBtn.textContent === 'Выйти' ? 'Войти' : 'Выйти';
    name.classList.toggle('d-none');
}

function init() {
    const username = localStorage.getItem('username');
    if (username) {
        name.value = username;
        toggleLoginBtn();
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            disableTabs();
            hideContents();
            tab.classList.add('tab--active');
            contents[tabs.indexOf(tab)].classList.remove('d-none');
        });
    });

    openModalBtn.addEventListener('click', () => {
        const username = localStorage.getItem('username');
        if (username) {
            toggleLoginBtn();
            name.value = '';
            localStorage.removeItem('username');
        } else {
            modal.show();
        }
    });

    loginBtn.addEventListener('click', e => {
        e.preventDefault();
        login();
    });

    name.addEventListener('blur', changeUsername);
    name.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            console.log('a');
            e.preventDefault();
            name.blur();
        }
    });
}

init();