import React, { useContext, useEffect, useState } from 'react'
import Edit from '../components/Edit'
import { deleteBookingAPI, userBokkingAPI } from '../services/allAPI'
import { bookingResponseContext, editBookingResponseContext } from '../contexts/contextAPI'

const View = () => {

  const {editBookingResponse,setEditBookingResponse} = useContext(editBookingResponseContext)
  const {bookingResponse,setBookingResponse} = useContext(bookingResponseContext)
  const [userBookingDetails,setUserBookingDetails] = useState([])
  
  useEffect(()=>{
    getuserBookings()
  },[bookingResponse,editBookingResponse])

  const getuserBookings = async()=>{
    const token = sessionStorage.getItem('token')
    if(token){
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }
      try{
        const result = await userBokkingAPI(reqHeader)
        if(result.status == 200){          
          setUserBookingDetails(result.data)
        }
      }
      catch(err){
        // console.log(err);
      }

    }
  }

  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem('token')
    if(token){
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }
      try{
        await deleteBookingAPI(id,reqHeader)
        getuserBookings()
      } 
      catch(err){
        // console.log(err);      
      }
    }
  }  

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h2>Your Bookings</h2>
      <div className="view-card card mb-4">
        <div className="card-body">
          <div className="row">
            {
              userBookingDetails?.length>0?
              userBookingDetails?.map(bookings=>(
                <div key={bookings?._id}>
                  <div className="card-body d-sm-flex justify-content-between align-items-center">
                    <div>
                      <p><strong>Car Model :</strong> {bookings?.model}</p>
                      <p><strong>Service :</strong> {bookings?.servicename}</p>
                      <p><strong>Date :</strong> {bookings?.date.split('-').reverse().join('-')}</p>
                      <p><strong>Time :</strong> {bookings?.time}</p>
                      <p className='d-flex'><strong className='me-2'>Status :</strong>{bookings?.status=="Confirmed"?<span className='text-success fw-bolder'>{bookings?.status}</span>:bookings?.status=="Rejected"?<span className='text-danger fw-bolder'>Rejected</span>:<span className='text-danger fw-bolder'>pending</span>}</p>
                    </div>
                    <div className="d-flex justify-content-sm-between justify-content-center">
                      <Edit bookings={bookings}/>
                      <button onClick={()=>handleDelete(bookings?._id)} className='btn btn-danger ms-4'><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
              :
              <div className='text-danger fw-bolder'>*not bookings yet</div>
            }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default View