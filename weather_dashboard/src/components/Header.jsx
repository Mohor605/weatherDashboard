import React from "react";

const Header = ({
  cities,
  activeCity,
  onSelectCity,
  onAddCity,
  onRemoveCity,
  unit,
  onToggleUnit,
  onLocate,
}) => {
  return (
    <header className="sc-header">
      <div className="sc-logo">
        <div className="sc-logo-icon">🌤</div>
        <div className="sc-logo-text">
          <span className="sc-logo-name">SkyCast</span>
          <span className="sc-logo-sub">WEATHER INTELLIGENCE</span>
        </div>
      </div>

      <div className="sc-city-tabs">
        {cities.map((city) => (
          <div
            key={city}
            className={`sc-city-tab ${activeCity === city ? "active" : ""}`}
            onClick={() => onSelectCity(city)}
          >
            <span className="sc-city-dot">✦</span>
            <span>{city}</span>
            {cities.length > 1 && (
              <button
                className="sc-city-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveCity(city);
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button className="sc-save-btn" onClick={onAddCity}>
          + Save
        </button>
      </div>

      <div className="sc-header-controls">
        <button className="sc-unit-btn" onClick={onToggleUnit}>
          °{unit}
        </button>
        <button className="sc-locate-btn" onClick={onLocate}>
          <span>📍</span> Locate
        </button>
      </div>
    </header>
  );
};

export default Header;
