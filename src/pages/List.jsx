import React, { useState, useEffect } from "react";
import { dataprofesionales } from "../data/dataprofesionales";
import Button from "../components/Button";
import "./List.css";
import FiltradoLista from "../components/FiltradoLista";

export default function ProfesionalesList() {
  const [lista, setLista] = useState([]);
  const [oficio, setOficio] = useState("");
  const [provincia, setProvincia] = useState("");
  const [ciudad, setCiudad] = useState("");
const [visibleCount, setVisibleCount] = useState(18);

const handleVerMas = () => {
  setVisibleCount((prev) => prev + 18);
};

  const handleFiltrar = (e) => {
    e.preventDefault();
   
  };

  useEffect(() => {
    setLista(dataprofesionales);
  }, []);

  const listaFiltrada = lista.filter((prof) => {
    return (
      (oficio === "" || prof.oficio === oficio) &&
      (provincia === "" || prof.provincia === provincia) &&
      (ciudad === "" || prof.ciudad === ciudad)
    );
  });

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Listado de Profesionales</h2>

      <div className="row">
        {/* Columna de filtros */}
        <div className="col-12 col-lg-3 mb-4">
          <FiltradoLista
            oficio={oficio} setOficio={setOficio}
            provincia={provincia} setProvincia={setProvincia}
            ciudad={ciudad} setCiudad={setCiudad}
            provincias={[...new Set(lista.map((p) => p.provincia))]}
            ciudades={lista.map((p) => ({ nombre: p.ciudad, provincia: p.provincia }))}
            onSubmit={handleFiltrar}
          />
        </div>
{/* Columna de lista */}
<div className="col-12 col-lg-9">
  <div className="row">
    {listaFiltrada.length === 0 ? (
      <div className="col-12">
        <div className="alert alert-warning text-center">
          No se encontraron coincidencias con tu búsqueda.
        </div>
      </div>
    ) : (
      <>
        {listaFiltrada.slice(0, visibleCount).map((prof) => (
          <div key={prof.id} className="col-12 col-sm-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={prof.imagen || "https://via.placeholder.com/300x200?text=Sin+Foto"}
                className="card-img-top"
                alt={prof.nombre}
              />
              <div className="card-body">
                <h5 className="card-title">{prof.nombre}</h5>
                <p className="card-text mb-1">
                  <strong>Oficio:</strong> {prof.oficio}
                </p>
                <p className="card-text mb-1">
                  <strong>Ciudad:</strong> {prof.ciudad}, {prof.provincia}
                </p>
                <p className="card-text">{prof.descripcion}</p>
                <Button to={`/perfil/${prof.id}`} size="sm" variant="gradient">
                  Ver perfil
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Botón Ver más */}
        {visibleCount < listaFiltrada.length && (
          <div className="col-12 text-center mt-3">
            <button
              className="btn btn-outline-brand btn-lg"
              onClick={handleVerMas}
            >
              Ver más
            </button>
          </div>
        )}
      </>
    )}
  </div>
</div>
</div>
</div> ); 
}