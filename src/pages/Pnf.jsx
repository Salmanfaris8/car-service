import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Pnf = () => {
  return (
    <>
      <div style={{height:'100vh'}} className="d-flex justify-content-center align-items-center flex-column">
        <img width={'500px'} src="https://cdn.svgator.com/images/2022/01/404-page-animation-example.gif" alt="" />
        <h1 className='text-4xl font-bold mb-2'>Looks like you'r lost.</h1>
        <p className='font-semibold mb-2'>The page your lokking is not available</p>
        <Link className='bg-blue-600 btn btn-primary rounded p-2 mt-1' to={'/'}>Go Back</Link>
      </div>
    </>
  )
}

export default Pnf