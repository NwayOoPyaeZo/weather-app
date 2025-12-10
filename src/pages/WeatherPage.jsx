import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ErrorMessage from "../components/ErrorMessage";
import { fetchWeather } from "../services/weatherApi";

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
      const data = await fetchWeather(searchCity);
      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Weather Checker</h1>

      {!weather && (
        <SearchBar onSearch={handleSearch} />
      )}

      <div className="mt-6">
        {loading && <p>Loading…</p>}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && weather && (
          <>
            <WeatherCard
              city={city}
              data={weather}
            />
            <button
              onClick={() => {
                setWeather(null);
                setCity("");
                setError(null);
              }}
              className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg hover:opacity-95 w-full"
            >
              Search Another City
            </button>
          </>
        )}

        {!weather && !loading && !error && (
          <p className="text-sm text-slate-500 mt-4">
            Enter a city name above.
          </p>
        )}
      </div>
    </div>
  );
}
