import React, { useState } from 'react';
import { useAuth } from '../store/Auth';
import NoteCards from './NoteCards';
const apiUrl = import.meta.env.VITE_NOTE_URL;
const getNoteUrl = import.meta.env.VITE_GETnotes_URL;
import { toast } from 'react-toastify';


function Note() {
  const { user, token } = useAuth();
  const [note, setNote] = useState({
    title: '',
    description: '',
  });
  const [notes, setNotes] = useState([]);
  // ....................Handel Input............................. 

  function handleInput(e) {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  }
// ....................fetch All Notes............................. 

  const getNotes = async () => {
    if (!user || !user._id) return;

    try {
      const response = await fetch(`${getNoteUrl}/${user._id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotes(data.notes || data); 
      } else {
        console.error("Unauthorized or other error:", response.status);
      }
    } catch (error) {
      console.log("error by get Notes", error);
    }
  };

  // ....................Save Note Data............................. 

  const handleSubmit = async () => {
    console.log(user._id)
    try {
      const response = await fetch(`${apiUrl}/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });
      const getData= await response.json()
      if (response.ok) {
        toast.success(getData.message)
        getNotes()
        setNote({ title: '', description: '' }); 
      }
      else{
        
        
        toast.error(getData.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Note server Error")
    }
  };
 
 

  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-white px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-10">
        
        <div className="md:w-1/2 flex justify-center">
          <img src="./svgs/note.svg" alt="note" className="h-80" />
        </div>

        
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <label htmlFor="title" className="text-lg">Title</label>
          <input
            type="text"
            autoComplete="off"
            name="title"
            value={note.title}
            onChange={handleInput}
            className="w-full p-2 border border-white rounded-lg bg-transparent"
          />

          <label htmlFor="description" className="text-lg">Your Note</label>
          <textarea
            name="description"
            autoComplete="off"
            value={note.description}
            onChange={handleInput}
            rows={5}
            className="w-full p-2 border border-white rounded-lg bg-transparent"
          />

          <button
            onClick={handleSubmit}
            className="mt-2 p-2 bg-[#1c2c4c] rounded-lg hover:bg-sky-600 transition duration-300"
          >
            Save Now
          </button>
        </div>
      </div>

      
      <div className="mt-12 w-full">
        <NoteCards notes={notes} getNotes={getNotes}  />
      </div>
    </div>
  );
}

export default Note;
