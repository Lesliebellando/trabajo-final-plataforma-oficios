import { useState } from "react";
import {Link} from "react-router-dom";
import Button from "../components/Button";
import "./Login.css"; // tu archivo de estilos
import {
  FaUser,
  FaLock,
  FaGoogle,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    // Aquí podrías agregar validación o envío al backend
  };

  return (
    <section className="login-section">
      <div className="login-box">
        <h1>Ingresa a tu cuenta</h1>

        <form id="login-form" onSubmit={handleSubmit}>
          <div className="box">
          
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingrese su email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FaUser className="icon" />
          </div>

          <div className="box">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese su contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <FaLock className="icon" />
          </div>

          <Link to="/recuperar-password" className="forgot-password">
  ¿Olvidaste tu contraseña?
</Link>


 <Button type="submit" variant="gradient" size="lg" className="full-width">
  Ingresar
</Button>


          <p>o Ingresa con</p>
          <div className="social-login">
            <a href="#">
              <FaGoogle />
            </a>
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
          </div>
        </form>
      </div>

      <section className="side-panel">
        <h2>¡Hola!</h2>
        <h2>¿Sos nuevo aquí?</h2>
        <p>Registrate como</p>
      
  <Button to="/register/user" variant="gradient" size="md">
    Cliente
  </Button>
  <p>o</p>
  <Button to="/register/professional" variant="gradient" size="md">
    Profesional
  </Button>
  <Button className= "text-dark" to="/" variant="outline" size="sm" >
      Volver atrás
    </Button>
    </section>
</section>
  );
}

export default Login;
