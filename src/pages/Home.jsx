import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { homeServiceAPI } from '../services/allAPI'
import SERVER_URL from '../services/serverurl'

const Home = () => {

  const navigate = useNavigate()
  const [homeService,setHomeService] = useState([])

  useEffect(()=>{
    getHomeServices()
  },[])

  const getAllServices = async()=>{
    if(sessionStorage.getItem('token')){
      navigate('/services')
    }
    else{
      alert("Please login to see all services !!!")
    }
  }

  const getHomeServices = async()=>{
    try{
      const result = await homeServiceAPI()
      if(result.status == 200){
        setHomeService(result.data)
      }
    }
    catch(err){
      // console.log(err);
    }
  }

  return (
    <>
      <Header/>
        <div className='container'>
          <div className="home-content row align-items-center">
            <div className="col-lg-6 px-5">
              <h1>Revitalize Your Ride</h1><br />
              <p className='fs-5' style={{lineHeight:'30px'}}>Get reliable car service with certified technicians handling maintenance, oil changes, tire care, engine checks, and more.</p>
              <p className='fs-5 d-none d-sm-block' style={{lineHeight:'30px'}}> We offer transparent pricing, fast service, and excellent customer care to keep your car running at its best.</p>
              {
                sessionStorage.getItem('token') &&
                <Link to={'/dashboard'} className='btn btn-dark'>SCHEDULE YOUR SERVICE</Link>
              }
            </div>
            <div className='col-lg-6 d-none d-lg-block'>
              <img className='img-fluid' src="https://cdn.dribbble.com/users/207059/screenshots/16573461/ms_11.gif" alt="" />
            </div>
          </div>
          {/* services */}
          <section id="services" className="py-5 mb-5">
            <div>
              <h2 className="text-center mb-4">Our Services</h2>
              <div className="row">
                {
                  homeService?.length>0 &&
                  homeService?.map(service=>(
                    <div key={service?._id} className="col-md-4 mb-3">
                      <div className="card h-100 shadow-sm">
                        <img src={`${SERVER_URL}/uploads/${service?.serviceImg}`} className="card-img-top" alt="Oil Change"/>
                        <div className="card-body">
                          <h5 className="card-title">{service?.title}</h5>
                          <p className="card-text">{service?.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='w-100 text-center'><button onClick={getAllServices} className='btn btn-outline-primary'>MORE SERVICES</button></div>
            </div>
          </section>
          {/* about */}
          <section id="about-us" className="about-us-section p-4 rounded border">
            <div>
              <div className="row">
                <div className="col-lg-6">
                  <h2 className="text-center mb-4">About Us</h2>
                  <p className="lead">
                    At <strong>Gear Shift</strong>, we believe that your car deserves the best care. Our team of expert technicians has been serving the community with top-notch car maintenance and repair services for over 5 years. We are passionate about keeping your vehicle in optimal condition, whether it’s a quick oil change or a major engine overhaul.
                  </p>
                  <p className='d-none d-sm-block'>
                    We offer a wide range of services including diagnostics, tire services, brake repairs, and more. We use the latest equipment and high-quality parts to ensure your vehicle runs smoothly and efficiently.
                  </p>
                </div>
                <div className="col-lg-6">
                  <img className='img-fluid' src="https://etimg.etb2bimg.com/photo/85364012.cms" alt="" />
                </div>
              </div>
            </div>
          </section>
        </div>
    </>
  )
}

export default Home