export async function searchCities(query) {
  if (!query) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    query
  )}&count=10&language=en&format=json`;

  const res = await fetch(url);
  const data = await res.json();

  return data.results || [];
}
