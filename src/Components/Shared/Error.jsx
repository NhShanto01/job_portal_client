import React from 'react'
import error from '../../assets/error/404.png'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <img src={error} alt="" />
      <div>
        <p className='text-center text-blue-400'>
        Sorry, the page you are looking for does not exist.
      </p>
      <p className='text-center text-2xl font-bold text-blue-400'>Please go back to the previous page</p>
      <div className="divider font-bold">OR</div>
      </div>
      <Link to='/'>
        <button className='btn btn-outline btn-info'>Go to Home Page</button>
      </Link>
    </div>
  )
}

export default Error