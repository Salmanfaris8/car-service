import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { allServicesAPI, editBookingAPI } from '../services/allAPI';
import { editBookingResponseContext } from '../contexts/contextAPI';

const Edit = ({bookings}) => {

  const {editBookingResponse,setEditBookingResponse} = useContext(editBookingResponseContext)
  const [allservices,setAllServices] = useState([])
  const [searchKey,serSearchKey] = useState("")
  const [show, setShow] = useState(false);
  const [bookService,setBookService] = useState({
    id:bookings._id,model:bookings.model,servicename:bookings.servicename ,date:bookings.date ,time:bookings.time ,status:bookings.status
  })

  useEffect(()=>{
    getAllServices()
  },[searchKey])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = async()=>{
    const {id,model,servicename,date,time} = bookService
    if(model && servicename && date && time){
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }
      if(token){
        try{
          const result = await editBookingAPI(id,bookService,reqHeader)
          if(result.status == 200){
            alert("Booking updated successfully!!!")
            handleClose()
            setEditBookingResponse(result)
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
      <div>
        <button  disabled={bookings.status} className='btn btn-success' onClick={handleShow}><span className='fw-bold'><i className="fa-solid fa-pen-to-square"></i></span></button>
      </div>
      <Modal
        size='lg' 
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <div className="mb-3">
                <label htmlFor="text" className="form-label">Car Model :</label>
                <input value={bookService.model} onChange={e=>setBookService({...bookService,model:e.target.value})} type="text" id="date" className="form-control"/>
              </div>
              <div className="mb-3">
                <label htmlFor="service" className="form-label">Choose Service:</label>
                <select value={bookService.servicename} onChange={e=>setBookService({...bookService,servicename:e.target.value})} id="service" className="form-select">
                  <option value="">services</option>
                  {
                    allservices?.length>0 &&
                    allservices?.map(service=>(
                      <option key={service?._id} value={service?.title}>{service?.title}</option>
                    ))
                  }
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date:</label>
                <input value={bookService.date} onChange={e=>setBookService({...bookService,date:e.target.value})} type="date" id="date" className="form-control"/>
              </div>
              <div className="mb-3">
                <label htmlFor="time" className="form-label">Time:</label>
                <input value={bookService.time} onChange={e=>setBookService({...bookService,time:e.target.value})} type="time" id="time" className="form-control"/>
              </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleEdit} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit