const weather= document.querySelector(".js-weather");

const API_KEY="845cc270acaa973c468d09c17fb347c9";
const COORDS_LS="coords" 

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
       const tem=json.main.temp;
       const city=json.name;
       const weather=json.weather[0].main;
       weather.innerText =`${tem}℃<\n>${city}`;
    });
}

function saveLocation(obj){
    localStorage.setItem(COORDS_LS,JSON.stringify(obj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    coordsOgj={
        latitude,
        longitude
    }
    saveLocation(coordsOgj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    alert("지역 정보에 접근할 수 없습니다.")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
   const loadedCoords = localStorage.getItem(COORDS_LS);
   if(loadedCoords === null){
       askForCoords();
   }else{
     const parsedCoords = JSON.parse(loadedCoords);
     getWeather(parsedCoords.latitude,parsedCoords.longitude);
   }
}

function init(){
    loadCoords();
}

init();