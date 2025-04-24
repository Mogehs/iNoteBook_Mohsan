import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useAuth } from '../store/Auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const {isLogedIn}= useAuth()

  return (
    <header className="w-full bg-[#0b1e3f] text-white shadow-md">
      <div className="flex justify-between items-center h-16 px-4 md:px-10">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="INoteBook" height={'150px'} width={'200px'} />
        </div>

        
        <ul className="hidden md:flex gap-6 items-center text-lg font-medium">
          <li className="hover:text-sky-400"><NavLink to="/">Home</NavLink></li>
          <li className="hover:text-sky-400"><NavLink to="/about">About</NavLink></li>
         {isLogedIn&&(
          <>
          <li className="hover:text-sky-400"><NavLink to="/note">Notes</NavLink></li>
          <li className="hover:text-sky-400"><NavLink to="/contect">Contact</NavLink></li>
          </>
         )}
        </ul>

        
        <div className="hidden sm:flex gap-2">
          {isLogedIn?
          <>
           <button className="hidden md:block bg-[#1c2c4c] px-3 py-2 rounded hover:bg-sky-600"><NavLink to="/logout">Logout</NavLink></button>
          </>
          :
          <><button className="hidden md:block bg-[#1c2c4c] px-3 py-2 rounded hover:bg-sky-600"><NavLink to="/login">Login</NavLink></button>
          <button className="hidden md:block bg-[#1c2c4c] px-3 py-2 rounded hover:bg-sky-600"><NavLink to="/register">SignUp</NavLink></button>
</>    
          }
         </div>
        <div className="md:hidden text-3xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </div>
      </div>

  
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center gap-3 py-4 bg-[#13284b] text-white font-medium text-lg">
          <li><NavLink onClick={toggleMenu} to="/">Home</NavLink></li>
          <li><NavLink onClick={toggleMenu} to="/about">About</NavLink></li>
         
          {isLogedIn?
          <>
           <li><NavLink onClick={toggleMenu} to="/contect">Contact</NavLink></li>
           <li><NavLink onClick={toggleMenu} to="/note">Notes</NavLink></li>
          <li><NavLink onClick={toggleMenu} to="/logout">Logout</NavLink></li>
          </>
          :<>
          <li><NavLink onClick={toggleMenu} to="/login">Login</NavLink></li>
          <li><NavLink onClick={toggleMenu} to="/register">SignUp</NavLink></li>
          </>
        }
        </ul>
      )}
    </header>
  );
}
