import React, { useContext, useEffect, useState } from 'react'
import { allServicesAPI, bokkingAPI } from '../services/allAPI';
import { bookingResponseContext } from '../contexts/contextAPI';

const Booking = () => {

  const {bookingResponse,setBookingResponse} = useContext(bookingResponseContext)
  const [allservices,setAllServices] = useState([])
  const [searchKey,serSearchKey] = useState("")
  const [bookService,setBookService] = useState({
    model:"",servicename:"",date:"",time:""
  })

  useEffect(()=>{
    getAllServices()
  },[])

  const handleBooking = async()=>{
    const {model,servicename,date,time} = bookService
    if(model && servicename && date && time){
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeader = {
          "Authorization":`Bearer ${token}`
        }
        try{
          const result = await bokkingAPI(bookService,reqHeader)
          if(result.status == 200){
            alert("Your booking request successfully submitted!!!")
            setBookService({model:"",servicename:"",date:"",time:""})
            setBookingResponse(result)
          }
        }
        catch(err){
          // console.log(err);
        }
      }
    }
    else{
      alert("Please fill the form completely!!!")
    }
  }
  const getAllServices = async()=>{
    try{
      const result = await allServicesAPI(searchKey)
      if(result.status == 200){
        setAllServices(result.data)
      }
    }
    catch(err){
      // console.log(err);
    }
  }  

  return (
    <>
      <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
      <h2 className='text-center mb-3 w-75'>Book Your Appoinment</h2>
        <div className="booking-card card mb-4">
          <div className="card-body">
            <form>
            <div className="mb-3">
                <label htmlFor="text" className="form-label">Car Model :</label>
                <input value={bookService.model} onChange={e=>setBookService({...bookService,model:e.target.value})} type="text" id="date" className="form-control"/>
              </div>
              <div className="mb-3">
                <label htmlFor="service" className="form-label">Choose Service :</label>
                <select value={bookService.servicename} onChange={e=>setBookService({...bookService,servicename:e.target.value})} id="service" className="form-select">
                <option value="">Services</option>
                  {
                    allservices?.length>0 &&
                    allservices?.map(service=>(
                      <option key={service?._id} value={service.title}>{service.title}</option>
                    ))
                  }
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date :</label>
                <input value={bookService.date} onChange={e=>setBookService({...bookService,date:e.target.value})} type="date" id="date" className="form-control"/>
              </div>
              <div className="mb-3">
                <label htmlFor="time" className="form-label">Time :</label>
                <input value={bookService.time} onChange={e=>setBookService({...bookService,time:e.target.value})} type="time" id="time" className="form-control"/>
              </div>
              <button onClick={handleBooking} type="button" className="btn btn-primary">Book Appointment</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Booking