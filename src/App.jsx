
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import List from './pages/List'
import Login from './pages/Login'
import ProfileProfessional from './pages/ProfileProfessional'
import ProfileUser from './pages/ProfileUser'
import RegisterProfessional from './pages/RegisterProfessional'
import RegisterUser from './pages/RegisterUser'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Button from './components/Button'

function App() {

  return (
    <>
  <Navigation/>
    <div className='App'>
      <Routes>
  <Route path='/' element={<Home /> } />
  <Route path='/lista' element={<List />} />
  <Route path='/login' element={<Login /> } />
  <Route path='/profile/professional/:id' element={<ProfileProfessional/> } />
  <Route path='/profile/user/:id' element={<ProfileUser /> } />
  <Route path='/register/professional' element={<RegisterProfessional /> } />
  <Route path='/register/user' element={<RegisterUser /> } />
   
 </Routes>
    </div>
      <Footer/>
 </>
  );
}
export default App;
