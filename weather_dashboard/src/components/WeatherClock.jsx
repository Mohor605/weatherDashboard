import React from 'react';
import { Calendar } from 'lucide-react';

const WeatherClock = ({ currentTime }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="weather-clock">
      <div className="time-display">
        <div className="clock-icon">⏰</div>
        <div className="time-text">{formatTime(currentTime)}</div>
      </div>
      
      <div className="date-display">
        <Calendar size={18} color="rgba(255, 255, 255, 0.95)" />
        <div className="date-text">{formatDate(currentTime)}</div>
      </div>
    </div>
  );
};

export default WeatherClock;