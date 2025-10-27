import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button({ children, onClick, type = "button", variant = "gradient", size = "md", to }) {
  const className = `btn-custom ${variant} ${size}`;

  // Si tiene prop "to", renderiza un Link (navegación)
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  // Si no, renderiza un button normal
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;


