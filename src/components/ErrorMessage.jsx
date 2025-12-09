import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
      {message || "Something went wrong"}
    </div>
  );
}
