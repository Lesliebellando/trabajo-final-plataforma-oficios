import {FaEnvelope, FaWhatsapp, FaGithub} from 'react-icons/fa';
import './Footer.css'

function Footer () {
    return (
        <footer className='app-footer'>
            <div className="container-fluid p-5 text-center">
                <div className='footer-separator'>
    <div className='footer-icons'>
    <h6>Contactanos</h6>
     <ul>
              <li className='footer-icon'>
                <a  href="mailto:lesliebellando@gmail.com"><FaEnvelope /></a>
              </li>
              <li className='footer-icon'>
                <a href="https://wa.me/5493794189166"><FaWhatsapp /></a>
              </li>
              <li className='footer-icon'>
                <a  href="https://github.com/lesliebellando"><FaGithub /></a>
              </li>
            </ul>
  </div>
   
<div className='footer-info'>
<p>© {new Date().getFullYear()} OficiosApp — Todos los derechos reservados.</p>
       <p><a href="/terminos" className=' text-dark'>Términos y condiciones</a> | <a href="/privacidad" className=' text-dark'>Política de privacidad</a></p>
    
</div> 
</div>
    </div>

 
        </footer>
    )
}

export default Footer; 