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
          className="flex-1 p-3 rounded-lg border-2 focus:outline-none focus:ring-2"
          placeholder="Search for a city…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearchClick()}
          style={{
            backgroundColor: "#EFF6E0",
            borderColor: "#124559",
            color: "#01161E"
          }}
        />
        <button
          onClick={handleSearchClick}
          className="px-4 py-3 rounded-lg font-semibold transition-opacity hover:opacity-85"
          style={{
            backgroundColor: "#01161E",
            color: "#EFF6E0"
          }}
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <ul className="absolute w-full mt-2 rounded-lg border-2 shadow-lg max-h-64 overflow-y-auto z-10" style={{ backgroundColor: "#EFF6E0", borderColor: "#124559" }}>
          {results.map((city, idx) => (
            <li
              key={idx}
              onClick={() => handleCityClick(city)}
              className="p-3 cursor-pointer border-b last:border-b-0 transition-colors"
              style={{
                borderColor: "#AEC3B0",
                color: "#01161E"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#AEC3B0"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
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
