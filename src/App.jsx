import React from "react";
import WeatherPage from "./pages/WeatherPage";

export default function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "radial-gradient(circle at 50% 20%, #598392, #124559, #01161E)",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="w-full max-w-2xl">
        <WeatherPage />
      </div>
    </div>
  );
}