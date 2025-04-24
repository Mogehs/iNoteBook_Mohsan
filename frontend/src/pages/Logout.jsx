import React, { useEffect } from 'react'
import { useAuth } from '../store/Auth'
import {useNavigate} from 'react-router-dom'

function Logout() {
 const {LogoutUser}=useAuth()   
 const navigate=useNavigate()
 useEffect(()=>{
LogoutUser()
 },[LogoutUser()])
  return (
    navigate('/login')
  )
}

export default Logout