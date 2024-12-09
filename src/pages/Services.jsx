import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { allServicesAPI } from '../services/allAPI'
import SERVER_URL from '../services/serverurl'

const Services = () => {
  
  const [allservices,setAllServices] = useState([])
  const [searchKey,setSearchKey] = useState("")
  const [currentPage,setCurrentPage] = useState(1)

  const servicesPerPage = 6
  const totalPage = Math.ceil(allservices?.length/servicesPerPage)
  const currentPageLastServiceIndex = currentPage * servicesPerPage
  const currentPageFirstServiceIndex = currentPageLastServiceIndex - servicesPerPage
  const visibleServiceCards = allservices?.slice(currentPageFirstServiceIndex,currentPageLastServiceIndex)
  
  useEffect(()=>{
    getAllServices()
  },[searchKey])

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

  const navigateToNextPage = ()=>{
    if(currentPage!=totalPage){
      setCurrentPage(currentPage+1)
    }
  }

  const navigateToPreviousPage = ()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
  }

  return (
    <>
      <Header insideservice={true}/>
      <div className='mt-sm-3 mt-2 d-flex flex-column flex-sm-row justify-content-sm-between justify-content-center align-items-center'>
        <h1 className='ms-sm-5'>All Services</h1>
        <input onChange={e=>setSearchKey(e.target.value)} className='w-25 form-control borderborder-dark d-none d-sm-block me-4' type="text" placeholder='Enter service title'/>
      </div>
      <div className="container mt-sm-5 mt-4">
        <div className="row">
          {
            allservices?.length>0?
            visibleServiceCards?.map(service=>(
              <div key={service?._id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img src={`${SERVER_URL}/uploads/${service?.serviceImg}`} className="card-img-top" alt="Oil Change" />
                  <div className="card-body">
                    <h5 className="card-title">{service?.title}</h5>
                    <p className="card-text">{service?.description}</p>
                  </div>
                </div>
              </div>
            ))
            :
            <div className=''>No services!!</div>
          }
        </div>
      </div>
      <div class="container text-center">
      <div class="pagination-text fs-5">
        <span onClick={navigateToPreviousPage} style={{cursor:"pointer"}}>
        <i class="fa-solid fa-angles-left me-3"></i>
        </span>
        <span id="currentPage" className='fw-bolder'>{currentPage}</span> of <span id="totalPage" className='fw-bolder'>{totalPage}</span>
        <span onClick={navigateToNextPage} style={{cursor:"pointer"}}>
          <i class="fas fa-angles-right ms-3"></i>
        </span>
      </div>
    </div>
    </>
  )
}

export default Services