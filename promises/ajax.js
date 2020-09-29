
// to test the error case try making a mistake in the apiKey:
const apiKey = 'a34de04f885f931f03dd1307fae3f323';

const input = document.getElementsByTagName('input')[0];
let cityName = input.value;

document.addEventListener('DOMContentLoaded', function () {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=` + apiKey;
  get(url)
    .then(response => {
      console.log(response);
      successHandler(response);
    })
    .catch(err => failHandler(err));
});

const getWeatherBtn = document.getElementsByTagName('button')[0];
getWeatherBtn.addEventListener('click', function () {
  cityName = input.value;
  console.log('Getting weather in ' + cityName);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=` + apiKey;
  get(url)
    .then(response => {
      console.log(response);
      successHandler(response);
    })
    .catch(err => failHandler(err));
});

function get(url) {
  return new Promise(function (resolve, reject) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url);
    httpRequest.onload = function () {
      if (httpRequest.status === 200) {
        resolve(httpRequest.responseText);
      } else {
        reject(httpRequest.status);
      }
    }
    httpRequest.send();
  });
}

function tempToC(kelvin) {
  return (kelvin - 273.15).toFixed(0);
}

function successHandler(data) {
  const dataObj = JSON.parse(data);
  const weatherDiv = document.querySelector('#weather');
  const weatherFragment = `
  <h1>Weather</h1>
    <h2>
    <img src="http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png"
    alt="${dataObj.weather[0].description}"/>
      ${dataObj.name}
      </h2>
    <p>${tempToC(dataObj.main.temp)}&deg | ${dataObj.weather[0].description}</p>
    `
  weatherDiv.innerHTML = weatherFragment;
}

function failHandler(status) {
  const weatherDiv = document.querySelector('#weather');
  const message = status === 404 ? 'Country or city not found' : 'Error: Unauthorized';
  weatherDiv.innerHTML = `<h2 class="error">${message}</h2><h3>Status code: ${status}</h3>`;
}
