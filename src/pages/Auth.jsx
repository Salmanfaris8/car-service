import React, { useContext, useState } from 'react'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { adminTokenAuthContext, tokenAuthContext } from '../contexts/AuthContextAPI'

const Auth = ({insideRegister}) => {

  const {adminIsAuthorised,setAdminIsAuthorised} = useContext(adminTokenAuthContext)
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate()
  const [inputData,setInputData] = useState({
    username:"",email:"",password:""
  })
  const [isLogined,setIsLogined] = useState(false)

  const handleRegister = async(e)=>{
    e.preventDefault()
    console.log("inside handleRegister");
    if(inputData.username && inputData.email && inputData.password){
      try{
        const result = await registerAPI(inputData)
        // console.log(result);
        if(result.status == 200){
          alert(`welcome ${result.data?.username}, Please login to explore our website!!!`)
          navigate('/login')
          setInputData({username:"",email:"",password:""})
        }
        else{
          if(result.response.status == 406){
            alert(result.response.data)
            setInputData({username:"",email:"",password:""})
            navigate('/login')
          }
        }
      }
      catch(err){
        // console.log(err);
      }
    }
    else{
      alert("Please fill the form completely!!!")
    }
  }

  const handleLogin = async(e)=>{
    e.preventDefault()
    if(inputData.email && inputData.password){
      try{
        const result = await loginAPI(inputData)
        if(result.status == 200){
          sessionStorage.setItem('user',JSON.stringify(result.data.user))
          sessionStorage.setItem('token',result.data.token)  
          setIsAuthorised(true)      
          setIsLogined(true)
          if(result.data.user.role=="admin"){
            setAdminIsAuthorised(true) 
            navigate('/admin')
          }
          else{
            setTimeout(()=>{
              setInputData({username:"",email:"",password:""})
              navigate('/')
              setIsLogined(false)
            },2000)
          }
            
        }
        else{
          if(result.response.status == 404){
            alert(result.response.data)
          }
        }
      }
      catch(err){
        // console.log(err);
      }
    }
    else{
      alert("Please fill the form completely!!!")
    }
  }

  return (
    <>
      <div style={{width:'100%'}} className='main d-flex justify-content-center align-items-center'>
      <div className="container d-flex justify-content-center w-100">
        <div style={{width:'1100px'}} className="shadow my-3 card p-3">
          <div className="login row align-items-center">
            <div className="col-lg-6 d-none d-lg-block">
              <img src="https://www.autofacets.com/wp-content/uploads/2021/07/22072021-02.png" alt="" className="img-fluid" />
            </div>
            <div className="col-lg-6">
              <h1 className="mb-ms-5"><i className='fa-solid fa-gears me-2'></i> Gear Shift</h1>
              <h5>Sign {insideRegister?"Up":"In"} to your Account</h5>
              <Form>
                  {
                    insideRegister && <FloatingLabel
                    controlId="floatingInputName"
                    label="Username"
                    className="mb-sm-3 mb-2"
                  >
                    <Form.Control value={inputData.username} onChange={e=>setInputData({...inputData,username:e.target.value})} type="text" placeholder="Username " />
                  </FloatingLabel>
                  }
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-sm-3 mb-2"
                >
                  <Form.Control value={inputData.email} onChange={e=>setInputData({...inputData,email:e.target.value})} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control value={inputData.password} onChange={e=>setInputData({...inputData,password:e.target.value})} type="password" placeholder="Password" />
                </FloatingLabel>
                {
                  insideRegister ?
                  <div className="mt-sm-4 mt-2">
                    <button onClick={handleRegister} className='btn btn-dark'>Register</button>
                    <p className='mt-2'>Already A User? Please Click here to <Link to={'/login'}>Login</Link></p>
                  </div>
                  :
                  <div className="mt-sm-4 mt-1">
                    <button onClick={handleLogin} className='btn btn-dark'>Login  
                      {isLogined && <Spinner animation="border" size="sm" />}
                      </button>
                    <p className='mt-2'>New User? Please Click here to <Link to={'/register'}>Register</Link></p>
                  </div>
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Auth