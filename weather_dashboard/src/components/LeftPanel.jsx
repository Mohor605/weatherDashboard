import React, { useEffect, useState } from "react";
import { calcRealAQI, realAQILabel, realAQIColor } from "../api/weather";

const LeftPanel = ({ weather, airQuality, unit }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (d) =>
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const formatDate = (d) =>
    d
      .toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();

  const temp = weather
    ? unit === "C"
      ? Math.round(weather.main.temp)
      : Math.round((weather.main.temp * 9) / 5 + 32)
    : "--";

  const feelsLike = weather
    ? unit === "C"
      ? Math.round(weather.main.feels_like)
      : Math.round((weather.main.feels_like * 9) / 5 + 32)
    : "--";

  const high = weather
    ? unit === "C"
      ? Math.round(weather.main.temp_max)
      : Math.round((weather.main.temp_max * 9) / 5 + 32)
    : "--";

  const low = weather
    ? unit === "C"
      ? Math.round(weather.main.temp_min)
      : Math.round((weather.main.temp_min * 9) / 5 + 32)
    : "--";

  const pm25 = airQuality?.list?.[0]?.components?.pm2_5;
  const realAQI = calcRealAQI(pm25);
  const aqiLabel =
    realAQI != null ? `AQI ${realAQI} · ${realAQILabel(realAQI)}` : "N/A";
  const aqiColor =
    realAQI != null ? realAQIColor(realAQI) : "rgba(240,230,204,0.3)";

  return (
    <div className="sc-left-panel">
      <div className="sc-panel-glow" />

      {/* User Profile */}
      <div className="sc-user-profile">
        <div className="sc-avatar">👤</div>
        <div className="sc-user-info">
          <div className="sc-user-name">Mohor Banerjee</div>
          {weather && (
            <div className="sc-user-loc">
              <span className="sc-pin">📍</span>
              {weather.name}, {weather.sys.country}
            </div>
          )}
        </div>
      </div>

      {/* Clock */}
      <div className="sc-clock">
        <div className="sc-time">{formatTime(now)}</div>
        <div className="sc-date">{formatDate(now)}</div>
      </div>

      {/* Temperature */}
      <div className="sc-temp-main">
        <span className="sc-temp-value">{temp}</span>
        <span className="sc-temp-deg">°</span>
      </div>
      <div className="sc-temp-sub">
        {unit === "C" ? "CELSIUS" : "FAHRENHEIT"} · FEELS {feelsLike}°
      </div>
      <div className="sc-temp-range">
        <span className="sc-temp-high">↑ {high}°</span>
        <span className="sc-temp-sep"> · </span>
        <span className="sc-temp-low">↓ {low}°</span>
      </div>

      {/* Air Quality */}
      <div className="sc-aqi">
        <span className="sc-aqi-label">AIR QUALITY</span>
        <span className="sc-aqi-value" style={{ color: aqiColor }}>
          {realAQI != null && (
            <span className="sc-aqi-dot" style={{ background: aqiColor }} />
          )}
          {aqiLabel}
        </span>
      </div>
    </div>
  );
};

export default LeftPanel;
