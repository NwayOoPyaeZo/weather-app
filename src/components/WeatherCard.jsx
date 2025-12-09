import React from "react";

/*
  Props:
  - city: string
  - data: object | null  (will be populated when we add API call)
  - placeholder: bool (true in starter)
*/

export default function WeatherCard({ city, data, placeholder = false }) {
  if (placeholder) {
    return (
      <div className="mt-4 p-4 border rounded-lg bg-slate-50">
        <h2 className="text-xl font-medium">{city}</h2>
        <p className="text-sm text-slate-600 mt-2">
          This is a placeholder weather card. We'll fetch and show real weather
          data in the next steps.
        </p>
      </div>
    );
  }

  if (!data) return null;

  // Example shape when API added later:
  // data = { temp: 28, condition: "Clear", humidity: 65, icon: "01d" }

  return (
    <div className="mt-4 p-4 border rounded-lg bg-white">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-xl font-medium">{city}</h2>
          <p className="text-sm text-slate-600">{data.condition}</p>
        </div>
        <div className="ml-auto text-right">
          <div className="text-3xl font-bold">{data.temp}°C</div>
          <div className="text-sm text-slate-500">Humidity: {data.humidity}%</div>
        </div>
      </div>
    </div>
  );
}
