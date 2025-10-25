

import { Navigate } from "react-router-dom";
import PerfilProfesionalEditable from "./PerfilProfesionalEditable";
import PerfilUsuarioEditable from "./PerfilUsuarioEditable";

export default function MiPerfil() {
  let user = JSON.parse(localStorage.getItem("usuarioActivo"));

  // Si no hay usuario, usamos uno de prueba
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




// import { Navigate } from "react-router-dom";
// import PerfilProfesionalEditable from "./PerfilProfesionalEditable";
// import PerfilUsuarioEditable from "./PerfilUsuarioEditable";

// export default function MiPerfil() {
//   // Recuperamos el usuario activo (puede venir de localStorage o de un AuthContext)
//   const user = JSON.parse(localStorage.getItem("usuarioActivo"));

//   // Si no hay usuario logueado, redirigimos a login
// //   if (!user) {
// //     return <Navigate to="/login" replace />;
// //   }

//   // Según el rol, mostramos el perfil correspondiente
//   if (user.role === "profesional") {
//     return <PerfilProfesionalEditable />;
//   }

//   if (user.role === "usuario") {
//     return <PerfilUsuarioEditable />;
//   }

//   // Si por algún motivo el rol no coincide con ninguno
//   return <p>Rol no reconocido</p>;
// }
