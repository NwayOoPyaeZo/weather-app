import React from "react";
import WeatherPage from "./pages/WeatherPage";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <WeatherPage />
      </div>
    </div>
  );
}
