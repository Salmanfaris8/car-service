import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { editServicesAPI } from '../services/allAPI';
import { editServicesResponseContext } from '../contexts/contextAPI';

const EditService = ({service}) => {

    const {editServicesResponse,seteditServicesResponse} = useContext(editServicesResponseContext)
    const [addServices,setAddServices] = useState({
        id:service._id ,title:service.title ,description:service.description ,serviceImg:service.serviceImg
    })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);
    
    const handleEditServices = async()=>{
        const {id,title,description,serviceImg} = addServices
        if(title && description){
            const reqBody = new FormData()
            reqBody.append("title",title)
            reqBody.append("description",description)
            reqBody.append("serviceImg",serviceImg)
            const reqHeader = {
                "Content-Type":"multipart/form-data",
            }
            try{
                const result = await editServicesAPI(id,reqBody,reqHeader)
                if(result.status == 200){
                    alert("Service updated successfully!!")
                    handleClose()
                    seteditServicesResponse(result.data)
                }
            }
            catch(err){
                // console.log(err);
            }
        }
    }

  return (
    <>
        <button onClick={handleShow} className='btn btn-success'><i className="fa-solid fa-pen-to-square"></i></button>
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
            <Button onClick={handleEditServices} variant="primary">Update</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default EditService