

import { Navigate } from "react-router-dom";
import PerfilProfesionalEditable from "./PerfilProfesionalEditable";
import PerfilUsuarioEditable from "./PerfilUsuarioEditable";

export default function MiPerfil() {
  let user = JSON.parse(localStorage.getItem("usuarioActivo"));

  // Si no hay usuario, se usa uno de prueba
  if (!user) {
    user = { role: "profesional" }; 
    // o { role: "usuario" } según lo que quieras testear
  }

  if (user.role === "profesional") {
    return <PerfilProfesionalEditable />;
  }

  if (user.role === "usuario") {
    return <PerfilUsuarioEditable />;
  }

  return <p>Rol no reconocido</p>;
}



