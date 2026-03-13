import React from "react";
import { Cloud, Search, Wind, Eye, Droplets, MapPin } from "lucide-react";

const WeatherCard = ({
  weatherData,
  location,
  searchInput,
  setSearchInput,
  handleSearch,
  handleKeyPress,
}) => {
  return (
    <div className="weather-card-right">
      {/* Glass Effect Overlay */}
      <div className="glass-overlay"></div>

      {/* Weather Avatar Icon */}
      <div className="weather-icon-avatar">
        <Cloud size={50} strokeWidth={1.5} color="white" />
      </div>

      <div className="condition-display">{weatherData.condition}</div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search city..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          <Search size={20} />
        </button>
      </div>

      <div className="location-label">
        <MapPin size={16} /> {location}
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Temperature</span>
          <span className="detail-value">
            🌡️ {weatherData.temp}°C ({weatherData.condition})
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">
            <Droplets size={18} /> {weatherData.humidity}%
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">
            <Eye size={18} /> {weatherData.visibility} km
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">
            <Wind size={18} /> {weatherData.windSpeed} Km/h
          </span>
        </div>
      </div>

      <div className="developer-credit">| Developed by Mohor Banerjee |</div>
    </div>
  );
};

export default WeatherCard;
