import React from "react";

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}) {
  return (
    <button
      className={`d4-btn d4-btn--${variant} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
