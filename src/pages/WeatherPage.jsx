import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ErrorMessage from "../components/ErrorMessage";

/*
  Starter page:
  - accepts a city string
  - holds states for future use (weather, loading, error)
  - does NOT call any API yet
*/

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null); // will hold API result later
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (searchCity) => {
    // For now we just set city and clear errors; no API call yet.
    setCity(searchCity);
    setWeather(null);
    setError(null);
    setLoading(false);
    // placeholder behavior: show a demo message in WeatherCard
    // later we'll replace this with an actual fetch and setWeather(...)
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Weather Checker (Starter)</h1>

      <SearchBar onSearch={handleSearch} initialValue={city} />

      <div className="mt-6">
        {loading && <p>Loading…</p>}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && city && (
          <WeatherCard
            city={city}
            // placeholder data until we implement actual API
            data={weather}
            placeholder
          />
        )}

        {!city && (
          <p className="text-sm text-slate-500 mt-4">
            Enter a city name above and click Search. (No API call yet.)
          </p>
        )}
      </div>
    </div>
  );
}
