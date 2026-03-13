const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (city) => {
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
  );
  if (!res.ok) throw new Error(`City not found: ${city}`);
  return res.json();
};

export const fetchForecast = async (city) => {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
  );
  if (!res.ok) throw new Error(`Forecast not found: ${city}`);
  return res.json();
};

export const fetchAirQuality = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  );
  if (!res.ok) throw new Error("Air quality data unavailable");
  return res.json();
};

export const getAQILabel = (aqi) => {
  const labels = ["", "Pristine", "Fair", "Moderate", "Poor", "Hazardous"];
  return labels[aqi] || "Unknown";
};

export const getAQIColor = (aqi) => {
  const colors = ["", "#4ade80", "#a3e635", "#facc15", "#f97316", "#ef4444"];
  return colors[aqi] || "#888";
};

// Calculate real AQI (0-500) from PM2.5 using EPA breakpoints
export const calcRealAQI = (pm25) => {
  if (pm25 == null) return null;
  const bp = [
    [0, 12, 0, 50],
    [12.1, 35.4, 51, 100],
    [35.5, 55.4, 101, 150],
    [55.5, 150.4, 151, 200],
    [150.5, 250.4, 201, 300],
    [250.5, 350.4, 301, 400],
    [350.5, 500.4, 401, 500],
  ];
  for (const [cLo, cHi, iLo, iHi] of bp) {
    if (pm25 >= cLo && pm25 <= cHi) {
      return Math.round(((iHi - iLo) / (cHi - cLo)) * (pm25 - cLo) + iLo);
    }
  }
  return pm25 > 500 ? 500 : 0;
};

// AQI label from real 0-500 number
export const realAQILabel = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

// Color for real AQI
export const realAQIColor = (aqi) => {
  if (aqi <= 50) return "#4ade80";
  if (aqi <= 100) return "#facc15";
  if (aqi <= 150) return "#f97316";
  if (aqi <= 200) return "#ef4444";
  if (aqi <= 300) return "#c026d3";
  return "#991b1b";
};

export const getWeatherIcon = (condition, icon) => {
  const isDay = icon && icon.endsWith("d");
  const c = condition?.toLowerCase() || "";
  if (c.includes("clear")) return isDay ? "☀️" : "🌙";
  if (c.includes("cloud")) return "☁️";
  if (c.includes("rain") || c.includes("drizzle")) return "🌧️";
  if (c.includes("thunder")) return "⛈️";
  if (c.includes("snow")) return "❄️";
  if (c.includes("mist") || c.includes("haze") || c.includes("fog"))
    return "🌫️";
  return "🌤️";
};

export const fetchWeatherByCoords = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );
  if (!res.ok) throw new Error("Location weather unavailable");
  return res.json();
};
