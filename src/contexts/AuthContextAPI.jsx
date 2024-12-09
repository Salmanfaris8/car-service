import React, { createContext, useEffect, useState } from 'react'
export const tokenAuthContext = createContext()
export const adminTokenAuthContext = createContext()

const AuthContextAPI = ({children}) => {

    const [isAuthorised,setIsAuthorised] = useState(false)
    const [adminIsAuthorised,setAdminIsAuthorised] = useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAuthorised(true)
        }
        else{
            setIsAuthorised(false)
        }
    },[isAuthorised])

    useEffect(()=>{
        if(sessionStorage.getItem("user")){
            const user = JSON.parse(sessionStorage.getItem("user"))  
            const userRole = user.role == "admin"
            if(userRole){
                setAdminIsAuthorised(true)
            }
            else{
                setAdminIsAuthorised(false)
            }
        }
    },[adminIsAuthorised])

  return (
    <adminTokenAuthContext.Provider value={{adminIsAuthorised,setAdminIsAuthorised}}>
        <tokenAuthContext.Provider value={{isAuthorised,setIsAuthorised}}>
            {children}
        </tokenAuthContext.Provider>
    </adminTokenAuthContext.Provider>
  )
}

export default AuthContextAPI