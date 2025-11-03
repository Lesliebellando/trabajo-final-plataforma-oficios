import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OficiosConfig } from "../components/OficiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterProfessional.css";
import Button from "../components/Button";


const initialForm = {
   avatar: "",
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  provincia: "",
  ciudad: "",
  direccion: "",
  telefono: "",
  oficio: "",
  skills: [],        
  disponibilidad: [],
    role: "profesional",
};


const PROVINCIAS_Y_CIUDADES = {
  corrientes: ["Corrientes Capital", "Goya", "Mercedes", "Ituzaingó", "Otra"],
  chaco: ["Resistencia", "Barranqueras", "Sáenz Peña", "Villa Ángela", "Otra"],
};



export default function RegisterProfessional() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [ciudades, setCiudades] = useState([]);
  const navigate = useNavigate();

 
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
    if (!v.nombre.trim()) errs.nombre = "El nombre es obligatorio.";
    if (!v.apellido.trim()) errs.apellido = "El apellido es obligatorio.";
    if (!v.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email))
      errs.email = "Email inválido.";
    if (v.password.length < 6)
      errs.password = "La contraseña debe tener al menos 6 caracteres.";
    if (!v.provincia) errs.provincia = "Seleccioná una provincia.";
    if (!v.ciudad) errs.ciudad = "Seleccioná una ciudad.";
    if (!v.oficio) errs.oficio = "Seleccioná un oficio.";
   
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);

    if (Object.keys(v).length === 0) {
      const nuevoProfesional = { id: Date.now(), ...form, role: "profesional" };

      // Guardar en localStorage
      const profesionales = JSON.parse(localStorage.getItem("profesionales")) || [];
      
      
      profesionales.push(nuevoProfesional);
      
 // Guardar como usuario activo
      try {
  localStorage.setItem("profesionales", JSON.stringify(profesionales));
  localStorage.setItem("usuarioActivo", JSON.stringify(nuevoProfesional));
} catch (error) {
  console.error("Error al guardar en localStorage:", error);
  alert("Hubo un problema al guardar los datos. Intenta de nuevo.");
  return; 
}

      alert("Profesional registrado con éxito ✅");
      navigate("/miperfil");
    }
  };

  
  const inputClass = (field) =>
    `form-control ${errors[field] ? "is-invalid" : ""}`;
  return (
    <div className="register-professional d-flex align-items-center justify-content-center min-vh-100">
      <section className="container ">
        
        {/* Caja del formulario */}
        <div className=" row justify-content-center align-items-center flex-column mt-5">
           <h1>¡Bienvenido!</h1>
          <div className="professional col-12 col-md-10 col-lg-8">
          
          <form id="registerprofessional-form" onSubmit={handleSubmit}>
        
            <div className="row form">
              <h2 className="mb-4 text-center">Registrate aquí</h2>
              {/* Nombre */}

              <div className="col-12 col-md-6 mb-3 box">
                
                

                <label  htmlFor= "nombre" >Nombre</label>
                <input
                id= "nombre"
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className={inputClass("nombre")}
                  placeholder="Escribí tu nombre"
                  autoComplete= "given-name"
                  required
                />
                {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
              </div>

              {/* Apellido */}
              <div className="col-12 col-md-6 mb-3 box">
                <label  htmlFor= "apellido" >Apellido</label>
                <input
                id= "apellido"
                  type="text"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  className={inputClass("apellido")}
                  placeholder="Escribí tu apellido"

                  required
                />
                 {errors.apellido&& <div className="invalid-feedback">{errors.apellido}</div>}
              </div>

              {/* Email */}
                            <div className= "col-12 col-md-6 mb-3 box">

                <label htmlFor= "email" >Email</label>
                <input
                id= "email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass("email")}
                  placeholder="Correo Electrónico"
autoComplete= "email"
                  required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className= "col-12 col-md-6 mb-3 box">
              
                <label htmlFor="password">Contraseña</label>
                <input
                id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                   className={inputClass("password")}
                  placeholder="Contraseña"

                  required
                />
                {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
              </div>

              {/* Provincia */}
              <div className="col-12 col-md-6 mb-3 box">
                <label htmlFor="provincia">Provincia</label>
                <select
          id="provincia"
                  name="provincia"
                  value={form.provincia}
                  onChange={handleChange}
                   className={inputClass("provincia")}
                  required
                >
                  <option value="">Seleccioná una provincia</option>
                  <option value="corrientes">Corrientes</option>
                  <option value="chaco">Chaco</option>
                </select>
                {errors.provincia && (
                    <div className="invalid-feedback">{errors.provincia}</div>
                  )}
              </div>

              {/* Ciudad */}
              <div className="col-12 col-md-6 mb-3 box" >
                <label htmlFor="ciudad">Ciudad</label>
                <select
                id="ciudad"
                  name="ciudad"
                  value={form.ciudad}
                  onChange={handleChange}
                  required
                    className={inputClass("ciudad")}
                  disabled={!form.provincia}
                >
                  <option value="">Seleccioná una ciudad</option>
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

              
              

              {/* Dirección */}
              <div className= "col-12 col-md-6 mb-3 box">
                <label htmlFor="direccion">Dirección</label>
                <input
                id="direccion"
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                   className={inputClass("direccion")}
                  placeholder="Escribí tu dirección"

                  required
                />
              </div>

              {/* Teléfono */}
              <div className= "col-12 col-md-6 mb-3 box">
                <label htmlFor="telefono">Teléfono</label>
                <input
                id="telefono"
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                 className={inputClass("telefono")}
                  placeholder="Ej: 3794123456"
                  pattern="[0-9]{10}"
                  title="Debe ingresar 10 números"
                />
              </div>

              {/* Oficio */}
          <div className="box full-width">
           <select
             id="oficio"
             name="oficio"
             value={form.oficio}
             onChange={handleChange}
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

            <Button className='content-justify-center' type="submit" variant="gradient" size="md" fullWidth>
              Crear cuenta
            </Button>
             <Button className= "text-dark" to="/" variant="outline" size="md" >Volver atrás </Button>
            </div>

          </form>

          
        
 </div>
 
 <div className="col-12 col-md-5 text-center panel mt-5 mb-5 py-3">
 
          <p>¿Ya tenés una cuenta?</p>
          <Button to="/login" variant="dark" size="md" fullWidth>
            Ingresar
          </Button>
          <p className="mt-3">¿Querés contratar un servicio?</p>
          <Button to="/register/user" variant="dark" size="md" fullWidth>
            Registrate
          </Button>
    
        </div>
        </div>
        
       
      </section>
    </div>
  );
}

