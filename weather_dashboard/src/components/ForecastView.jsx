import React from "react";
import { getWeatherIcon } from "../api/weather";

const ForecastView = ({ forecast, unit }) => {
  if (!forecast) {
    return (
      <div className="sc-forecast-empty">
        <p>Loading forecast...</p>
      </div>
    );
  }

  // Pick one entry per day (noon time preferred)
  const dailyMap = {};
  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    const hour = parseInt(item.dt_txt.split(" ")[1]);
    if (
      !dailyMap[date] ||
      Math.abs(hour - 12) <
        Math.abs(parseInt(dailyMap[date].dt_txt.split(" ")[1]) - 12)
    ) {
      dailyMap[date] = item;
    }
  });

  const days = Object.values(dailyMap).slice(0, 5);

  const toUnit = (c) =>
    unit === "C" ? Math.round(c) : Math.round((c * 9) / 5 + 32);

  const formatDay = (dtTxt) => {
    const d = new Date(dtTxt);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="sc-forecast-view">
      <h3 className="sc-section-title">📅 5-Day Forecast</h3>
      <div className="sc-forecast-grid">
        {days.map((item, i) => {
          const cond = item.weather[0].main;
          const icon = item.weather[0].icon;
          const emoji = getWeatherIcon(cond, icon);
          return (
            <div key={i} className="sc-forecast-card">
              <div className="sc-fc-glow" />
              <div className="sc-fc-day">{formatDay(item.dt_txt)}</div>
              <div className="sc-fc-emoji">{emoji}</div>
              <div className="sc-fc-cond">{cond}</div>
              <div className="sc-fc-temps">
                <span className="sc-fc-high">
                  {toUnit(item.main.temp_max)}°
                </span>
                <span className="sc-fc-sep"> / </span>
                <span className="sc-fc-low">{toUnit(item.main.temp_min)}°</span>
              </div>
              <div className="sc-fc-meta">
                <span>💧 {item.main.humidity}%</span>
                <span>💨 {Math.round(item.wind.speed * 3.6)} km/h</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastView;
