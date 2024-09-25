const apiKey = "97cf9fc7e7af474e03e49d34d3adf8fa"; // Replace with your OpenWeatherMap API key

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) throw new Error("City not found");

  return await response.json();
}

async function getForecast(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) throw new Error("City not found");

  return await response.json();
}

function updateUI(weatherData) {
  const weatherInfo = document.getElementById("weather-info");
  const {
    main: { temp },
    weather,
  } = weatherData;

  weatherInfo.innerHTML = `<h2>Current Temperature:</h2><p>${temp}°C</p><p>${weather[0].description}</p>`;
  weatherInfo.classList.add("visible"); // Add visible class for animation
}

function updateForecast(forecastData) {
  const forecastInfo = document.getElementById("forecast-info");

  const forecastList = forecastData.list.filter((_, index) => index % 8 === 0); // Get daily forecasts
  forecastInfo.innerHTML =
    "<h3>5-Day Forecast:</h3>" +
    forecastList
      .map(
        (day) =>
          `<p>${new Date(day.dt * 1000).toLocaleDateString()}: ${
            day.main.temp
          }°C, ${day.weather[0].description}</p>`
      )
      .join("");

  forecastInfo.classList.add("visible"); // Add visible class for animation
}

document.getElementById("search-btn").addEventListener("click", async () => {
  const city = document.getElementById("city-input").value.trim();

  try {
    const weatherData = await getWeather(city);
    updateUI(weatherData);

    const forecastData = await getForecast(city);
    updateForecast(forecastData);

    document.getElementById("city-input").value = ""; // Clear input field
  } catch (error) {
    alert(error.message);
  }
});
