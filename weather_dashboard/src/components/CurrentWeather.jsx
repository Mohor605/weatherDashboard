import React from "react";
import { getWeatherIcon } from "../api/weather";

const CurrentWeather = ({
  weather,
  unit,
  searchInput,
  setSearchInput,
  onSearch,
}) => {
  const condition = weather?.weather?.[0]?.main || "Clear";
  const description = weather?.weather?.[0]?.description || "";
  const iconCode = weather?.weather?.[0]?.icon || "01d";
  const emoji = getWeatherIcon(condition, iconCode);

  const temp = weather
    ? unit === "C"
      ? Math.round(weather.main.temp)
      : Math.round((weather.main.temp * 9) / 5 + 32)
    : "--";

  const humidity = weather?.main?.humidity ?? "--";
  const visibility = weather ? (weather.visibility / 1000).toFixed(0) : "--";
  const windSpeed = weather ? Math.round(weather.wind.speed * 3.6) : "--";

  const capitalize = (s) =>
    s ? s.replace(/\b\w/g, (c) => c.toUpperCase()) : "";

  return (
    <div className="sc-right-panel">
      {/* Weather Icon */}
      <div className="sc-weather-icon-wrap">
        <div className="sc-weather-glow" />
        <div className="sc-weather-emoji">{emoji}</div>
      </div>

      {/* Condition */}
      <div className="sc-condition">{condition}</div>
      <div className="sc-condition-sub">{capitalize(description)}</div>

      {/* Search */}
      <div className="sc-search-bar">
        <input
          type="text"
          className="sc-search-input"
          placeholder="Search any city in the world..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        <button className="sc-search-btn" onClick={onSearch}>
          <span>🔍</span>
        </button>
      </div>

      {/* Location */}
      {weather && (
        <div className="sc-right-location">
          <span className="sc-pin">📍</span>
          {weather.name}, {weather.sys.country}
        </div>
      )}

      {/* Details */}
      <div className="sc-details-list">
        <div className="sc-detail-row">
          <span className="sc-detail-icon">🌡️</span>
          <span className="sc-detail-name">Temperature</span>
          <span className="sc-detail-val">
            {temp}°{unit} · {capitalize(description)}
          </span>
        </div>
        <div className="sc-detail-row">
          <span className="sc-detail-icon">💧</span>
          <span className="sc-detail-name">Humidity</span>
          <span className="sc-detail-val">{humidity}%</span>
        </div>
        <div className="sc-detail-row">
          <span className="sc-detail-icon">👁️</span>
          <span className="sc-detail-name">Visibility</span>
          <span className="sc-detail-val">{visibility} km</span>
        </div>
        <div className="sc-detail-row">
          <span className="sc-detail-icon">💨</span>
          <span className="sc-detail-name">Wind Speed</span>
          <span className="sc-detail-val">{windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
