import { useState, useEffect } from "react";
import { searchCities } from "../services/geocoding";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      const cities = await searchCities(query);
      setResults(cities);
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const handleCityClick = (city) => {
    onSearch(city.name);
    setQuery(city.name);
    setResults([]);
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setResults([]);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
          placeholder="Search for a city…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearchClick()}
        />
        <button
          onClick={handleSearchClick}
          className="px-4 py-3 bg-slate-800 text-white rounded-lg hover:opacity-95"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <ul className="absolute w-full bg-white mt-2 rounded-lg border border-slate-200 shadow-lg max-h-64 overflow-y-auto z-10">
          {results.map((city, idx) => (
            <li
              key={idx}
              onClick={() => handleCityClick(city)}
              className="p-3 hover:bg-slate-100 cursor-pointer border-b border-slate-100 last:border-b-0"
            >
              <span className="font-medium">{city.name}</span>
              {city.admin1 && <span className="text-slate-600">, {city.admin1}</span>}
              {city.country && <span className="text-slate-500 text-sm">, {city.country}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
