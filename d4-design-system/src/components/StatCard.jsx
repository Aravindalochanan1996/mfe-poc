import React from "react";

export function StatCard({ label, value, trend, className = "" }) {
  const trendDirection = trend && trend.startsWith("-") ? "down" : "up";
  return (
    <div className={`d4-stat-card ${className}`.trim()}>
      <span className="d4-stat-card__label">{label}</span>
      <span className="d4-stat-card__value">{value}</span>
      {trend ? (
        <span className={`d4-stat-card__trend d4-stat-card__trend--${trendDirection}`}>
          {trendDirection === "up" ? "▲" : "▼"} {trend}
        </span>
      ) : null}
    </div>
  );
}
