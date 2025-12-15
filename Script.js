const apiKey = "e2975f756ebe93b79bd7ad710b9e7c80"; 
const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

// Search on button click
searchBtn.addEventListener("click", fetchWeather);

// Search on Enter key
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") fetchWeather();
});

function fetchWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    resultDiv.innerHTML = "<p class='error'>⚠️ Please enter a city name</p>";
    return;
  }

  // Show loader
  resultDiv.innerHTML = "<p>Loading... ⏳</p>";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401) throw new Error("❌ Invalid API key. Please check your key.");
        if (response.status === 404) throw new Error("❌ City not found. Please check the name.");
        throw new Error(`❌ HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

      resultDiv.innerHTML = `
        <h3>${data.name}</h3>
        <img src="${icon}" alt="Weather icon" />
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>☁ Weather: ${data.weather[0].description}</p>
        <p>💨 Wind: ${data.wind.speed} km/h</p>
      `;
    })
    .catch((error) => {
      console.error(error.message);
      resultDiv.innerHTML = `<p class='error'>${error.message}</p>`;
    });
}
