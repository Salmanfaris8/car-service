import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { approveStatusAPI } from '../services/allAPI';
import { approveBookingResponseContext } from '../contexts/contextAPI';

const EditApproval = ({booking}) => {

    const {approveBookingResponse,setApproveBookingResponse} = useContext(approveBookingResponseContext)
    const [bookService,setBookService] = useState({
        id:booking._id,status:booking.status
    })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

    const handleApprovalStatus = async ()=>{
        const {id,status} = bookService
        if(status){
            try{
                const result = await approveStatusAPI(id,bookService)
                if(result.status == 200){
                    alert(`Request ${status}`)
                    handleClose()
                    setApproveBookingResponse(result.data)
                }
            }
            catch(err){
                // console.log(err);
            }
        }
        else{
            alert("Please select any status!!")
        }
    }        
    
  return (
    <>
      <div>
        {
          booking.status=="Rejected"?
          <button className={'btn btn-danger'} disabled={booking.status=="Rejected"} onClick={handleShow}><span className='fw-bold'>Rejected</span></button>
          :
          booking.status=="Confirmed"?
          <button className={'btn btn-success'} disabled={booking.status=="Confirmed"} onClick={handleShow}><span className='fw-bold'>Confirmed</span></button>
          :
          <button className={'btn btn-success'} onClick={handleShow}><span className='fw-bold'>Approve</span></button>
        }
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
          <Modal.Title>Approve Booking!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <div className="mb-3">
                <label for="service" className="form-label">Choose status:</label>
                <select value={bookService.status} onChange={e=>setBookService({...bookService,status:e.target.value})} id="service" className="form-select">
                  <option value="">status</option>
                  <option value="Confirmed">confirmed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleApprovalStatus} variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditApproval