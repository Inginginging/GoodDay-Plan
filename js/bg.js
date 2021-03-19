const body = document.querySelector("body");

const IMG_NUMBER = 2;


function paintBg(num){
    const image = new Image();
    image.src = `img/${num+1}.jpg`;
    image.classList.add("bgImg");
    body.prepend(image);
}

function getRandom(){
    const number = Math.floor(Math.random()*IMG_NUMBER);
    return number;
}

function init(){
    const imageNum = getRandom();
    paintBg(imageNum);
}

init();