import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';


const apiUrl = import.meta.env.VITE_Contect_URL;

function Contect() {
  const { getUser, user } = useAuth();

  const [contect, setContect] = useState({
    username: '',
    email: '',
    message: '',
  });

  
  useEffect(() => {
    if (user) {
      setContect((prev) => ({
        ...prev,
        username: user.username || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContect((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contect),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message)
        setContect({
          username: user.username || '',
          email: user.email || '',
          message: '',
        });

      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Server Error")
      

    }
  };

  return (
    <div className="min-w-full max-h-dvh flex justify-center items-center md:h-dvh gap-3">
      <div className="w-[50%] h-[350px] flex flex-col md:flex-row">
        <img src="/svgs/contect.svg" alt="Contact" className="h-full" />
        <div className="flex flex-col gap-2 w-[250px] md:w-[50%]">
          <h1 className="text-2xl md:text-4xl">Add Details</h1>

          <label htmlFor="username">Username</label>
          <input
            type="text"
            autoComplete="off"
            onChange={handleInput}
            name="username"
            value={contect.username}
            disabled
            className="outline-1 outline-white  text-gray-500 rounded-lg"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoComplete="off"
            onChange={handleInput}
            name="email"
            value={contect.email}
            disabled
            className="outline-1 outline-white text-gray-500 rounded-lg"
          />

          <label htmlFor="message">Message</label>
          <textarea
            autoComplete="off"
            onChange={handleInput}
            name="message"
            value={contect.message}
            className="outline-1 outline-white rounded-lg"
            rows="5"
          ></textarea>

          <button
            className="p-2 bg-[#1c2c4c] rounded-lg hover:bg-sky-600 cursor-pointer text-white"
            onClick={handleSubmit}
          >
            Send Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contect;
