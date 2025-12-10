import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ErrorMessage from "../components/ErrorMessage";
import { fetchWeatherByCoords } from "../services/weatherApi";
import { searchCities } from "../services/geocoding";

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(searchCity) {
    setCity(searchCity);
    setWeather(null);
    setError(null);
    setLoading(true);

    try {
      const cities = await searchCities(searchCity);
      if (!cities || cities.length === 0) {
        throw new Error("City not found");
      }

      const picked = cities[0];
      const displayName = [picked.name, picked.admin1, picked.country].filter(Boolean).join(", ");
      setCity(displayName);

      const data = await fetchWeatherByCoords(picked.latitude, picked.longitude);
      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-lg rounded-2xl p-8 w-full max-w-md" style={{ backgroundColor: "#EFF6E0" }}>
        <h1 className="text-3xl font-semibold mb-6 text-center" style={{ color: "#01161E" }}>Weather Checker</h1>

        {!weather && (
          <SearchBar onSearch={handleSearch} />
        )}

        <div className="mt-8">
          {loading && <p className="text-center">Loading…</p>}
          {error && <ErrorMessage message={error} />}

          {!loading && !error && weather && (
            <>
              <WeatherCard
                city={city}
                data={weather.current}
              />

              {weather.hourly?.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-3" style={{ color: "#01161E" }}>Next 6 hours</h2>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {weather.hourly.map((hour, idx) => (
                      <div
                        key={idx}
                        className="flex-none w-28 rounded-xl p-3 shadow"
                        style={{ backgroundColor: "#AEC3B0", color: "#01161E" }}
                      >
                        <div className="text-sm font-semibold">{hour.time}</div>
                        <div className="flex items-center justify-center my-2">
                          <img
                            src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
                            alt={hour.label}
                            className="w-12 h-12"
                          />
                        </div>
                        <div className="text-lg font-bold">{hour.temp}°C</div>
                        <div className="text-xs" style={{ color: "#01161E" }}>{hour.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setWeather(null);
                  setCity("");
                  setError(null);
                }}
                className="mt-6 px-6 py-3 bg-slate-800 text-white rounded-lg hover:opacity-95 w-full font-medium"
              >
                Search Another City
              </button>
            </>
          )}

          {!weather && !loading && !error && (
            <p className="text-sm text-slate-500 mt-6 text-center">
              Enter a city name above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
