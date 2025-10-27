import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterUser.css";
import Button from "../components/Button";

const initialFormUser = {
    name: "",
    surname: "",
    email: "",
    password: "",
    provincia: "",
    ciudad: "",
    telefono: "",
  };



const PROVINCIAS_Y_CIUDADES = {
  corrientes: ["Corrientes Capital", "Goya", "Mercedes", "Ituzaingó", "Paso de los Libres", "Otra"],
  chaco: ["Resistencia", "Barranqueras", "Saenz Peña", "Villa Ángela", "Otra"],
};


export default function RegisterUser() {
  const [form, setForm] = useState(initialFormUser);
 const [errors, setErrors] = useState({});
  const [ciudades, setCiudades] = useState([]);
  const navigate = useNavigate();

 // Actualiza ciudades al cambiar provincia
  useEffect(() => {
    setCiudades(PROVINCIAS_Y_CIUDADES[form.provincia] || []);
  }, [form.provincia]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

 // 🔹 Validaciones centralizadas
  const validate = (v) => {
    const errs = {};
    if (!v.name.trim()) errs.name = "El nombre es obligatorio.";
    if (!v.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email))
      errs.email = "Email inválido.";
    if (v.password.length < 6)
      errs.password = "La contraseña debe tener al menos 6 caracteres.";
    if (!v.provincia) errs.provincia = "Seleccioná una provincia.";
    if (!v.ciudad) errs.ciudad = "Seleccioná una ciudad.";
    
   
    return errs;
  };



  const handleSubmit = (e) => {
    e.preventDefault();
   const v = validate(form);
    setErrors(v);

    if (Object.keys(v).length === 0) {
      const nuevoUsuario = { id: Date.now(), ...form, tipo: "usuario"};

 // Guardar en localStorage
let usuarios = [];
try {
  usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
} catch (error) {
  console.error("Error al leer usuarios del localStorage:", error);
}


      // Guardar como usuario activo
   usuarios.push(nuevoUsuario);

try {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));
} catch (error) {
  console.error("Error al guardar en localStorage:", error);
  alert("Hubo un problema al guardar los datos. Intenta de nuevo.");
  return; // salimos para no navegar si falló
}

      alert("Usuario registrado con éxito ✅");
      navigate("/myprofile");
    }
  };
    
    // Función auxiliar para mostrar errores
  const inputClass = (field) =>
    `form-control ${errors[field] ? "is-invalid" : ""}`;
  return (
    <section className="login-section container my-5">
      <div className="login-box">
        <h1>Regístrate</h1>

        <form className="registerclient-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor= "nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id= "nombre"
              name="name"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}

              placeholder="Ingrese su nombre"
              value={form.name}
              onChange={handleChange}
              autoComplete="nombre"
              required
            />
             {errors.name  && <div className="invalid-feedback">{errors.name}</div>}

          </div>

          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="surname"
           placeholder="Ingrese su apellido"
              className={inputClass("surname")}
              value={form.surname}
              onChange={handleChange}
              required
            />
             {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor= "email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              id= "email"
              name="email"
                 className={inputClass("email")}
              placeholder="Ingrese su email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
                   className={inputClass("password")}
              placeholder="Ingrese su contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
             {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
          </div>

          <div className="mb-3">
            <label htmlFor="provincia" className="form-label">
              Provincia
            </label>
            <select
              id="provincia"
              name="provincia"
               className={inputClass("provincia")}
              value={form.provincia}
              onChange={handleChange}
              required
            >
              <option value="">-- Seleccioná una provincia --</option>
              <option value="corrientes">Corrientes</option>
              <option value="chaco">Chaco</option>
            </select>
            {errors.provincia && (
                    <div className="invalid-feedback">{errors.provincia}</div>
                  )}
          </div>

          <div className="mb-3">
            <label htmlFor="ciudad" className="form-label">
              Ciudad
            </label>
            <select
              id="ciudad"
              name="ciudad"
             className={inputClass("ciudad")}
              value={form.ciudad}
              onChange={handleChange}
              required
              disabled={!form.provincia}
            >
              <option value="">-- Seleccioná una ciudad --</option>
              {ciudades.map((ciudad, index) => (
                <option key={index} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
             {errors.ciudad && (
                    <div className="invalid-feedback">{errors.ciudad}</div>
                  )}
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              className="form-control"
            
              value={form.telefono}
              onChange={handleChange}
               placeholder="Ej: 3794123456"
                  pattern="[0-9]{10}"
                  title="Debe ingresar 10 números"
            />
          </div>

        </form>

         <Button  type="submit" variant="gradient" size="md" 
>
  Crear cuenta
</Button>

  <Button className= "text-dark" to="/" variant="outline" size="md" >Volver atrás </Button>

      </div>

      <section className="side-panel">
          <h2>¡Bienvenido!</h2>
          <p>¿Ya tenés una cuenta?</p>
          <Button to="/login" variant="gradient" size="md" fullWidth>
            Ingresar
          </Button>
          <p className="mt-3">¿Querés ofrecer un servicio?</p>
          <Button to="/register/professional" variant="gradient" size="md" fullWidth>
            Registrate
          </Button>


    </section>
    </section>
  );
}
