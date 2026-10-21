import React from "react";

export function Card({ title, children, className = "", ...rest }) {
  return (
    <div className={`d4-card ${className}`.trim()} {...rest}>
      {title ? <h3 className="d4-card__title">{title}</h3> : null}
      {children}
    </div>
  );
}
