import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import React from 'react'
import './index.css'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Contect from './pages/Contect'
import Error from './pages/Error'
import Logout from './pages/Logout'
import Note from './pages/Note'



function App() {
  return (
    <>
  <div className="min-h-screen w-full flex flex-col items-center bg-[#111827] text-white font-font_1 overflow-x-hidden">
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contect' element={<Contect/>}/>
      <Route path='/note' element={<Note/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/logout' element={<Logout/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
    </BrowserRouter>
  </div>
    </>
  )
}

export default App