import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import NavTabs from "./components/NavTabs";
import LeftPanel from "./components/LeftPanel";
import CurrentWeather from "./components/CurrentWeather";
import ForecastView from "./components/ForecastView";
import DetailsView from "./components/DetailsView";
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchAirQuality,
  fetchWeatherByCoords,
} from "./api/weather";
import "./App.css";

const DEFAULT_CITIES = ["Panihati", "London", "Tokyo"];

const App = () => {
  const [cities, setCities] = useState(DEFAULT_CITIES);
  const [activeCity, setActiveCity] = useState(DEFAULT_CITIES[0]);
  const [activeTab, setActiveTab] = useState("current");
  const [unit, setUnit] = useState("C");
  const [searchInput, setSearchInput] = useState("");

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadWeather = useCallback(async (city) => {
    setLoading(true);
    setError("");
    try {
      const [w, f] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
      setWeather(w);
      setForecast(f);
      try {
        const aq = await fetchAirQuality(w.coord.lat, w.coord.lon);
        setAirQuality(aq);
      } catch {
        setAirQuality(null);
      }
    } catch (err) {
      setError(err.message || "Failed to load weather data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(activeCity);
  }, [activeCity, loadWeather]);

  const handleSearch = () => {
    const q = searchInput.trim();
    if (!q) return;
    if (!cities.includes(q)) setCities((prev) => [...prev, q]);
    setActiveCity(q);
    setSearchInput("");
  };

  const handleAddCity = () => {
    const city = prompt("Enter city name to save:");
    if (city && city.trim()) {
      const c = city.trim();
      if (!cities.includes(c)) setCities((prev) => [...prev, c]);
      setActiveCity(c);
    }
  };

  const handleRemoveCity = (city) => {
    const next = cities.filter((c) => c !== city);
    setCities(next);
    if (activeCity === city) setActiveCity(next[0] || "");
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setLoading(true);
        try {
          const w = await fetchWeatherByCoords(
            pos.coords.latitude,
            pos.coords.longitude,
          );
          const cityName = w.name;
          if (!cities.includes(cityName))
            setCities((prev) => [...prev, cityName]);
          setActiveCity(cityName);
        } catch {
          setError("Could not get location weather");
        } finally {
          setLoading(false);
        }
      },
      () => setError("Location access denied"),
    );
  };

  return (
    <div className="sc-app">
      {/* Animated background */}
      <div className="sc-bg">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="sc-particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              animationDuration: `${15 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <Header
        cities={cities}
        activeCity={activeCity}
        onSelectCity={setActiveCity}
        onAddCity={handleAddCity}
        onRemoveCity={handleRemoveCity}
        unit={unit}
        onToggleUnit={() => setUnit((u) => (u === "C" ? "F" : "C"))}
        onLocate={handleLocate}
      />

      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {error && <div className="sc-error">⚠️ {error}</div>}
      {loading && (
        <div className="sc-loading">
          <div className="sc-spinner" /> Loading weather…
        </div>
      )}

      {!loading && (
        <div className="sc-main-layout">
          <LeftPanel weather={weather} airQuality={airQuality} unit={unit} />

          <div className="sc-right-area">
            {activeTab === "current" && (
              <CurrentWeather
                weather={weather}
                unit={unit}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                onSearch={handleSearch}
              />
            )}
            {activeTab === "forecast" && (
              <ForecastView forecast={forecast} unit={unit} />
            )}
            {activeTab === "details" && (
              <DetailsView
                weather={weather}
                airQuality={airQuality}
                unit={unit}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
