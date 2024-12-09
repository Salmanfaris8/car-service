import commonAPI from "./commonAPI";
import SERVER_URL from "./serverurl";

// register
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

// login
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

// booking
export const bokkingAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/booking`,reqBody,reqHeader)
}

// user bookings
export const userBokkingAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-booking`,{},reqHeader)
}

// edit booking
export const editBookingAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit/${id}/booking`,reqBody,reqHeader)
}

// delete booking
export const deleteBookingAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/delete/${id}/booking`,{},reqHeader)
}

// profile update
export const updateProfileAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/profile-update`,reqBody,reqHeader)
}

// all users
export const allUserAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/all-user`,{})
}

// all bookings
export const allBookingsAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/all-bookings`,{})
}

// add services
export const addServicesAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-services`,reqBody,reqHeader)
}

// home services
export const homeServiceAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-services`,{})
}

// all services
export const allServicesAPI = async(serchKey)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-services?search=${serchKey}`,{})
}

// edit services
export const editServicesAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit/${id}/services`,reqBody,reqHeader)
}

// delete services
export const deleteServiceAPi = async(id)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/delete/${id}/services`,{})
}

// approve status
export const approveStatusAPI = async(id,reqBody)=>{
    return await commonAPI("PUT",`${SERVER_URL}/approve/${id}/status`,reqBody)
}