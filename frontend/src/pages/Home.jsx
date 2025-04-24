import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../store/Auth'

function Home() {
  const navigate=useNavigate()
  const {isLogedIn}=useAuth()
  const Start= async ()=>{
if(!isLogedIn){
  navigate('/login')
}
else{
  navigate('/note')
}
  }
  return (
    <>
    <div className="w-full md:px-16 px-8 py-12 overflow-x-hidden">
      <p className='text-4xl md:text-6xl font-bold' ><span>WellCom TO</span><span className='pl-2 text-sky-500'>iNoteBook</span></p>
      <p className="text-lg text-gray-300">
        Secure. Simple. Smart. Your personal notes, anywhere, anytime.
      </p>
      <div className='w-full h-[300px] flex justify-center gap-4 items-center'>
      <button className='p-2  bg-[#1c2c4c] rounded-lg  hover:bg-sky-600 cursor-pointer' onClick={Start}>Get Started</button>
        <img src="/svgs/Notebook.svg" alt="" className='h-full w-[50%]' />
      </div>
      <div className='w-full flex justify-evenly items-center'>
        
      </div>
      <footer className="text-center text-gray-400 py-6 border-t border-gray-700">
    © 2025 iNotebook by Mohsan. All rights reserved.
  </footer>
    </div>
    </>
  )
}

export default Home
