# 🧰 Trabajo Final: Plataforma de Oficios 
# Universidad Nacional del Nordeste
# Tecnicatura en Informática
Tecnicatura Universitaria en Informatica
Taller Integrador

# Autores


## 📖 Descripción general

Este proyecto consiste en el desarrollo de una **plataforma de oficios**, donde usuarios y profesionales pueden **registrarse, iniciar sesión y visualizar perfiles o servicios ofrecidos**.

El objetivo principal es **simular una aplicación web moderna** utilizando tecnologías actuales del entorno JavaScript, aplicadas a un contexto realista y funcional.

El proyecto **inició con HTML, CSS y JavaScript puro**, pero posteriormente se **migró a React con Vite** para aprovechar:

- Enrutamiento dinámico con `react-router-dom`
- Reutilización de componentes
- Organización modular del código
- Integración de **Bootstrap** y **CSS personalizado** para mejorar la experiencia visual

---

## ⚙️ Tecnologías utilizadas

- **React + Vite**
- **JavaScript (ES6+)**
- **Bootstrap 5**
- **HTML5 / CSS3** (adaptados a componentes React)
- **React Router DOM**
- **LocalStorage** (simulación de registro y login, en desarrollo)

---

## 📁 Estructura del proyecto

src/
├── assets/                     # Imágenes y recursos
├── data/                       # Carpeta de datos (por ejemplo, listas o JSON simulados)
│   └── dataProfesionales.jsx   # Datos iniciales de profesionales
├── components/                 # Componentes reutilizables
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Button.jsx
│   ├── FiltradoLista.jsx
│   └── OficiosConfig.jsx
├── pages/                      # Páginas principales del sitio
│   ├── Home.jsx
│   ├── List.jsx
│   ├── Login.jsx
│   ├── MiPerfil.jsx
│   ├── PerfilEditableUsuario.jsx
│   ├── PerfilEditableProfesional.jsx
│   ├── PerfilProfesionalPublico.jsx
│   ├── RegisterProfessional.jsx
│   └── RegisterUser.jsx
├── App.jsx                      # Rutas y estructura general del proyecto
└── main.jsx                     # Punto de entrada principal
markdown
Copiar código

---

## 🧱 Avance por etapas (Itinerario académico)

### 🩵 Etapa 1 – Estructura inicial
- Creación del proyecto con **Vite + React**.  
- Configuración de carpetas (`components`, `pages`, `assets`).  
- Configuración de **rutas básicas** en `App.jsx`.

### 💻 Etapa 2 – Diseño general
- Creación de los componentes **Navigation.jsx** (navbar responsive con Bootstrap) y **Footer.jsx**.  
- Verificación de **responsividad** en distintos dispositivos.

### 🎨 Etapa 3 – Home y estilo
- Diseño de la página principal **Home.jsx** como *landing page*.  
- Incorporación de estilos globales, secciones informativas y estructura visual clara.

### 🧾 Etapa 4 – Formularios
- Creación de los **formularios de Registro y Login** con validaciones básicas.  
- Implementación de `useState` y `onChange` para manejar entradas de usuario.  
- Preparación para conexión con **localStorage** (simulación de sesión).  

### 🧩 Etapa 5 – Listado de Profesionales
- Importación del archivo `dataProfesionales.jsx` y carga inicial en estado local.  
- Estados de **filtros dinámicos**: oficio, provincia y ciudad.  
- Creación del componente **FiltradoLista** con:
  - Select de Oficio (categorías predefinidas).  
  - Select de Provincia dinámico.  
  - Select de Ciudad dependiente de la provincia seleccionada.  
- **Filtrado automático** según los selects.  
- Renderizado de resultados con **cards** que muestran:
  - Imagen (con fallback por defecto).  
  - Nombre, oficio, ubicación, descripción y botón de “Ver perfil”.  
- Mensaje de alerta si no se encuentran resultados.  
- Implementación de paginado progresivo con botón **“Ver más”**.  

---

## 🧠 Justificación técnica

La elección de **React + Vite** en lugar de una estructura estática se fundamenta en:

- Modularidad del código y **reutilización de componentes**.  
- Separación de responsabilidades (mejor mantenimiento).  
- **Optimización del rendimiento** gracias a Vite (arranque rápido y *hot reload*).  
- Simulación de comportamientos dinámicos sin depender de un backend real.  

Estas mejoras permiten comprender el **flujo de datos** en aplicaciones modernas y preparan la base para una futura conexión con **APIs o bases de datos reales**.

---

## 🚀 Próximos pasos

🔹 Conectar los formularios de **registro y login** con `localStorage` (en proceso...)
🔹 Implementar la **persistencia de sesión** (usuario activo).  
🔹 Crear páginas de **perfil** para usuarios y profesionales.  
🔹 Incorporar **búsqueda avanzada** o filtrado por nombre/oficio.  
🔹 Mejorar la estructura de datos del archivo `dataProfesionales.jsx`.  
🔹 Implementar un pequeño **CRUD local** (alta, baja, modificación de profesionales).   
🔹 **Integrar un backend real** para gestión de usuarios y datos:
   - Posibles tecnologías: **Node.js + Express** o **Firebase**.  
   - Conexión a base de datos (por ejemplo, **MongoDB** o **Firestore**).  
   - Reemplazo gradual del localStorage por almacenamiento persistente en servidor.  
   - Implementación de endpoints para login, registro y perfiles.  

---

## 🖥️ Ejecución del proyecto

Para ejecutar el proyecto localmente:

```bash
npm install
npm run dev

Luego abrir en el navegador la URL indicada en la consola (por defecto):
👉 http://localhost:5173/

🌐 Enlace al proyecto

🔗 Deploy en GitHub Pages:
https://lesliebellando.github.io/tp-final-react-leslie-bellando/
