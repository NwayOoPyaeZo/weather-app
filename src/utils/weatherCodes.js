export const weatherMap = {
  0: { label: "Clear sky", icon: "01d" },
  1: { label: "Mainly clear", icon: "02d" },
  2: { label: "Partly cloudy", icon: "02d" },
  3: { label: "Overcast", icon: "04d" },
  45: { label: "Foggy", icon: "50d" },
  48: { label: "Depositing rime fog", icon: "50d" },
  51: { label: "Light drizzle", icon: "09d" },
  53: { label: "Moderate drizzle", icon: "09d" },
  55: { label: "Dense drizzle", icon: "09d" },
  61: { label: "Slight rain", icon: "10d" },
  63: { label: "Moderate rain", icon: "10d" },
  65: { label: "Heavy rain", icon: "10d" },
  71: { label: "Slight snow", icon: "13d" },
  73: { label: "Moderate snow", icon: "13d" },
  75: { label: "Heavy snow", icon: "13d" },
  77: { label: "Snow grains", icon: "13d" },
  80: { label: "Slight rain showers", icon: "09d" },
  81: { label: "Moderate rain showers", icon: "10d" },
  82: { label: "Violent rain showers", icon: "10d" },
  85: { label: "Slight snow showers", icon: "13d" },
  86: { label: "Heavy snow showers", icon: "13d" },
  95: { label: "Thunderstorm", icon: "11d" },
  96: { label: "Thunderstorm with slight hail", icon: "11d" },
  99: { label: "Thunderstorm with heavy hail", icon: "11d" }
};

export function getWeatherInfo(code) {
  return weatherMap[code] || { label: "Unknown", icon: "01d" };
}

export function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
