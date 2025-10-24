import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterUser.css";
import Button from "../components/Button";

function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    provincia: "",
    ciudad: "",
    telefono: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [ciudadesDisponibles, setCiudadesDisponibles] = useState([]);

  const ciudadesPorProvincia = {
    corrientes: ["Corrientes Capital", "Goya", "Ituzaingó", "Bella Vista"],
    chaco: ["Resistencia", "Sáenz Peña", "Villa Ángela", "Charata"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si cambia la provincia, actualizamos ciudades
    if (name === "provincia") {
      setCiudadesDisponibles(ciudadesPorProvincia[value] || []);
      setFormData({ ...formData, provincia: value, ciudad: "" }); // reset ciudad
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.surname ||
      !formData.email ||
      !formData.password ||
      !formData.provincia ||
      !formData.ciudad
    ) {
      setMensaje("⚠️ Por favor completá todos los campos obligatorios.");
      return;
    }

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuariosGuardados.push(formData);
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

    setMensaje("✅ Registro exitoso. ¡Bienvenido/a!");
    setFormData({
      name: "",
      surname: "",
      email: "",
      password: "",
      provincia: "",
      ciudad: "",
      telefono: "",
    });
    setCiudadesDisponibles([]);
  };

  return (
    <section className="login-section container my-5">
      <div className="login-box">
        <h1>Regístrate</h1>

        <form className="registerclient-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Ingrese su nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              className="form-control"
              placeholder="Ingrese su apellido"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Ingrese su email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="provincia" className="form-label">
              Provincia
            </label>
            <select
              id="provincia"
              name="provincia"
              className="form-select"
              value={formData.provincia}
              onChange={handleChange}
              required
            >
              <option value="">-- Seleccioná una provincia --</option>
              <option value="corrientes">Corrientes</option>
              <option value="chaco">Chaco</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="ciudad" className="form-label">
              Ciudad
            </label>
            <select
              id="ciudad"
              name="ciudad"
              className="form-select"
              value={formData.ciudad}
              onChange={handleChange}
              required
              disabled={!ciudadesDisponibles.length}
            >
              <option value="">-- Seleccioná una ciudad --</option>
              {ciudadesDisponibles.map((ciudad) => (
                <option key={ciudad} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
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
              placeholder="Ingrese su teléfono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>

        </form>

         <Button  type="submit" variant="gradient" size="md"   fullWidth disabled={
    !formData.name ||
    !formData.surname ||
    !formData.email ||
    !formData.password ||
    !formData.provincia ||
    !formData.ciudad
  }
>
  Crear cuenta
</Button>
        {mensaje && <p className="mt-3 text-success">{mensaje}</p>}
  <Button className= "text-dark" to="/" variant="outline" size="md" >Volver atrás </Button>

      </div>

      <section className="side-panel">
          <h2>¡Bienvenido!</h2>
          <p>¿Ya tenés una cuenta?</p>
          <Button to="/login" variant="gradient" size="md" fullWidth>
            Ingresar
          </Button>
          <p className="mt-3">¿Querés ofrecer un servicio?</p>
          <Button to="/registerclient" variant="gradient" size="md" fullWidth>
            Registrate
          </Button>


    </section>
    </section>
  );
}

export default RegisterUser;
 