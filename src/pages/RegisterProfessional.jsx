import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterProfessional.css";
import Button from "../components/Button";

// 🔹 Estado inicial del formulario
const initialForm = {
  name: "",
  surname: "",
  email: "",
  password: "",
  provincia: "",
  ciudad: "",
  direccion: "",
  telefono: "",
  oficio: "",
};

// 🔹 Provincias y ciudades
const PROVINCIAS_Y_CIUDADES = {
  corrientes: ["Corrientes Capital", "Goya", "Mercedes", "Ituzaingó", "Otra"],
  chaco: ["Resistencia", "Barranqueras", "Sáenz Peña", "Otra"],
};



export default function RegisterProfessional() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [ciudades, setCiudades] = useState([]);
  const navigate = useNavigate();

  // Actualiza ciudades al cambiar provincia
  useEffect(() => {
    setCiudades(PROVINCIAS_Y_CIUDADES[form.provincia] || []);
  }, [form.provincia]);

  // Manejador de cambios
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
    if (!v.oficio) errs.oficio = "Seleccioná un oficio.";
   
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);

    if (Object.keys(v).length === 0) {
      const nuevoProfesional = { id: Date.now(), ...form, tipo: "profesional" };

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
  return; // salimos para no navegar si falló
}

      alert("Profesional registrado con éxito ✅");
      navigate("/myprofile");
    }
  };

  // Función auxiliar para mostrar errores
  const inputClass = (field) =>
    `form-control ${errors[field] ? "is-invalid" : ""}`;
  return (
    <div className="register-professional d-flex align-items-center justify-content-center min-vh-100">
      <section className="container ">
        
        {/* Caja del formulario */}
        <div className=" row justify-content-center align-items-center flex-column mt-5">
           <h1>¡Bienvenido!</h1>
          <div className="professional ccol-12 col-md-10 col-lg-8">
          
          <form id="registerprofessional-form" onSubmit={handleSubmit}>
        
            <div className="row form">
              <h2 className="mb-4 text-center">Registrate aquí</h2>
              {/* Nombre */}

              <div className="col-12 col-md-6 mb-3 box">
                
                

                <label  htmlFor="nombre">Nombre</label>
                <input
                id="nombre"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass("name")}
                  placeholder="Escribí tu nombre"

                  required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              {/* Apellido */}
              <div className="col-12 col-md-6 mb-3 box">
                <label  htmlFor="apellido">Apellido</label>
                <input
                id="apellido"
                  type="text"
                  name="surname"
                  value={form.surname}
                  onChange={handleChange}
                  className={inputClass("surname")}
                  placeholder="Escribí tu apellido"

                  required
                />
                 {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
              </div>

              {/* Email */}
                            <div className= "col-12 col-md-6 mb-3 box">

                <label htmlFor="email">Email</label>
                <input
                id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass("email")}
                  placeholder="Correo Electrónico"

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
                     className="form-control"
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
                  className="form-control"
                  placeholder="Ej: 3794123456"
                  pattern="[0-9]{10}"
                  title="Debe ingresar 10 números"
                />
              </div>

              {/* Oficio */}
          <div className="box full-width">
            <label htmlFor="oficio">Oficio</label>
            <select
        id="oficio"
              name="oficio"
              value={form.oficio}
              onChange={handleChange}
                   className={inputClass("oficio")}
              required
            >
              <option value="">Seleccioná un oficio</option>

              <optgroup label="Construcción y mantenimiento">
                <option value="albanil">Albañil</option>
                <option value="pintor">Pintor</option>
                <option value="electricista">Electricista</option>
                <option value="plomero-gasista">Plomero / Gasista</option>
                <option value="carpintero">Carpintero</option>
                <option value="herrero">Herrero / Soldador</option>
                <option value="techista">Techista</option>
                <option value="yesero">Yesero</option>
                <option value="vidriero">Vidriero</option>
                <option value="aire-acondicionado">
                  Instalador de aire acondicionado
                </option>
                <option value="jardinero">Jardinero / Parquero</option>
                <option value="otros">Otros</option>
              </optgroup>

              <optgroup label="Automotores">
                <option value="mecanico">Mecánico automotriz</option>
                <option value="chapista">Chapista</option>
                <option value="pintor-autos">Pintor de autos</option>
                <option value="gomeria">Gomería</option>
                <option value="lavadero">Lavadero de autos</option>
                <option value="elect-auto">Electricista del automotor</option>
                <option value="otros">Otros</option>
              </optgroup>

              <optgroup label="Hogar y servicios personales">
                <option value="limpieza">Limpieza / Mucama</option>
                <option value="niniera">Niñera</option>
                <option value="cuidado-mayores">Cuidado de adultos mayores</option>
                <option value="cocinero">Cocinero / Panadero / Pastelero</option>
                <option value="costurera">Costurera / Modista</option>
                <option value="peluquero">Peluquero / Barbero</option>
                <option value="manicura">Manicura / Pedicura</option>
                <option value="esteticista">Esteticista</option>
                <option value="otros">Otros</option>
              </optgroup>

              <optgroup label="Tecnología y comunicación">
                <option value="tecnico-pc">Técnico en PC / Redes</option>
                <option value="celulares">Reparador de celulares</option>
                <option value="diseno-grafico">Diseñador gráfico</option>
                <option value="fotografo">Fotógrafo</option>
                <option value="community-manager">Community Manager</option>
                <option value="programador">Desarrollador web / Programador</option>
                <option value="otros">Otros</option>
              </optgroup>

              <optgroup label="Industria y producción">
                <option value="tornero">Tornero</option>
                <option value="textil">Operario textil</option>
                <option value="metalurgico">Operario metalúrgico</option>
                <option value="elect-industrial">Electricista industrial</option>
                <option value="electromecanico">Técnico electromecánico</option>
                <option value="otros">Otros</option>
              </optgroup>

              <optgroup label="Transporte y logística">
                <option value="chofer">Chofer particular / remisero / taxista</option>
                <option value="fletero">Fletero</option>
                <option value="motoquero">Motoquero / Cadete</option>
                <option value="repartidor">Repartidor</option>
                <option value="otros">Otros</option>
              </optgroup>
            </select>
                              {errors.oficio && (
                    <div className="invalid-feedback">{errors.oficio}</div>
                  )}

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
          <Button to="/registerclient" variant="dark" size="md" fullWidth>
            Registrate
          </Button>
    
        </div>
        </div>
        
       
      </section>
    </div>
  );
}

