import React from "react";

export function Sidebar({ children, className = "" }) {
  return <nav className={`d4-sidebar ${className}`.trim()}>{children}</nav>;
}

export function SidebarItem({
  icon,
  label,
  active = false,
  disabled = false,
  badge,
  onClick,
  className = "",
}) {
  const classes = [
    "d4-sidebar-item",
    active ? "d4-sidebar-item--active" : "",
    disabled ? "d4-sidebar-item--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      {icon ? <span className="d4-sidebar-item__icon">{icon}</span> : null}
      <span>{label}</span>
      {badge ? <span className="d4-sidebar-item__badge">{badge}</span> : null}
    </button>
  );
}

export function SidebarGroup({
  icon,
  label,
  active = false,
  expanded = false,
  disabled = false,
  onToggle,
  children,
  className = "",
}) {
  const classes = [
    "d4-sidebar-item",
    active ? "d4-sidebar-item--active" : "",
    disabled ? "d4-sidebar-item--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="d4-sidebar-group">
      <button
        type="button"
        className={classes}
        disabled={disabled}
        onClick={disabled ? undefined : onToggle}
      >
        {icon ? <span className="d4-sidebar-item__icon">{icon}</span> : null}
        <span>{label}</span>
        <span
          className={`d4-sidebar-group__chevron ${
            expanded ? "d4-sidebar-group__chevron--open" : ""
          }`.trim()}
        >
          ▸
        </span>
      </button>
      {expanded ? <div className="d4-sidebar-group__children">{children}</div> : null}
    </div>
  );
}
