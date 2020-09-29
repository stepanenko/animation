
let httpRequest = new XMLHttpRequest();

function get(url, success) {
  httpRequest.open('GET', url);
  httpRequest.onload = function() {
    success(httpRequest.responseText);
  }
  httpRequest.send();
}

function tempToF(kelvin) {
  return ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
}

function tempToC(kelvin) {
  return (kelvin - 273.15).toFixed(0);
}

function successHandler(data) {
  const dataObj = JSON.parse(data);
  const weatherDiv = document.querySelector('#weather');
  const weatherFragment = `
    <h1>Weather</h1>
    <h2 class="top">
      <img
        src="http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png"
        alt="${dataObj.weather[0].description}"
        width="50"
        height="50"
      />${dataObj.name}
    </h2>
    <p>
      <span>${tempToC(dataObj.main.temp)}&deg;</span> | ${dataObj.weather[0].description}
    </p>
    `
  weatherDiv.innerHTML = weatherFragment;
}

document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'a34de04f885f931f03dd1307fae3f323';
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=lviv&APPID=' + apiKey;
  
  get(url, successHandler);
});
