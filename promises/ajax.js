
// to test the error case try making a mistake in the apiKey:
const apiKey = 'a34de04f885f931f03dd1307fae3f323';

const input = document.getElementsByTagName('input')[0];
const weatherDiv = document.querySelector('#weather');
const locations = ['new+york', 'kyiv', 'paris', 'sydney'];
let cityInput = input.value;

document.addEventListener('DOMContentLoaded', function () {
  const urls = locations.map(city => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=` + apiKey;
  });

  Promise.all([get(urls[0]), get(urls[1]), get(urls[2]), get(urls[3])])
    .then(responses => {
      return responses.map(res => {
        return successHandler(res);
      });
    })
    .then(literals => {
      console.log(literals);
      weatherDiv.innerHTML = `<h1>Weather</h1>${literals.join('')}`
    })
    .catch(err => failHandler(err));
});

const getWeatherBtn = document.getElementsByTagName('button')[0];
getWeatherBtn.addEventListener('click', function () {
  cityInput = input.value;
  console.log('Getting weather in ' + cityInput);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&APPID=` + apiKey;
  get(url)
    .then(response => {
      weatherDiv.innerHTML = `<h1>Your Weather</h1>${successHandler(response)}`;
    })
    .catch(err => failHandler(err))
    .finally(() => {   // finally runs always, no matter if success or failure happens
      const infoBlock = document.createElement('h3');
      infoBlock.innerText = `You requested the weather in ${cityInput}`;
      document.body.appendChild(infoBlock);
    });
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
  const div = `
    <h2>
    <img src="http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png"
    alt="${dataObj.weather[0].description}"/>
      ${dataObj.name}
      </h2>
    <p>${tempToC(dataObj.main.temp)}&deg | ${dataObj.weather[0].description}</p>
    `;
  return div;
}

function failHandler(status) {
  const weatherDiv = document.querySelector('#weather');
  const message = status === 404 ? 'Country or city not found' : 'Error: Unauthorized';
  weatherDiv.innerHTML = `<h2 class="error">${message}</h2><h3>Status code: ${status}</h3>`;
}
