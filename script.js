const apiKey = "5dec15232cec0fa9b96ac7cef2ef4593"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherBox = document.getElementById("weatherBox");

  if (city === "") {
    weatherBox.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) {
      weatherBox.innerHTML = `<p>City not found.</p>`;
      return;
    }

    const data = await res.json();
    const html = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Weather:</strong> ${data.weather[0].main} - ${data.weather[0].description}</p>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

    weatherBox.innerHTML = html;
  } catch (error) {
    console.error(error);
    weatherBox.innerHTML = `<p>Something went wrong. Try again later.</p>`;
  }
}
