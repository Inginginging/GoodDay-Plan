const form= document.querySelector('.js-form'),
    input=form.querySelector('input'),
    greeting=document.querySelector('.js-greeting');

const USER_LS = 'currentUser'; //localStorage의 key
const SHOW_CN = "showing";

function saveUserName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();  //submit의 default 값을 막음.
    const userName = input.value;  //사실상 userValue와 동일.
    paintUserName(userName);
    saveUserName(userName);
}

function askUserName(){
    form.classList.add(SHOW_CN);
    form.addEventListener("submit", handleSubmit)
}

function paintUserName(text){
    form.classList.remove(SHOW_CN);
    greeting.classList.add(SHOW_CN);
    greeting.innerText=`Welcome ${text}`;
}

function loadName(){
    const userValue = localStorage.getItem(USER_LS);
    if(userValue === null){
        askUserName();
    }else{
        paintUserName(userValue);
    }
}

function init() {
    loadName();
}

init();