var cityInput= document.getElementById('city-input');
cityInput.addEventListener('input',() => {
var city = document.getElementById('city-input').value;
if (city.length > 1) { 
  getWeatherData(city);
}
});

function getWeatherData(city) {
var apiKey = '7f6eebc539824f12a5e83148242009';
var apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
console.log(apiUrl);

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    displayWeather(data);
  })
  .catch(error => console.log('Error:', error));
  console.log(apiUrl.name)
}

function displayWeather(data) {
var weatherContainer = document.getElementById('weather-container');
weatherContainer.innerHTML = ''; 
data.forecast.forecastday.forEach(day => {
  var date = new Date(day.date);
  var dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  var cityName = data.location.name;
  var condition = day.day.condition.text;
  var windSpeed = day.day.maxwind_kph;
  var precipitation = day.day.daily_chance_of_rain;
  var iconUrl = day.day.condition.icon;

  var weatherCard = `
<div class="col-md-4">
    <div class="item1 text-white ">
      <div class="day d-flex justify-content-between p-2">
        <span>${dayName}</span>
      </div>
      <div id="city" class="city pb-4 m-4">
        <h4>${cityName}</h4>
        <h1>${day.day.maxtemp_c}°C</h1>
        <h3>${day.day.mintemp_c}°C</h3>
          <img src="${iconUrl}" class="w-50">
        <span class="text">${condition}</span>
        <div class="icons">
          <ul class="d-flex">
            <li class="ms-1 p-1"><i class="fa-solid fa-umbrella"></i>${precipitation}%</li>
            <li class="ms-1 p-1"><i class="fa-solid fa-wind"></i>${windSpeed} km/h</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  `;
  weatherContainer.innerHTML += weatherCard;
});
}






