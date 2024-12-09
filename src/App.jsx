import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Services from './pages/Services'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import About from './pages/About'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import { useContext } from 'react'
import { adminTokenAuthContext, tokenAuthContext } from './contexts/AuthContextAPI'
import Pnf from './pages/Pnf'

function App() {

  const {adminIsAuthorised,setAdminIsAuthorised} = useContext(adminTokenAuthContext)
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {
          isAuthorised &&
          <>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path='/profile' element={<Profile/>}/>
          </>
        }
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth insideRegister={true}/>}/>
        <Route path='/about' element={<About/>}/>
        {
          adminIsAuthorised &&
          <Route path='/admin' element={<Admin/>}/>
        }
        <Route path='/*' element={<Pnf/>}/>
      </Routes>
      {
        !adminIsAuthorised &&
        <Footer/>
      }
    </>
  )
}

export default App
