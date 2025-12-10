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
          className="flex-1 p-3 pl-4 rounded-xl border-2 focus:outline-none transition-all duration-200"
          placeholder="Search for a city…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearchClick()}
          style={{
            backgroundColor: "#EFF6E0",
            borderColor: "#124559",
            color: "#01161E",
            fontSize: "15px"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#598392";
            e.target.style.boxShadow = "0 0 0 3px rgba(89, 131, 146, 0.2)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#124559";
            e.target.style.boxShadow = "none";
          }}
        />
        <button
          onClick={handleSearchClick}
          className="px-5 py-3 rounded-xl font-bold transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #01161E, #124559)",
            color: "#EFF6E0",
            boxShadow: "0 4px 15px rgba(1, 22, 30, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(1, 22, 30, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(1, 22, 30, 0.3)";
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>

      {results.length > 0 && (
        <ul 
          className="absolute w-full mt-3 rounded-xl border-2 shadow-2xl max-h-72 overflow-y-auto z-10 backdrop-blur-md animate-[slideDown_0.2s_ease-out]" 
          style={{ 
            backgroundColor: "rgba(239, 246, 224, 0.95)", 
            borderColor: "#124559",
            boxShadow: "0 10px 40px rgba(1, 22, 30, 0.3), 0 0 0 1px rgba(18, 69, 89, 0.1)"
          }}
        >
          {results.map((city, idx) => (
            <li
              key={idx}
              onClick={() => handleCityClick(city)}
              className="p-4 cursor-pointer border-b last:border-b-0 transition-all duration-200 hover:translate-x-1 flex items-center gap-2"
              style={{
                borderColor: "rgba(174, 195, 176, 0.3)",
                color: "#01161E"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(174, 195, 176, 0.6)";
                e.currentTarget.style.boxShadow = "inset 0 0 20px rgba(18, 69, 89, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0" style={{ color: "#124559" }}>
                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <span className="font-semibold text-base tracking-wide">{city.name}</span>
                {city.admin1 && <span className="text-sm ml-1" style={{ color: "#124559", opacity: 0.8 }}>, {city.admin1}</span>}
                {city.country && <span className="text-sm ml-1" style={{ color: "#598392", opacity: 0.7 }}>, {city.country}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}