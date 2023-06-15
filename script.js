document.getElementById('search').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    
    const city = document.getElementById('cityInput').value;
    if (city) {
      getWeather(city);
    }
  });
  
  function getWeather(city) {
    const apiKey = '3265874a2c77ae4a04bb96236a642d2f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = '';
  
        if (data.cod === '404') {
          const errorMessage = document.createElement('p');
          errorMessage.textContent = 'City not found.';
          weatherDiv.appendChild(errorMessage);
          return;
        }
  
        const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
        const description = data.weather[0].description;
  
        const weatherIcon = document.createElement('img');
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  
        const temperatureElement = document.createElement('h2');
        temperatureElement.textContent = temperature + ' ℃';
  
        const descriptionElement = document.createElement('h4');
        descriptionElement.textContent = description;
  
        weatherDiv.appendChild(weatherIcon);
        weatherDiv.appendChild(temperatureElement);
        weatherDiv.appendChild(descriptionElement);
      })
      .catch(error => {
        console.log('Error:', error);
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = '<p>An error occurred while fetching weather data.</p>';
      });
  }
  