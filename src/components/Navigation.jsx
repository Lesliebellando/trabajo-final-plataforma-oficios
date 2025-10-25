import { NavLink } from "react-router-dom";
import { useState } from "react"; 
import './Navigation.css';
import logo from '../assets/logo-oficios.png';
import textlogo from '../assets/text-logo-oficios.png';

function Navigation() {

     const [isOpen, setIsOpen] = useState(false);
const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => {
  setIsOpen(false);  
  setIsDropdownOpen(false); 
};

  return (

<div className="nav-container">
      <div className="nav-header text-center py-3">
        <NavLink to="/" onClick={handleClose}>
          <img className="nav-bar-logo " src={logo} alt="OficiosApp" />
        </NavLink>
      </div>


    <nav className="navbar navbar-expand-sm sticky-top">
      <div className="container-fluid">
          <NavLink to="/" onClick={handleClose}> <img className="nav-bar-text-logo" src={textlogo} alt="OficiosApp" />
      </NavLink>
     
  <button className="navbar-toggler me-2"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
     </div>
     <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
        <ul className="navbar-nav ms-auto">
        <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link" to="/list">Buscar Profesionales</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link" to="/login">Iniciar sesión</NavLink></li>

<li className="nav-item dropdown">
  <NavLink
    className="nav-link dropdown-toggle"
    role="button"
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  >
    Registrarse
  </NavLink>

  <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
    <li>
      <NavLink
        className="dropdown-item"
        to="/register/user"
        onClick={() => { handleClose(); setIsDropdownOpen(false); }}
      >
        Como Usuario
      </NavLink>
    </li>
    <li>
      <NavLink
        className="dropdown-item"
        to="/register/professional"
        onClick={() => { handleClose(); setIsDropdownOpen(false); }}
      >
        Como Profesional
      </NavLink>
    </li>

  </ul>
</li>
<li className="nav-item"><NavLink className="nav-link" to="/miperfil">Mi Perfil</NavLink></li>
</ul>
      </div>
      
    </nav>
    </div>
  );
}

export default Navigation;