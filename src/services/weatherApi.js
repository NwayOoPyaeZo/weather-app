import { getWeatherInfo } from "../utils/weatherCodes.js";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeatherByCoords(latitude, longitude) {
  const url = `${METEO_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }

    const data = await response.json();
    const current = data.current;
    const weatherInfo = getWeatherInfo(current.weather_code);

    return {
      temp: Math.round(current.temperature_2m),
      condition: weatherInfo.label,
      description: weatherInfo.label,
      humidity: current.relative_humidity_2m,
      icon: weatherInfo.icon
    };

  } catch (err) {
    throw err;
  }
}

export async function fetchWeather(city) {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "City not found");
    }

    const data = await response.json();
    
    // Transform API response to match our WeatherCard expectations
    return {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      icon: data.weather[0].icon
    };

  } catch (err) {
    throw err;
  }
}
