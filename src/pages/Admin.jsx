import React, { useContext } from 'react'
import AddService from '../components/AddService'
import UserList from '../components/UserList'
import BookingApproval from '../components/BookingApproval'
import { useNavigate } from 'react-router-dom'
import { adminTokenAuthContext } from '../contexts/AuthContextAPI'

const Admin = () => {

  const {adminIsAuthorised,setAdminIsAuthorised} = useContext(adminTokenAuthContext)
  const navigate = useNavigate()
  const handleLogout = async()=>{
    sessionStorage.clear()
    navigate('/')
  }
  

  return (
    <>
        <div className="container mt-5">
            <div className='d-flex justify-content-between align-items-center mb-4'>
              <h1 className="text-center">Admin <span className='d-none d-sm-inline'>Dashboard</span></h1>
              <button onClick={handleLogout} className='btn btn-outline-dark ms-2'><span className='d-none d-sm-inline'>Logout</span> <i className="fa-solid fa-right-from-bracket ms-1"></i></button>
            </div>
            <div>
                <UserList />
                <BookingApproval/>
                <AddService />
            </div>
        </div>
    </>
  )
}

export default Admin