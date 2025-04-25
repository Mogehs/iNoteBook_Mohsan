import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_Register_URL;

function Register() {
  const navigate = useNavigate();
  const saveInLocal = useAuth();
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
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
        setUser({
          username: '',
          email: '',
          phone: '',
          password: '',
        });

        localStorage.setItem('token', data.token);
        navigate('/login');
        toast.success(data.message)
      } else {
        toast.error(data.message)
        
      }
    } catch (error) {
      
      toast.error('Network error. Please try again.');
    }
  };

  return (
    <div className="flex w-full max-h-dvh px-4 md:h-dvh justify-center items-center overflow-hidden">
      <div className="w-full md:w-[50%] flex justify-center flex-col md:flex-row gap-8">
        <div>
          <img src="./svgs/register.svg" className="h-[150px] md:h-[400px]" alt="Register" />
        </div>
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
          <h1 className="text-2xl md:text-4xl">Registration</h1>

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleInput}
            autoComplete="off"
            required
            className="w-full rounded-md border-[1px] border-white"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            autoComplete="off"
            required
            className="w-full rounded-md border-[1px] border-white"
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInput}
            autoComplete="off"
            required
            className="w-full rounded-md border-[1px] border-white"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleInput}
            autoComplete="off"
            required
            className="w-full rounded-md border-[1px] border-white"
          />

          <button
            type="submit"
            className="p-2 bg-[#1c2c4c] rounded-lg hover:bg-sky-600 cursor-pointer text-white"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
