import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button({ children, onClick, type = "button", variant = "gradient", size = "md", to }) {
  const className = `btn-custom ${variant} ${size}`;


  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

 
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;


