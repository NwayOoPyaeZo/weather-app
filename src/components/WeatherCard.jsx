import React, { useState } from "react";

export default function WeatherCard({ data, city }) {
  const [iconError, setIconError] = useState(false);
  
  if (!data) return null;

  const temperature = data.temp;
  const humidity = data.humidity;
  const condition = data.description;
  const icon = data.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="flex flex-col items-center text-center rounded-2xl p-6 shadow-md" style={{ backgroundColor: "#124559" }}>
      <h2 className="text-xl font-semibold capitalize" style={{ color: "#EFF6E0" }}>{city}</h2>

      <div className="w-24 h-24 my-2 flex items-center justify-center rounded-lg" style={{ backgroundColor: "#AEC3B0" }}>
        {!iconError ? (
          <img
            src={iconUrl}
            alt={condition}
            className="w-20 h-20"
            onError={() => setIconError(true)}
          />
        ) : (
          <div className="text-3xl">🌤️</div>
        )}
      </div>

      <p className="text-5xl font-bold mt-2" style={{ color: "#EFF6E0" }}>{temperature}°C</p>

      <p className="text-lg capitalize" style={{ color: "#AEC3B0" }}>{condition}</p>

      <div className="mt-4 text-sm" style={{ color: "#EFF6E0" }}>
        <p>Humidity: {humidity}%</p>
      </div>
    </div>
  );
}
