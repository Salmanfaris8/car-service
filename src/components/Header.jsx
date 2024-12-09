import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import SERVER_URL from '../services/serverurl'

const Header = ({insideDashborad,insideservice,insideprofile}) => {

  const navigate = useNavigate()
  const [userdetails,setUserDetails] = useState("")

  const handleLogout = async()=>{
      sessionStorage.clear()
      navigate('/')
  }

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))  
      setUserDetails(user.profilePic)        
    }
  },[])    

  return (
    <>
      <header className="container-fluid bg-light p-3 px-md-5">
        <div className="container-sm-fluid d-flex justify-content-between align-items-center">
            <div className="logo">
            <Link to={'/'} style={{textDecoration:'none'}} className='text-dark'><h5 className='fs-3'><i className='fa-solid fa-gears fs-2 me-2'></i> <span className='d-none d-sm-inline'>Gear Shift</span></h5></Link>
            </div>
            {
              !insideservice &&
              <div className="d-flex align-items-center">
            {
                  insideDashborad || insideprofile ?
                <>
                      {
                        !insideprofile && 
                        <div>
                          {
                            userdetails?.length>0?
                              <div><Link to={'/profile'} className='p-0 btn rounded'><img className='dashboard-profile rounded-circle' src={`${SERVER_URL}/uploads/${userdetails}`} alt="" /></Link></div> 
                            :
                            <div><Link to={'/profile'} className='p-0 btn rounded'><img className='dashboard-profile' src={avatar} alt="" /></Link></div> 
                          }
                        </div>
                      }
                      {
                        !insideDashborad &&
                        <div>
                          <Link to={'/dashboard'} className='btn btn-outline-dark d-none d-sm-inline'><i className="fa-solid fa-arrow-left"></i></Link>
                          <button onClick={handleLogout} className='btn btn-outline-dark ms-2'><span className='d-none d-sm-inline'>Logout</span> <i className="fa-solid fa-right-from-bracket ms-1"></i></button>
                        </div>
                      }
                </> 
                  :
                      <>
                        <nav className="navbar navbar-expand-lg navbar-dark">
                          <div id="navbarNav">
                              <ul className="navbar-nav ms-auto">
                                  <li className="nav-item">
                                      <Link to={'/about'} style={{fontSize:"20px"}} className="d-none d-sm-block nav-link text-dark" href="">About Us</Link>
                                  </li>
                              </ul>
                          </div>
                        </nav>
                    <div>
                      {
                        !sessionStorage.getItem('token') &&
                        <Link to={'/login'} className='btn btn-outline-dark ms-2'><i className="fa-regular fa-user d-none d-sm-inline"></i> Login <span className='d-none d-sm-inline'>/ Register</span></Link>
                      }
                    </div> 
                      </>
                }
            </div>
            }
        </div>
      </header>
    </>
  )
}

export default Header