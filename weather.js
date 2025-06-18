window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeather, err => {
      document.getElementById("weather-info").textContent = "Unable to get location.";
    });
  } else {
    document.getElementById("weather-info").textContent = "Geolocation not supported.";
  }
};

function fetchWeather(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Africa%2FJohannesburg`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const cw = data.current_weather;
      const temp = cw.temperature;
      const wind = cw.windspeed;
      const time = cw.time;
      document.getElementById("weather-info").innerHTML =
        `As of ${new Date(time).toLocaleTimeString('en-ZA')}, it’s ${temp}°C with a wind speed of ${wind} m/s.`;
    })
    .catch(() => {
      document.getElementById("weather-info").textContent = "Unable to retrieve weather data.";
    });
}
