import React from "react";

const DetailsView = ({ weather, airQuality, unit }) => {
  if (!weather)
    return <div className="sc-details-empty">Loading details...</div>;

  const aqi = airQuality?.list?.[0]?.main?.aqi;
  const components = airQuality?.list?.[0]?.components || {};

  const toUnit = (c) =>
    unit === "C" ? Math.round(c) : Math.round((c * 9) / 5 + 32);
  const aqiLabels = ["", "Pristine", "Fair", "Moderate", "Poor", "Hazardous"];

  const rows = [
    {
      icon: "🌡️",
      label: "Temperature",
      val: `${toUnit(weather.main.temp)}°${unit}`,
    },
    {
      icon: "🤔",
      label: "Feels Like",
      val: `${toUnit(weather.main.feels_like)}°${unit}`,
    },
    {
      icon: "↑",
      label: "Max Temp",
      val: `${toUnit(weather.main.temp_max)}°${unit}`,
    },
    {
      icon: "↓",
      label: "Min Temp",
      val: `${toUnit(weather.main.temp_min)}°${unit}`,
    },
    { icon: "💧", label: "Humidity", val: `${weather.main.humidity}%` },
    { icon: "🌬️", label: "Pressure", val: `${weather.main.pressure} hPa` },
    {
      icon: "👁️",
      label: "Visibility",
      val: `${(weather.visibility / 1000).toFixed(1)} km`,
    },
    {
      icon: "💨",
      label: "Wind Speed",
      val: `${Math.round(weather.wind.speed * 3.6)} km/h`,
    },
    { icon: "🧭", label: "Wind Direction", val: `${weather.wind.deg}°` },
    { icon: "☁️", label: "Cloud Cover", val: `${weather.clouds.all}%` },
    ...(aqi
      ? [{ icon: "🌿", label: "Air Quality", val: aqiLabels[aqi] || "Unknown" }]
      : []),
    ...(components.pm2_5
      ? [
          {
            icon: "🔬",
            label: "PM2.5",
            val: `${components.pm2_5.toFixed(1)} μg/m³`,
          },
        ]
      : []),
    ...(components.pm10
      ? [
          {
            icon: "🔬",
            label: "PM10",
            val: `${components.pm10.toFixed(1)} μg/m³`,
          },
        ]
      : []),
    ...(components.co
      ? [{ icon: "⚗️", label: "CO", val: `${components.co.toFixed(1)} μg/m³` }]
      : []),
  ];

  return (
    <div className="sc-details-view">
      <h3 className="sc-section-title">◆ Detailed Meteorology</h3>
      <div className="sc-details-grid">
        {rows.map((r, i) => (
          <div key={i} className="sc-dv-card">
            <span className="sc-dv-icon">{r.icon}</span>
            <span className="sc-dv-label">{r.label}</span>
            <span className="sc-dv-val">{r.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsView;
