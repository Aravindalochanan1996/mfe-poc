import React from "react";

const STATUS_VARIANTS = {
  Open: "info",
  "In Progress": "warning",
  Closed: "neutral",
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
  Active: "success",
  Inactive: "neutral",
  Available: "success",
  Unavailable: "neutral",
  Hired: "success",
  Sourced: "info",
  Screening: "warning",
  Interview: "warning",
  Offer: "info",
};

export function Badge({ children, variant, className = "" }) {
  const resolvedVariant = variant || STATUS_VARIANTS[children] || "neutral";
  return (
    <span className={`d4-badge d4-badge--${resolvedVariant} ${className}`.trim()}>
      {children}
    </span>
  );
}
