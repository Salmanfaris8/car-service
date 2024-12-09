import React, { useContext, useEffect, useState } from 'react'
import { allBookingsAPI } from '../services/allAPI'
import EditApproval from './EditApproval'
import { approveBookingResponseContext, bookingResponseContext } from '../contexts/contextAPI'

const BookingApproval = () => {

    const {approveBookingResponse,setApproveBookingResponse} = useContext(approveBookingResponseContext)
    const {bookingResponse,setBookingResponse} = useContext(bookingResponseContext)
    const [allBookings,setAllBookings] = useState([])

    useEffect(()=>{
        getAllBooking()
    },[approveBookingResponse,bookingResponse])

    const getAllBooking = async()=>{
        try{
            const result = await allBookingsAPI()
            if(result.status == 200){
                setAllBookings(result.data)
            }
        }
        catch(err){
            // console.log(err);           
        }

    }

  return (
    <>
        <section className="mb-5 border p-3 rounded">
        <h2>Booking Approvals</h2>
        <div className="table-responsive">
            <table className="table table-bordered">
            <thead className="thead-dark">
                <tr>
                <th>#</th>
                <th>UserId</th>
                <th>Model</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    allBookings?.length>0 ?
                    allBookings?.map((booking,index)=>(
                        <tr key={booking?._id}>
                            <td>{index+1}</td>
                            <td>{booking?.userId}</td>
                            <td>{booking?.model}</td>
                            <td>{booking?.servicename}</td>
                            <td>{booking?.date.split('-').reverse().join("-")}</td>
                            <td>{booking?.time}</td>
                            <td>
                                <EditApproval booking={booking}/>
                            </td>
                        </tr>
                    ))
                    :
                    <tr>
                        <td className='text-danger'>No Bookings</td>
                    </tr>
                }
            </tbody>
            </table>
        </div>
        </section>
    </>
  )
}

export default BookingApproval