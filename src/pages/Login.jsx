import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import "./Login.css";
import { FaUser, FaLock, FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";

export function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function validate(values) {
    const errs = {};
    if (!values.email) errs.email = "Email requerido";
else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email))
  errs.email = "Email inválido";

if (!values.password) errs.password = "Contraseña requerida";
else if (values.password.length < 6) errs.password = "Mínimo 6 caracteres";

  return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);

    if (Object.keys(v).length === 0) {
      // Obtenemos datos del localStorage
     let profesionales = [];
    let usuarios = [];
    try {
      profesionales = JSON.parse(localStorage.getItem("profesionales")) || [];
      usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    } catch (error) {
      console.error("Error al leer localStorage:", error);
    }


      // Buscamos coincidencia en ambos arrays
      const user =
  profesionales.find(
    (p) =>
      p.email.trim().toLowerCase() === form.email.trim().toLowerCase() &&
      p.password === form.password
  ) ||
  usuarios.find(
    (u) =>
      u.email.trim().toLowerCase() === form.email.trim().toLowerCase() &&
      u.password === form.password
  );

    if (user) {
      try {
        localStorage.setItem("usuarioActivo", JSON.stringify(user));
      } catch (error) {
        console.error("Error al guardar usuarioActivo:", error);
        alert("Hubo un problema al iniciar sesión.");
        return;
      }

    navigate("/myprofile");
} else {
  setErrors({ email: "Correo o contraseña incorrectos" });
}

  }
}


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
              value={form.email}
              onChange={handleChange}
              required
            />
            <FaUser className="icon" />

              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="box">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese su contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
            <FaLock className="icon" />
             {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
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


