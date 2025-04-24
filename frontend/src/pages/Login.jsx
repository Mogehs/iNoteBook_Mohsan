import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../store/Auth'
const apiUrl = import.meta.env.VITE_LogIn_URL;
import { toast } from 'react-toastify';


function Login() {
  const {storetokenInput}=useAuth()
  const navigate =useNavigate()
  const [user,setuser]=useState({
    email:"",
    password:"",
  })
  const [error, setError] = useState('');
  const HandelInput=(e)=>{
    let name=e.target.name
    let value=e.target.value
    setuser({
      ...user,
      [name]:value
    })

  }
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(""); 
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
    
        storetokenInput(data.token);
        navigate('/note');
        toast.success(data.message)
      } else {
      
        toast.error(data.message)
      }
    } catch (err) {
      toast.error("Network Error")
    }
  };
  return (
   <>
   <div className='min-w-full max-h-dvh flex justify-center md:items-center '>
 <div className='max-w-full md:w-[50%] h-[500px] flex flex-col md:flex-row justify-around md:justify-center items-center    ' >
  <img src="/svgs/login.svg" alt="" className='h-[200px] min-w-[35%] text-lg ' />
  <form className='flex flex-col justify-center w-[250px] gap-3'>
    <label htmlFor="email">Email</label>
    <input 
    type="email"
    autoComplete='off'
    onChange={HandelInput}
    value={user.email}
    name='email'
    className='w-full outline-1 outline-white rounded-lg' />
    <label htmlFor="username">password</label>
    <input 
    type="password"
    autoComplete='off'
    onChange={HandelInput}
    value={user.password}
    name='password'
    className='w-full outline-1 outline-white rounded-lg' />
    <button className='p-2  bg-[#1c2c4c] rounded-lg  hover:bg-sky-600 cursor-pointer' onClick={handleSubmit}>Login </button>

    </form>
 </div>
   </div>
   </>
  )
}

export default Login