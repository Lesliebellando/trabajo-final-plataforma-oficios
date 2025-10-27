import React from "react";
import { OficiosConfig } from "../components/OficiosConfig";

export default function FiltroProfesionales({
  oficio, setOficio,
  provincia, setProvincia,
  ciudad, setCiudad,
  provincias, ciudades,
  onSubmit
}) {
  return (
    <div className="card brand-card mx-auto p-3 p-sm-4">
      <h2 className="h5 section-title mb-3">Menú de búsqueda</h2>

      <form onSubmit={onSubmit}>
        {/* Oficio */}
        <div className="mb-3">
          <label htmlFor="oficio" className="form-label">Oficio</label>
          <select
            id="oficio"
            className="form-select"
            value={oficio}
            onChange={(e) => setOficio(e.target.value)}
          >
            <option value="">Elegí un oficio…</option>
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

        {/* Provincia */}
        <div className="mb-3">
          <label htmlFor="provincia" className="form-label">Provincia</label>
          <select
            id="provincia"  
            className="form-select"
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
          >
            <option value="">Elegí una provincia…</option>
            {provincias.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Ciudad */}
        <div className="mb-3">
          <label htmlFor="ciudad" className="form-label">Ciudad</label>
          <select
            id="ciudad"
            className="form-select"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          >
            <option value="">Elegí una ciudad…</option>
            {[...new Map(
              ciudades
                .filter((c) => !provincia || c.provincia === provincia)
                .map((c) => [`${c.nombre}-${c.provincia}`, c])
            ).values()].map((c) => (
              <option key={`${c.nombre}-${c.provincia}`} value={c.nombre}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-brand btn-lg text-white">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}