import { getWeatherInfo } from "../utils/weatherCodes.js";

const METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeatherByCoords(latitude, longitude) {
  const url = `${METEO_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&hourly=temperature_2m,weather_code&temperature_unit=celsius&timezone=auto`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }

    const data = await response.json();
    const current = data.current;
    const weatherInfo = getWeatherInfo(current.weather_code);

    // Build next 6 hours timeline
    const now = new Date();
    const hourly = [];
    const times = data.hourly.time;
    const temps = data.hourly.temperature_2m;
    const codes = data.hourly.weather_code;

    for (let i = 0; i < times.length && hourly.length < 6; i++) {
      const time = new Date(times[i]);
      if (time <= now) continue;
      const info = getWeatherInfo(codes[i]);
      hourly.push({
        time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        temp: Math.round(temps[i]),
        icon: info.icon,
        label: info.label
      });
    }

    return {
      current: {
        temp: Math.round(current.temperature_2m),
        condition: weatherInfo.label,
        description: weatherInfo.label,
        humidity: current.relative_humidity_2m,
        icon: weatherInfo.icon
      },
      hourly
    };

  } catch (err) {
    throw err;
  }
}
