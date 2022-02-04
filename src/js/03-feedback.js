
import throttle from 'lodash.throttle';

// 1. Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, 
// в которых сохраняй текущие значения полей формы.Пусть ключом для хранилища будет строка "feedback-form-state".
// 2. При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. 
// В противном случае поля должны быть пустыми.
// 3. При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// 4. Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.


const form = document.querySelector('.feedback-form');
const message = document.querySelector('.feedback-form textarea');
const email = document.querySelector('.feedback-form input');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));
// email.addEventListener('input', onEmailInput);

const STORAGE_KEY = "feedback-form-state";



if (localStorage.getItem(STORAGE_KEY) !== null) {
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    populateTextarea(storage);
    console.log(localStorage.getItem(STORAGE_KEY));
    console.log(storage);
    }

function onFormInput(evt){
    
    if (evt.currentTarget !== null) {
        // console.log(evt.currentTarget);
        const { email, message } = evt.currentTarget;
         console.log(email, message);
        const inputElements = {
            email: email.value,
            message: message.value,
            
        }
        console.log(inputElements);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inputElements));
    }
}

function onFormSubmit(evt) {
  evt.preventDefault();
    if (message.value !== "" && email.value !== "") {
        console.log('Отправляем форму');
        evt.currentTarget.reset();
        localStorage.removeItem(STORAGE_KEY);
    }
}

function populateTextarea(savedMessageEmail) {

    email.value = savedMessageEmail.email;
    message.value = savedMessageEmail.message;
    console.log(savedMessageEmail);
  }
