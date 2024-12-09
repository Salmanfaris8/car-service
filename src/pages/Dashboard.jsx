import React, { useContext } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Booking from '../components/Booking'

const Dashboard = () => {

  return (
    <div>
      <Header insideDashborad={true}/>
      <div className='container-fluid'>
        <div className="row">
          <div className='book'>
            <div className='d-flex flex-column justify-content-center align-items-center h-100'>
              <h1 className=''>BOOK YOUR SERVICE</h1>
              <span className='text-center'>Book your service appointment today for fast, reliable care. Ensure your vehicle  <br /> stays in top condition with expert maintenance and attention to detail.</span>
            </div>
          </div>
          <div className="col-lg-12">
            <Booking/>
            <View/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard