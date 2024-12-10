import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SERVER_URL from '../services/serverurl'
import { updateProfileAPI } from '../services/allAPI'
import profileImg from '../assets/profileImg.jpg'

const Profile = () => {

  const [preview,setPreview] = useState("")
  const [existingProfileImg,setExistingProfileImg] = useState("")
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",gender:"",phoneno:"",profilePic:""
  })

  useEffect(()=>{
    if(sessionStorage.getItem('user')){
      const user = JSON.parse(sessionStorage.getItem('user'))
      setUserDetails({
        username:user.username,email:user.email,password:user.password,gender:user.gender,phoneno:user.phoneno
      })
      setExistingProfileImg(user.profilePic)
    }
  },[])
  
  useEffect(()=>{
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }
    else{
      setPreview("")
    }
  },[userDetails.profilePic])

  const handleUpdateProfile = async()=>{
    const {username,email,password,gender,phoneno,profilePic} = userDetails
    if(gender && phoneno){
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("gender",gender)
      reqBody.append("phoneno",phoneno)
      preview ? reqBody.append("profilePic",profilePic) : reqBody.append("profilePic",existingProfileImg)
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        try{
          const result = await updateProfileAPI(reqBody,reqHeader)
          if(result.status == 200){
            alert("User profile updated successfully!!")
            sessionStorage.setItem('user',JSON.stringify(result.data))
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

  return (
    <>
        <Header insideprofile={true}/>
        <div style={{height:'90vh'}}>
            <h1 className='my-4 text-center'>Your Profile</h1>
            <div className='d-flex align-items-center justify-content-center'>
                <div className='profile-view d-flex flex-column justify-content-center shadow p-2 rounded'>
                  <div className='d-sm-flex'>
                      <label className='text-center w-100'>
                        <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} type="file" className='d-none' />
                          {
                            existingProfileImg == ""?
                            <img className='profile-img rounded-circle mb-3' src={preview?preview:profileImg} alt="" />
                            :
                            <img className='profile-img rounded-circle mb-3' src={preview?preview:`${SERVER_URL}/uploads/${existingProfileImg}`} alt="" />
                          }
                      </label>
                      <div className='w-100'>
                          <div className="profile-input mb-sm-4 mb-2">
                            <input value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})} placeholder='Enter your name' type="text" className='form-control' />
                          </div>
                          <div className="profile-input mb-sm-4 mb-2">
                            <input value={userDetails.gender} onChange={e=>setUserDetails({...userDetails,gender:e.target.value})} placeholder='Gender' type="text" className='form-control' />
                          </div>
                          <div className="profile-input mb-sm-4 mb-2">
                            <input value={userDetails.phoneno} onChange={e=>setUserDetails({...userDetails,phoneno:e.target.value})} placeholder='Phone No.' type="number" className='form-control' />
                          </div>
                          <div className="profile-input mb-sm-4 mb-2">
                            <input  value={userDetails.email} onChange={e=>setUserDetails({...userDetails,email:e.target.value})} placeholder='Email address' type="email" className='form-control' />
                          </div>
                          <div className="profile-input d-grid mb-sm-0 mb-2">
                            <button onClick={handleUpdateProfile} className="btn btn-warning">Update Profile</button>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile