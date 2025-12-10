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
                data={weather}
              />
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
