
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import List from './pages/List'
import Login from './pages/Login'
import RegisterProfessional from './pages/RegisterProfessional'
import RegisterUser from './pages/RegisterUser'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Button from './components/Button'
import PerfilProfesionalPublico from './pages/PerfilProfesionalPublico'
import MiPerfil from './pages/MiPerfil'


function App() {

  return (
    <>
  <Navigation/>
    <div className='App'>
      <Routes>
  <Route path='/' element={<Home /> } />
  <Route path='/list' element={<List />} />
  <Route path='/login' element={<Login /> } />
  <Route path='/perfil/profesional/:id' element={<PerfilProfesionalPublico/> } />

  <Route path='/register/professional' element={<RegisterProfessional /> } />
  <Route path='/register/user' element={<RegisterUser /> } />
  <Route path='/miperfil' element={<MiPerfil />} />
   
 </Routes>
    </div>
      <Footer/>
 </>
  );
}
export default App;
