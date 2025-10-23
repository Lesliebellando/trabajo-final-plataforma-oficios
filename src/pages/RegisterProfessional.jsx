import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterUser.css";

function RegisterProfessional() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    provincia: "",
    ciudad: "",
    telefono: "",
    oficio: "",
    otraCiudad: "",
    otroOficio: "",
  });

  const [ciudades, setCiudades] = useState([]);

  // Provincias y ciudades automáticas
  const provinciasYciudades = {
    corrientes: ["Corrientes Capital", "Goya", "Mercedes", "Ituzaingó", "Otra"],
    chaco: ["Resistencia", "Barranqueras", "Presidencia Roque Sáenz Peña", "Otra"],
  };

  // Actualiza ciudades cuando cambia la provincia
  useEffect(() => {
    if (formData.provincia) {
      setCiudades(provinciasYciudades[formData.provincia]);
    } else {
      setCiudades([]);
    }
  }, [formData.provincia, provinciasYciudades]);

  // Manejar cambios de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!formData.name || !formData.email || !formData.password) {
      alert("Por favor completá todos los campos obligatorios");
      return;
    }

    // Guardar en localStorage
    const profesionales = JSON.parse(localStorage.getItem("profesionales")) || [];
    profesionales.push(formData);
    localStorage.setItem("profesionales", JSON.stringify(profesionales));

    alert("Profesional registrado con éxito ✅");
    setFormData({
      name: "",
      surname: "",
      email: "",
      password: "",
      provincia: "",
      ciudad: "",
      telefono: "",
      oficio: "",
      otraCiudad: "",
      otroOficio: "",
    });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Registro de Profesional</h2>
      <form
        onSubmit={handleSubmit}
        className="border rounded p-4 shadow bg-light"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Provincia</label>
            <select
              className="form-select"
              name="provincia"
              value={formData.provincia}
              onChange={handleChange}
              required
            >
              <option value="">Seleccioná una provincia</option>
              <option value="corrientes">Corrientes</option>
              <option value="chaco">Chaco</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Ciudad</label>
            <select
              className="form-select"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              required
              disabled={!formData.provincia}
            >
              <option value="">Seleccioná una ciudad</option>
              {ciudades.map((ciudad, index) => (
                <option key={index} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
          </div>

          {/* Campo "Otra ciudad" */}
          {formData.ciudad === "Otra" && (
            <div className="col-12">
              <label className="form-label">Especificá tu ciudad</label>
              <input
                type="text"
                className="form-control"
                name="otraCiudad"
                value={formData.otraCiudad}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="col-md-6">
            <label className="form-label">Teléfono</label>
            <input
              type="tel"
              className="form-control"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej: 3794123456"
              pattern="[0-9]{10}"
              title="Debe ingresar 10 números"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Oficio</label>
            <select
              className="form-select"
              name="oficio"
              value={formData.oficio}
              onChange={handleChange}
              required
            >
              <option value="">Seleccioná un oficio</option>
              <option value="albanil">Albañil</option>
              <option value="electricista">Electricista</option>
              <option value="plomero">Plomero / Gasista</option>
              <option value="pintor">Pintor</option>
              <option value="tecnico-pc">Técnico en PC / Redes</option>
              <option value="programador">Programador Web</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          {formData.oficio === "otros" && (
            <div className="col-12">
              <label className="form-label">Especificá tu oficio</label>
              <input
                type="text"
                className="form-control"
                name="otroOficio"
                value={formData.otroOficio}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-warning w-100">
              Crear cuenta
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterProfessional;
