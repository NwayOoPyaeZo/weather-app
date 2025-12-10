import React from "react";

export default function WeatherCard({ data, city }) {
  if (!data) return null;

  const temperature = data.temp;
  const humidity = data.humidity;
  const condition = data.description;
  const icon = data.icon;

  return (
    <div className="flex flex-col items-center text-center bg-blue-50 rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-semibold capitalize">{city}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={condition}
        className="w-24 h-24"
      />

      <p className="text-5xl font-bold mt-2">{temperature}°C</p>

      <p className="text-lg capitalize text-slate-600">{condition}</p>

      <div className="mt-4 text-sm text-slate-700">
        <p>Humidity: {humidity}%</p>
      </div>
    </div>
  );
}
