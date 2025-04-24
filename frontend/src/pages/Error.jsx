import React from 'react'
import { NavLink } from 'react-router-dom'
NavLink
function Error() {
  return (
    <div className='w-full h-dvh flex flex-col  justify-center items-center'>
        <p className='text-6xl md:text-8xl font-bold text-sky-400'>404</p>
        <p className="text-xl md:text-2xl text-gray-300">Oops! Page not found</p>
    <p className="text-md text-gray-500 text-center">The page you're looking for doesn't exist or has been moved.</p>
    <button className="w-20 h-8  bg-[#1c2c4c] rounded-lg  hover:bg-sky-600 cursor-pointer'"><NavLink to="/">Go Back</NavLink></button>

    </div>
  )
}

export default Error