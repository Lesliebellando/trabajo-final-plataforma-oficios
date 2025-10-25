import { useState } from "react";
import Button from "../components/Button"; // tu componente de botones
import { OficiosConfig } from "../components/OficiosConfig";
import '../pages/PerfilEditable.css'
const provinciasCiudades = {
  corrientes: ["Corrientes Capital", "Goya", "Paso de los Libres"],
  chaco: ["Resistencia", "Saenz Peña", "Villa Ángela"],
  
};


export default function PerfilEditable() {
  const [perfil, setPerfil] = useState({
    avatar: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    oficio: "",
    zona: "",
    descripcion: "",
    skills: [],
    skillInput: "",
    certificados: [],
    disponibilidad: [1, 2, 3, 4, 5, 6, 7], // lunes a sábado
  });

  const [activeTab, setActiveTab] = useState("datos");

  const toggleDia = (dia) => {
    setPerfil((prev) => {
      const newDias = prev.disponibilidad.includes(dia)
        ? prev.disponibilidad.filter((d) => d !== dia)
        : [...prev.disponibilidad, dia];
      return { ...prev, disponibilidad: newDias };
    });
  };

  const addSkill = () => {
    if (perfil.skillInput.trim() && !perfil.skills.includes(perfil.skillInput.trim())) {
      setPerfil((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.skillInput.trim()],
        skillInput: "",
      }));
    }
  };

  const removeSkill = (skill) => {
    setPerfil((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPerfil((prev) => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(file);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value, ...(name === "provincia" ? { ciudad: "" } : {}) }));
  };

  const guardarCambios = () => {
if (!perfil.nombre || !perfil.email) {
  alert("Por favor, completá los campos obligatorios.");
  return;
}
    localStorage.setItem("usuarioActivo", JSON.stringify(perfil));
    alert("Cambios guardados ✅");
  };

  return (
    <div className="container py-4">
      <div className="row g-4">

          <div className="imagen col-12 col-lg-3 ">
          <div className="d-flex align-items-center gap-3 flex-wrap mb-3 mt-5 justify-content-center">
             <div className="d-flex align-items-center justify-content-center border border-3 rounded-circle overflow-hidden" style={{ width: '150px', height: '150px' }}>
  {perfil.avatar ? (
    <img src={perfil.avatar} alt="Avatar" className="w-100 h-100 object-fit-cover" />
  ) : (
    <span className="text-muted small">Sin foto</span>
  )}
</div>
              <div className="d-flex gap-2">
                <label className="btn btn-outline-secondary btn-sm mb-0">
                  Cambiar foto
                  <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                </label>
                <button className="btn btn-outline-danger btn-sm" onClick={() => setPerfil((prev) => ({ ...prev, avatar: "" }))}>
                  Quitar
                </button>
              </div>
            </div>
          
        </div>
        {/* Columna izquierda: editor */}
        <div className="col-12 col-lg-9">
          <div className="card shadow-sm p-4">
            

            {/* Tabs */}
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "datos" ? "active" : ""}`} onClick={() => setActiveTab("datos")}>
                  Datos
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "habilidades" ? "active" : ""}`} onClick={() => setActiveTab("habilidades")}>
                  Habilidades
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "disponibilidad" ? "active" : ""}`} onClick={() => setActiveTab("disponibilidad")}>
                  Disponibilidad
                </button>
              </li>
            </ul>

            {/* Contenido Tabs */}
            {activeTab === "datos" && (
              <div className="tab-content">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="nombre" className="form-control" value={perfil.nombre} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Apellido</label>
                    <input type="text" name="apellido" className="form-control" value={perfil.apellido} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" value={perfil.email} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input type="text" name="telefono" className="form-control" value={perfil.telefono} onChange={handleInputChange} />
                  </div>
                  
                  {/* Provincia */}
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Provincia</label>
                <select
                  name="provincia"
                  className="form-select"
                  value={perfil.provincia}
                  onChange={handleInputChange}
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
                <label className="form-label">Ciudad</label>
                <select
                  name="ciudad"
                  className="form-select"
                  value={perfil.ciudad}
                  onChange={handleInputChange}
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
<div className="col-md-12 mt-5">
                    <select
  id="oficio"
  name="oficio"
  value={perfil.oficio}
  onChange={handleInputChange}
  className="form-select"
  required
>
  <option value="">Seleccioná un oficio</option>
  {Object.entries(OficiosConfig).map(([categoria, oficios]) => (
    <optgroup key={categoria} label={categoria}>
      {oficios.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </optgroup>
  ))}
</select>

                  </div>

                  <div className="col-12">
                    <label className="form-label">Descripción</label>
                    <textarea name="descripcion" className="form-control" rows={4} value={perfil.descripcion} onChange={handleInputChange}></textarea>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "habilidades" && (
              <div>
                <label className="form-label">Agregar Habilidad</label>
                <div className="input-group mb-2">
                  <input type="text" className="form-control" value={perfil.skillInput} onChange={(e) => setPerfil((prev) => ({ ...prev, skillInput: e.target.value }))} />
                  <button className="btn btn-outline" type="button" onClick={addSkill}>Agregar</button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {perfil.skills.map((s, idx) => (
                    <span key={idx} className="badge bg-primary">
                      {s} <button className="btn btn-sm btn-light ms-1" onClick={() => removeSkill(s)}>x</button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "disponibilidad" && (
              <div className="d-flex flex-wrap gap-2">
                {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d, idx) => (
                  <div className="form-check" key={idx}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={perfil.disponibilidad.includes(idx)}
                      onChange={() => toggleDia(idx)}
                    />
                    <label className="form-check-label">{d}</label>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 d-flex gap-2">

              
              <Button onClick={guardarCambios} variant="gradient" size="md">Guardar cambios</Button>
              <Button onClick={() => alert("Descartado")} variant="dark" size="md">Descartar</Button>
              <Button className= "text-dark" to="/" variant="outline" size="sm" >
      Volver atrás
    </Button>
            </div>
          </div>
        </div>

        {/* Columna derecha: preview */}

        
      
        </div>
        </div> ) } 
