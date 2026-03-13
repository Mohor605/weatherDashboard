import React from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';

const ForecastSection = () => {
  const forecastData = [
    { day: 'Mon', date: 'Nov 29', icon: <Sun size={32} />, high: 22, low: 15, humidity: 60, wind: 8 },
    { day: 'Tue', date: 'Nov 30', icon: <Cloud size={32} />, high: 20, low: 14, humidity: 65, wind: 10 },
    { day: 'Wed', date: 'Dec 01', icon: <CloudRain size={32} />, high: 18, low: 12, humidity: 75, wind: 12 },
    { day: 'Thu', date: 'Dec 02', icon: <Cloud size={32} />, high: 19, low: 13, humidity: 70, wind: 9 },
    { day: 'Fri', date: 'Dec 03', icon: <Sun size={32} />, high: 23, low: 16, humidity: 55, wind: 7 }
  ];

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">📅 5-Day Forecast</h3>
      
      <div className="forecast-cards">
        {forecastData.map((forecast, idx) => (
          <div key={idx} className="forecast-card">
            <div className="forecast-card-decorative"></div>

            <div className="forecast-day">{forecast.day}</div>
            <div className="forecast-date">{forecast.date}</div>
            
            <div className="forecast-icon">
              {forecast.icon}
            </div>
            
            <div className="forecast-temp">
              <span className="temp-max">{forecast.high}°</span>
              <span className="temp-divider">/</span>
              <span className="temp-min">{forecast.low}°</span>
            </div>
            
            <div className="forecast-details">
              <div className="forecast-detail-item">
                <span className="detail-icon">💧</span>
                <span>{forecast.humidity}%</span>
              </div>
              <div className="forecast-detail-item">
                <span className="detail-icon">💨</span>
                <span>{forecast.wind} km/h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;