import React from "react";

const NavTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "current", label: "Current", icon: "☁" },
    { id: "forecast", label: "Forecast", icon: "🗓" },
    { id: "details", label: "Details", icon: "◆" },
  ];

  return (
    <div className="sc-nav-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`sc-nav-tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="sc-tab-icon">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NavTabs;
