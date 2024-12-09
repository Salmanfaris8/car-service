import React, { createContext, useState } from 'react'
export const bookingResponseContext = createContext()
export const editBookingResponseContext = createContext()
export const editServicesResponseContext = createContext() 
export const approveBookingResponseContext = createContext()

const ContextAPI = ({children}) => {

    const [bookingResponse,setBookingResponse] = useState("")
    const [editBookingResponse,setEditBookingResponse] = useState("")
    const [editServicesResponse,seteditServicesResponse] = useState("")
    const [approveBookingResponse,setApproveBookingResponse] = useState("")

  return (
    <approveBookingResponseContext.Provider value={{approveBookingResponse,setApproveBookingResponse}}>
      <editServicesResponseContext.Provider value={{editServicesResponse,seteditServicesResponse}}>
        <editBookingResponseContext.Provider value={{editBookingResponse,setEditBookingResponse}}>
            <bookingResponseContext.Provider value={{bookingResponse,setBookingResponse}}>
                {children}
            </bookingResponseContext.Provider>
        </editBookingResponseContext.Provider>
      </editServicesResponseContext.Provider>
    </approveBookingResponseContext.Provider>
  )
}

export default ContextAPI