# 🧩 Trabajo Final – Tecnicatura en Informática  
## Plataforma de Oficios – Proyecto Web con React + Vite + JavaScript

### 👩‍💻 Autores

Universidad Nacional del Nordeste
Tecnicatura Superior en Informática  
Corrientes, Argentina  

---

## 📖 Descripción del proyecto

Este proyecto consiste en el desarrollo de una **plataforma de oficios**, donde usuarios y profesionales pueden registrarse, iniciar sesión y visualizar perfiles o servicios ofrecidos.  

El objetivo principal es **simular una aplicación web moderna**, utilizando tecnologías actuales del entorno JavaScript, aplicadas a un contexto realista y funcional.  

Inicialmente el proyecto fue diseñado con **HTML, CSS y JavaScript puro**, pero posteriormente se decidió **migrar a React con Vite** para aprovechar:  

- El **enrutamiento dinámico** con *react-router-dom*  
- El **reutilizado de componentes**  
- La **organización modular** del código  
- El uso de **Bootstrap** y **CSS personalizado** para mejorar la experiencia visual  

---

## ⚙️ Tecnologías utilizadas

## ⚙️ Tecnologías utilizadas

- **React + Vite**
- **JavaScript (ES6+)**
- **Bootstrap 5**
- **HTML5 / CSS3 (adaptados a componentes React)**
- **React Router DOM**
- **LocalStorage** (para simulación de registro/login)

---



## 📁 Estructura del proyecto

src/
├── assets/ # Imágenes y recursos
├── components/ # Componentes reutilizables (Navbar, Footer, Formularios)
├── pages/ # Páginas principales del sitio
├── App.jsx # Rutas y estructura general
├── main.jsx # Punto de entrada
└── index.css # Estilos globales


## 🧱 Avance por etapas (Itinerario académico)

**Etapa 1 – Estructura inicial**
- Creación del proyecto con Vite + React.  
- Configuración de carpetas (`components`, `pages`, `assets`).  
- Configuración de rutas básicas en `App.jsx`.  

**Etapa 2 – Diseño general**
- Creación del componente `Navigation.jsx` (navbar responsive con Bootstrap).  
- Creación del componente `Footer.jsx`.  
- Verificación de responsividad.  

**Etapa 3 – Home y estilo**
- Diseño de la página principal (`Home.jsx`) como landing page.  
- Incorporación de estilos globales y estructura visual con contenedores.  

**Etapa 4 – Formularios**
- Creación de los formularios de Registro y Login con validaciones básicas.  
- Implementación de `useState` y `onChange` para manejar entradas.  
- Preparación para almacenamiento en `localStorage` y simulación de sesión.  

3er commit 
Implementación de registro de profesionales y usuarios en la plataforma.

Uso de React + Vite con state y useEffect para manejar formularios dinámicos.

Validación de formularios con mensajes de error, tanto para campos vacíos como formato de email y longitud de contraseña.

Almacenamiento de datos en localStorage:

Listas separadas de profesionales y usuarios.

Gestión del usuario activo para sesión persistente.

Desarrollo de login único que:

Permite iniciar sesión a profesionales y usuarios.

Valida credenciales contra el localStorage.

Redirige automáticamente al perfil correspondiente según el tipo de usuario.

Uso de React Router DOM para navegación programática (navigate).

Mejoras de UX/UI:

Inputs con errores visibles.

Formularios responsivos y botones claros para registro y login.

Preparación para la futura visualización de perfiles y búsqueda de profesionales.
---

## 🧠 Justificación técnica

La decisión de utilizar **React + Vite** en lugar de HTML y CSS está basada en la necesidad de aplicar **buenas prácticas de desarrollo moderno**, como:

- Modularidad del código y escalabilidad.  
- Separación de responsabilidades entre componentes.  
- Optimización del rendimiento con *Vite* (arranque rápido y hot reload).  
- Simulación de comportamientos dinámicos sin depender de un backend real.  

Estas mejoras facilitan la comprensión del flujo de datos y preparan la base para futuras integraciones con APIs o bases de datos.

---

## 🚀 Próximos pasos

- Conectar los formularios con `localStorage`.  
- Implementar un “perfil” simulado al iniciar sesión.  
- Añadir búsqueda o listado de profesionales.  
- Preparar deploy final en GitHub Pages.

---

## 🖥️ Ejecución del proyecto

Para ejecutar el proyecto localmente:

```bash
npm install
npm run dev
Luego, abrir en el navegador la URL que aparece en consola (por defecto:
👉 http://localhost:5173/).

🌐 Enlace al proyecto
🔗 Deploy en GitHub Pages
