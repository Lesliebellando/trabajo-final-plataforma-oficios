import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterProfessional.css";
import Button from "../components/Button";

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
  otraCiudad: "",
  otroOficio: "",
};

const PROVINCIAS_Y_CIUDADES = {
  corrientes: ["Corrientes Capital", "Goya", "Mercedes", "Ituzaingó", "Otra"],
  chaco: ["Resistencia", "Barranqueras", "Presidencia Roque Sáenz Peña", "Otra"],
};

function RegisterProfessional() {
  const [formData, setFormData] = useState(initialForm);
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    if (formData.provincia) {
      setCiudades(PROVINCIAS_Y_CIUDADES[formData.provincia]);
    } else {
      setCiudades([]);
    }
  }, [formData.provincia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Por favor completá todos los campos obligatorios");
      return;
    }

    if (formData.ciudad === "Otra" && !formData.otraCiudad) {
      alert("Por favor especificá tu ciudad");
      return;
    }

    if (formData.oficio === "otros" && !formData.otroOficio) {
      alert("Por favor especificá tu oficio");
      return;
    }

    const profesionales =
      JSON.parse(localStorage.getItem("profesionales")) || [];
    profesionales.push(formData);
    localStorage.setItem("profesionales", JSON.stringify(profesionales));

    alert("Profesional registrado con éxito ✅");
    setFormData(initialForm);
  };

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
                
                

                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Escribí tu nombre"

                  required
                />
              </div>

              {/* Apellido */}
              <div className="col-12 col-md-6 mb-3 box">
                <label>Apellido</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Escribí tu apellido"

                  required
                />
              </div>

              {/* Email */}
                            <div className= "col-12 col-md-6 mb-3 box">

                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo Electrónico"

                  required
                />
              </div>

              {/* Password */}
              <div className= "col-12 col-md-6 mb-3 box">
              
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  Placeholder="Contraseña"

                  required
                />
              </div>

              {/* Provincia */}
              <div className="col-12 col-md-6 mb-3 box">
                <label>Provincia</label>
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

              {/* Ciudad */}
              <div className="col-12 col-md-6 mb-3 box" >
                <label>Ciudad</label>
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

              
              

              {/* Dirección */}
              <div className= "col-12 col-md-6 mb-3 box">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Escribí tu dirección"

                  required
                />
              </div>

              {/* Teléfono */}
              <div className= "col-12 col-md-6 mb-3 box">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ej: 3794123456"
                  pattern="[0-9]{10}"
                  title="Debe ingresar 10 números"
                />
              </div>

              {/* Oficio */}
          <div className="box full-width">
            <label className="form-label">Oficio</label>
            <select
              className="form-select"
              name="oficio"
              value={formData.oficio}
              onChange={handleChange}
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

export default RegisterProfessional;