import { useState, useEffect } from "react";
import Button from "../components/Button";
import '../pages/PerfilEditable.css'
import { useNavigate } from "react-router-dom";

const provinciasCiudades = {
  corrientes: ["Corrientes Capital", "Goya", "Mercedes", "Ituzaingó", "Paso de los Libres", "Otra"],
  chaco: ["Resistencia", "Barranqueras", "Saenz Peña", "Villa Ángela", "Otra"],
  
};



export default function PerfilUsuarioEditable() {
  const [perfil, setPerfil] = useState({
    nombre: "",
    email: "",
    telefono: "",
    provincia: "",
    ciudad: "",
    serviciosBuscados: "",
    avatar: "",
  });

 
  // Cargar datos del usuario activo
  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo) setPerfil(usuarioActivo);
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar cambio de imagen de perfil
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPerfil((prev) => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

 const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("usuarioActivo");
  alert("Sesión cerrada ✅");
  navigate("/login");
};


  // Guardar cambios en localStorage
  const guardarCambios = () => {
    if (!perfil.nombre || !perfil.email) {
      alert("Por favor, completá los campos obligatorios (nombre y email).");
      return;
    }
    localStorage.setItem("usuarioActivo", JSON.stringify(perfil));
    alert("Cambios guardados ✅");
  };

  return (
    <div className="container perfil-usuario mt-5 mb-5">
      <div className="row justify-content-center align-items-start">
       
        {/* FOTO DE PERFIL */}
        <div className="col-12 col-md-4 text-center mb-4">
           <Button className= "text-dark" to="/" variant="outline" size="lg" >
      Volver atrás
    </Button>
          <div
            className="imagen rounded-circle overflow-hidden border border-3 mx-auto mt-5"
            style={{ width: 120, height: 120 }}
          >
            {perfil.avatar ? (
              <img
                src={perfil.avatar}
                alt="Avatar"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />) : (
    <span className="text-muted small">Sin foto</span>
  )}
          </div>


          <div className="d-flex justify-content-center gap-2 mt-2">
            <label className="btn btn-outline-secondary btn-sm mb-0">
              Cambiar foto
              <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
            </label>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => setPerfil((prev) => ({ ...prev, avatar: "" }))}
            >
              Quitar
            </button>
          </div>
           
        </div>

    
        {/* DATOS DEL PERFIL */}
        <div className="col-12 col-md-8">
          <form className="row g-3">
            {/* Nombre */}
            <div className="col-12 col-md-6">
              <label htmlFor="nombre" className="form-label">  Nombre *</label>
              <input
              id="nombre"
                type="text"
                name="nombre"
                value={perfil.nombre}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
    
            {/* Apellido */}
            <div className="col-12 col-md-6">
              <label htmlFor="apellido" className="form-label"> Apellido *</label>
              <input
              id="apellido"
                type="text"
                name="apellido"
                value={perfil.apellido}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            {/* Email */}
            <div className="col-12 col-md-6">
              <label htmlFor= "email" className="form-label">Correo electrónico *</label>
              <input
              id="email"
                type="email"
                name="email"
                value={perfil.email}
                onChange={handleChange}
                className="form-control"
                required
                  autoComplete="email"
              />
            </div>

            {/* Teléfono */}
            <div className="col-12 col-md-6">
              <label htmlFor="telefono" className="form-label">Teléfono</label>
              <input
              id="telefono"
                type="text"
                name="telefono"
                value={perfil.telefono}
                onChange={handleChange}
                className="form-control"
              />
            </div>

                <div className="row g-3">
              <div className="col-md-6">


                <label htmlFor="provincia" className="form-label">Provincia</label>
                <select
                id="provincia"
                  name="provincia"
                  className="form-select"
                  value={perfil.provincia}
                  onChange={handleChange}
                >
                  <option value="">Seleccioná una provincia</option>
                  {Object.keys(provinciasCiudades).map((prov) => (
                    <option key={prov} value={prov}>
                      {prov.charAt(0).toUpperCase() + prov.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ciudad */}
              <div className="col-md-6">
                <label htmlFor="ciudad" className="form-label">Ciudad</label>
                <select
                id="ciudad"
                  name="ciudad"
                  className="form-select"
                  value={perfil.ciudad}
                  onChange={handleChange}
                  disabled={!perfil.provincia}
                >
                  <option value="">Seleccioná una ciudad</option>
                  {perfil.provincia &&
                    provinciasCiudades[perfil.provincia].map((ciudad, idx) => (
                      <option key={idx} value={ciudad}>
                        {ciudad}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* Servicios que busca */}
            <div className="col-12">
              <label htmlFor= "demanda" className="form-label">¿Qué tipo de servicios buscás?</label>
              <textarea
              id="demanda"
                name="serviciosBuscados"
                value={perfil.serviciosBuscados}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Ejemplo: Plomero, electricista, pintor, etc."
              ></textarea>
            </div>

            {/* Botón Guardar */}
            <div className="col-12 text-center mt-3 mb-5">
               <Button onClick={() => alert("Descartado")} variant="dark" size="md">Descartar</Button>
              <Button onClick={guardarCambios} variant="gradient" size="md">Guardar cambios</Button>
             
               <Button  variant="gradient" size="lg" onClick={handleLogout}>
      Cerrar sesión
    </Button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

 
