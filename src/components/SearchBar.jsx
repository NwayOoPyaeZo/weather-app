import React, { useState } from "react";

export default function SearchBar({ onSearch, initialValue = "" }) {
  const [input, setInput] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name (e.g., Bangkok)"
        className="flex-1 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
      />
      <button
        type="submit"
        className="px-4 py-3 bg-slate-800 text-white rounded-lg hover:opacity-95"
      >
        Search
      </button>
    </form>
  );
}
