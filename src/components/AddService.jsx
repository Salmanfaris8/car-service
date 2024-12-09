import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { addServicesAPI, allServicesAPI, deleteServiceAPi } from '../services/allAPI';
import SERVER_URL from '../services/serverurl';
import EditService from '../components/EditService'
import { editServicesResponseContext } from '../contexts/contextAPI';

const AddService = () => {

    const {editServicesResponse,seteditServicesResponse} = useContext(editServicesResponseContext)
    const [addServices,setAddServices] = useState({
        title:"",description:"",serviceImg:""
    })
    const [allservices,setAllServices] = useState([])
    const [searchKey,setSearchKey] = useState("")
    const [show, setShow] = useState(false);
    const [currentPage,setCurrentPage] = useState(1)

    const servicesPerPage = 3
    const totalPage = Math.ceil(allservices?.length/servicesPerPage)
    const currentPageLastServiceIndex = currentPage * servicesPerPage
    const currentPageFirstServiceIndex = currentPageLastServiceIndex - servicesPerPage
    const visibleServiceCards = allservices?.slice(currentPageFirstServiceIndex,currentPageLastServiceIndex)

    useEffect(()=>{
        getAllServices()
    },[searchKey,editServicesResponse])

    const handleClose = () => {
        setAddServices({
            title:"",description:"",serviceImg:""
        })
        setShow(false);
    }
    const handleShow = () => setShow(true);  

    const getAllServices = async()=>{
        try{
            const result = await allServicesAPI(searchKey)
            setAllServices(result.data)
        }
        catch(err){
            // console.log(err);
        }
    }

    const handleAddServices = async(e)=>{
        e.preventDefault()
        const {title,description,serviceImg} = addServices
        if(title && description && serviceImg){
            const reqBody = new FormData()
            reqBody.append("title",title)
            reqBody.append("description",description)
            reqBody.append("serviceImg",serviceImg)
            const reqHeader = {
                "Content-Type":"multipart/form-data",
            }
            try{
                const result = await addServicesAPI(reqBody,reqHeader)
                if(result.status == 200){
                    alert("Service added successfully!!")
                    handleClose()
                    getAllServices()
                }
                else{
                    alert(result.response.data)
                }
            }
            catch(err){
                // console.log(err);
            }
        }
        else{
            alert("Please fill the form completely!!!")
        }
    }

    const deleteService = async(id)=>{
        try{
            await deleteServiceAPi(id)
            getAllServices()
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
        <div className='d-sm-flex text-center justify-content-between border p-3 rounded'>
            <h2>Add New Service</h2>
            <button className='btn btn-primary' onClick={handleShow}>Add Services</button>
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
            <Modal.Title>Add service Details!!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form className="form">
                    <div className="form-group mb-3">
                    <label htmlFor="title">Service Title</label>
                    <input value={addServices.title} onChange={e=>setAddServices({...addServices,title:e.target.value})} type="text" className="form-control" id="title" placeholder="Enter service title"/>
                    </div>

                    <div className="form-group mb-3">
                    <label htmlFor="description">Service Description</label>
                    <textarea value={addServices.description} onChange={e=>setAddServices({...addServices,description:e.target.value})} className="form-control" id="description" placeholder="Enter service description" rows="4"/>
                    </div>

                    <div className="form-group mb-3">
                    <label htmlFor="image">Service Image</label>
                    <input onChange={e=>setAddServices({...addServices,serviceImg:e.target.files[0]})} type="file" className="form-control" id="image"/>
                    </div>

                </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button onClick={handleAddServices} variant="primary">Add</Button>
            </Modal.Footer>
        </Modal>
        <section className="mb-5">
            <div className='border rounded p-3 mt-5'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h3 className="my-4">Existing Services</h3>
                    <input onChange={e=>setSearchKey(e.target.value)} className='form-control border border-dark w-25 d-none d-sm-inline' type="text" placeholder='Enter service title' />
                </div>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allservices?.length>0 ?
                                visibleServiceCards?.map((service)=>(
                                <tr key={service?._id}>
                                    <td>
                                        <img src={`${SERVER_URL}/uploads/${service?.serviceImg}`} alt="Service Image" width="150" height="100" className="rounded"/>
                                    </td>
                                    <td>{service?.title}</td>
                                    <td>{service?.description}</td>
                                    <td className='d-flex flex-column'>
                                        <EditService service={service}/>
                                        <button onClick={()=>deleteService(service?._id)} className='btn btn-danger mt-3'><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                                ))
                                :
                                <tr>
                                    <td className='text-danger'>No Services</td>
                                </tr>
                            }
                        </tbody>
                        </table>
                    </div>
            </div>
            <div className="pagination-text text-center mt-2">
                <span onClick={navigateToPreviousPage} style={{cursor:"pointer"}}>
                <i class="fa-solid fa-arrow-left me-3 bg-dark p-1 rounded text-light"></i>
                </span>
                <span id="currentPage" className='fw-bolder'>{currentPage}</span> of <span id="totalPage" className='fw-bolder'>{totalPage}</span>
                <span onClick={navigateToNextPage} style={{cursor:"pointer"}}>
                <i className="fa-solid fa-arrow-right ms-3 bg-dark p-1 rounded text-light"></i>
                </span>
            </div>
        </section>
    </>
  )
}

export default AddService