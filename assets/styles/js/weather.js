const API_KEY = '4d0acb5c587ea09e45d027229439b325';

const inputSearchCity = document.getElementById('inputSearchCity');
const searchWeatherButton = document.getElementById('searchWeatherButton')
const errorWeather = document.getElementById('errorWeather')
const errorInput = document.getElementById('errorInput')
const resultWeather = document.getElementById('resultWeather')
const imageWeather  = document.getElementById('imageWeather')

let cityName;

function checkInputValue() {
    cityName = inputSearchCity.value.trim();
    if (cityName === '') {
        searchWeatherButton.disabled = true;
    }
     else {
        searchWeatherButton.disabled = false;
    }
}



// Обработка события загрузки страницы
window.addEventListener('load', checkInputValue);

// Обработка события ввода в поле inputSearchCity
inputSearchCity.addEventListener('input', checkInputValue);
inputSearchCity.addEventListener('blur', checkInputValue);

function displayWeatherData(element) {
    const fileNames = {
        Clouds: 'clouds',
        Clear: 'clear',
        Rain: 'rain',
        Mist: 'mist',
        Drizzle: 'drizzle',
        Snow: 'snow',
    };

    const imgSrc = fileNames[element.main] ?
        `src="/assets/pictures/weather/${fileNames[element.main]}.png"` : '';
        console.log(imgSrc)

    const html = `
    <p class="weather__description" id="cityName">${element.name}</p>
        <div class="weatherDetails">
        <h2 class="weather__description temperature" id="cityTemp">${element.temperature}C</h2>
            <img class="weather__description imageWeather" id="imageWeather" ${imgSrc}/>
        </div>
        <p class="weather__description" id="cityMain">${element.main}</p>
    `;
    return html;
}


//для погоды
const cityNameText = document.getElementById('cityName')



searchWeatherButton.addEventListener('click', () => showWeather(cityName));


let lat;
let lon;
let geo;
let weatherDataJson;

async function getGeo(name){
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Request failed');
        }
        const data = await response.json();
        lat = data[0].lat;
        lon = data[0].lon; 
        geo = {lat, lon};
        return geo;
    } catch (error) {
        errorWeather.innerHTML = error + 'Ой ой, кажется стоит заменить ваш город, символы недопустимы';
        return Promise.reject(error);
    }
 }

async function getWeather(name){
    
    try {
        let geoData = await getGeo(name);

        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&appid=${API_KEY}`);
        if (!weatherResponse.ok) {
            throw new Error('Request failed');
        }
        
        const weatherData = await weatherResponse.json();
        weatherDataJson = {
            "name":weatherData.name,
            "main":weatherData.weather[0].main,
            "temperature": Math.ceil(weatherData.main.temp - 273.15),
            "humidity":weatherData.main.humidity,
            "speed": weatherData.wind.speed
        }



        return weatherDataJson;
        
    } catch(error) {
        errorWeather.innerHTML ='Ошибка: ' + error 
    }
}


async function showWeather(cityName){

    try {
        let geoData = await getGeo(cityName); 
        if (geoData) { 
            let weatherData = await getWeather(cityName); 
            console.log(displayWeatherData(weatherData))
            resultWeather.innerHTML = displayWeatherData(weatherData);
            inputSearchCity.value = '';
        } else {
            errorWeather.innerHTML = 'Ошибка в получении гео-данных';
        }
    } catch(error) {
        errorWeather.innerHTML = 'Ошибка: ' + error; 
    }
 }

 async function showDefaultCity(){
    let defaultCity = 'Москва';
    try {
        let geoData = await getGeo(defaultCity); 
        if (geoData) { 
            let weatherData = await getWeather(defaultCity); 
            console.log(displayWeatherData(weatherData))
            resultWeather.innerHTML = displayWeatherData(weatherData);
        } else {
            errorWeather.innerHTML = 'Ошибка в получении гео-данных';
        }
    } catch(error) {
        errorWeather.innerHTML = 'Ошибка: ' + error; 
    }
}

window.addEventListener('load', showDefaultCity);

searchWeatherButton.addEventListener('click', () => {
    
    if (cityName!=='') {
        showWeather(cityName);
    } else {
       console.log('что-то не так')
    }


});

