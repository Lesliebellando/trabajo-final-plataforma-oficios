import React from "react";
import imagenprincipal from '../assets/imagen-principal.jpg';

import { Link } from "react-router-dom";

import './Home.css'
import Button from "../components/Button";
function Home() {
  return (
    <div className="container mt-4">
 {/* <!-- Hero --> */}
<main className="hero">
  <div className="container-fluid">
   <div className="row">
    <div className="home-text col-ms-12 col-md-12 col-lg-6">
      <h1>CONECTAMOS OFICIOS CON PERSONAS</h1>
      <p>Acercá tus servicios a quienes los necesitan, recibí consultas y generá contactos de manera simple y rápida. </p>
      <p className="text-center" ><b>¡Tu próximo cliente puede estar buscándote acá mismo!</b></p>
      <Button to="/register/professional" variant="gradient" size="md">Quiero ofrecer mis servicios</Button>
    </div>
    <div className="col-ms-12 col-md-12 col-lg-6">
      <img src= {imagenprincipal} alt="Grupo de profesionales de distintos oficios levantando el puño en señal de éxito" />
    </div>
    </div> 
  </div>
</main>

{/* <!-- Ventajas --> */}
<section className="features-section">
  <div className="card-container-fluid">
    <h2>¿Por qué elegir TuOficio?</h2>
      <div className="row g-4 align-items-stretch">
        <div className="col-sm-12 col-md-12 col-lg-4 d-flex">
      <div className="card">
        <h3>Visibilidad inmediata</h3>
        <p>Tu perfil aparece frente a personas que buscan justo lo que ofrecés.</p>
      </div>
      </div>

      <div className="col-sm-12  col-md-12 col-lg-4">
        <div className="card">
        <h3>Consultas simples</h3>
        <p>Recibí mensajes y presupuestos desde un único lugar.</p>
      </div>
      </div>

      <div className="col-sm-12 col-md-12 col-lg-4 ">
         <div className="card">
        <h3>Confianza y seguridad</h3>
        <p>Perfiles verificados y reseñas para construir reputación.</p>
      </div>
      </div>
    </div>
    </div>
 

</section>

{/* <!-- CTA Band --> */}
<section className="cta-band-section">
  <div className="container cta-band col text-center">
    <h2>¿Listo para empezar?</h2>
    <p>Creá tu perfil gratis y empezá a recibir consultas hoy mismo.</p>
    <div className="cta-buttons">
       <Button to="/register/professional" variant="dark" size="md">
  Crear mi perfil
</Button>
      <Button to="/login" variant="dark" size="md">Ingresar</Button>
      
    </div>
  </div>
</section>
</div>

  );
}

export default Home;
