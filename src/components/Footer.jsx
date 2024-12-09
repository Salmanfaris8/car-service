import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div style={{height:'300px'}} className='container my-5 w-100'>
        <div className="d-flex justify-content-between flex-wrap">
          <div style={{width:'400px'}} className="intro">
            <div className='text-dark'><h5 className='fs-4'><i className='fa-solid fa-gears fs-2 me-2'></i> Gear Shift</h5></div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum numquam perferendis molestias eaque quibusdam officiis aperiam dignissimos consequuntur quo in! Debitis aut eveniet hic neque, sunt cum ipsum? Explicabo, deserunt.</p>
            <p>Code licensed Luminar, docs CC BY 3.0.</p>
            <p>Currently v5.3.2.</p>
          </div>
          <div className="d-flex flex-column">
            <h5>Links</h5>
            <Link to={'/'} style={{textDecoration:'none',color:'black'}}>Home</Link>
            <Link to={'/login'} style={{textDecoration:'none',color:'black'}}>Login</Link>
            <Link to={'/register'} style={{textDecoration:'none',color:'black'}}>Register</Link>
            <Link className='d-sm-none' to={'/about'} style={{textDecoration:'none',color:'black'}}>About Us</Link>
          </div>
          <div className="d-flex flex-column">
          <h5>Guides</h5>
            <a href="https://react.dev/" style={{textDecoration:'none',color:'black' }} target='_blank'>React</a>
            <a href="https://react-bootstrap.github.io/" style={{textDecoration:'none',color:'black' }} target='_blank'>React Bootstrap</a>
            <a href="https://reactrouter.com/en/main" style={{textDecoration:'none',color:'black' }} target='_blank'>React Router</a>
          </div>
          <div className="d-flex flex-column mt-3">
          <h5>Contact Us</h5>
            <div className='d-flex'>
              <input placeholder='Enter your email here' type="text" name="" id="" className='form-control' />
              <button className='btn btn-dark ms-2'><i className='fa-solid fa-arrow-right'></i></button>
            </div>
            <div className='icons d-flex justify-content-between mt-3'>
                <a href="" style={{textDecoration:'none',color:'black'}} target='_blank'><i className='fa-brands fa-twitter'></i></a>
                <a href="" style={{textDecoration:'none',color:'black'}} target='_blank'><i className='fa-brands fa-instagram'></i></a>
                <a href="" style={{textDecoration:'none',color:'black' }} target='_blank'><i className='fa-brands fa-facebook'></i></a>
                <a href="" style={{textDecoration:'none',color:'black' }} target='_blank'><i className='fa-brands fa-linkedin'></i></a>
                <a href="" style={{textDecoration:'none',color:'black' }} target='_blank'><i className='fa-brands fa-github'></i></a>
                <a href="" style={{textDecoration:'none',color:'black' }} target='_blank'><i className='fa-solid fa-phone'></i></a>
            </div>
          </div>
        </div>
        <p className='text-center mt-3'>Copyright &copy; June 2024 Batch, GearShift.Built with React</p>
      </div>
    </>
  )
}

export default Footer