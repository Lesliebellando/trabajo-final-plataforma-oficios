import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { dataprofesionales } from "../data/dataprofesionales"; 
import "./PerfilProfesionalPublico.css"
export default function PerfilProfesionalPublico() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profesional, setProfesional] = useState(null);
 const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);



  useEffect(() => {
    //  leer del localStorage
    const profesionalesGuardados =
      JSON.parse(localStorage.getItem("profesionales")) || [];

    // profesional con ese ID
    let encontrado = profesionalesGuardados.find(
      (p) => parseInt(p.id) === parseInt(id)
    );

    // Si no está en localStorage, busca en el archivo local (dataprofesionales)
    if (!encontrado) {
      encontrado = dataprofesionales.find(
        (p) => parseInt(p.id) === parseInt(id)
      );
    }

    // Guarda el resultado en el estado
    setProfesional(encontrado);
  }, [id]);

  if (!profesional) {
    return (
      <div className="container text-center mt-5 mb-5">
        <h3>Perfil no encontrado</h3>
        <Button variant="dark" onClick={() => navigate(-1)}>Volver</Button>
      </div>
    );
  }
const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const numeroWhatsApp = profesional.telefono.startsWith("549")
  ? profesional.telefono
  : "549" + profesional.telefono.replace(/^0/, "");

   return (
    <div className="container mt-5">
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-lg-10">
          <div className="card shadow-lg border-0 ">
<div className="card-body">
             <div className="row align-items-start">
{/* Columna izquierda */}
                <div className="col-12 col-md-4 text-center mb-4 ">
                  <img
                    src={
                      profesional.imagen ||
                      "https://via.placeholder.co/150?text=Foto"
                    }
                    alt={profesional.nombre}
                   className="img-fluid mb-3"
                   style={{
      maxWidth: "150px", 
      height: "auto",    
      objectFit: "cover" 
    }}
                   
                  />
                  <h4>
                    {profesional.nombre} {profesional.apellido}
                  </h4>
                  <p className="text-muted">{profesional.oficio}</p>
                  <p>
                    {profesional.ciudad}, {profesional.provincia}
                  </p>
                </div>


{/* Columna derecha */}
        <div className="col-12 col-md-8">
          <h5>Descripción</h5>
          <p>{profesional.descripcion}</p>


   {/* Disponibilidad */}
                  <h5 className="mt-4">Disponibilidad</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {profesional.disponibilidad?.map((dia, idx) =>
                      typeof dia === "number" ? (
                        <span key={idx} className="badge">
                          {diasSemana[dia]}
                        </span>
                      ) : (
                        <span key={idx} className="badge">
                          {dia}
                        </span>
                      )
                    )}
                  </div>
 {/* Habilidades */}
                  <h5 className="mt-4">Habilidades</h5>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {profesional.skills && profesional.skills.length > 0 ? (
                      profesional.skills.map((skill, idx) => (
                        <span key={idx} className="badge bg-secondary">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-muted">Sin habilidades cargadas.</p>
                    )}
                  </div>

                  {/* Contacto */}
                  <h5 className="mt-4">Contacto</h5>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">
                      <strong>Teléfono:</strong> {profesional.telefono}
                    </li>
                    <li className="list-group-item">
                      <strong>Dirección:</strong> {profesional.direccion}
                    </li>
                  </ul>

                <div>
      {/* Botón que abre el modal */}
        <Button variant="gradient" size="md" onClick={handleOpen}>
          Reservar
        </Button>
    

      {/* Modal con formulario */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Reserva de turno</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="tel" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input type="date" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mensaje</label>
                    <textarea className="form-control" rows="3"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <Button variant="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button
                  variant="gradient"
                  onClick={() => {
                    alert("Reserva enviada ✅");
                    handleClose();
                  }}
                >
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}



                    <Button
                      variant="success"
                      size="md"
                      onClick={() =>
                        window.open(
                          `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
                            "Hola, quiero solicitar un presupuesto."
                          )}`,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      Pedir presupuesto
                    </Button>

                    <Button
                      variant="dark"
                      size="md"
                      onClick={() => navigate(-1)}
                    >
                      Volver
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
