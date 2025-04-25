import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/Auth';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
const deleteUrl = import.meta.env.VITE_deleteNOTE_URL;
const OneNoteUrl = import.meta.env.VITE_OneNOTE_URL;
const updateNoteUrl = import.meta.env.VITE_updateNOTE_URL;
import { toast } from 'react-toastify';



function NoteCards({ notes, getNotes }) {
  const { user, token } = useAuth();
  const [isShow,setisShow]=useState(false)
  const [currNoteID,setCurrNotID]=useState([])
  const [oneNoteData,setoneNoteData]=useState({
    title:"",
    description:""

  })

  useEffect(() => {
    if (user && user._id) {
      getNotes();
    }
  }, [user]);
  // ...................Set Date formate....................................
   

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ...................Delete Note....................................
   
  const DeleteNote= async(noteID)=>{
    try {
     const responce= await fetch(`${deleteUrl}/${noteID}`,{
       method:"DELETE",
       headers:{
         "Authorization":`Bearer ${token}`
       }
     })
     const data= await responce.json()
     if(responce.ok){
      getNotes()
      toast.success(data.message)

      
     }
     
    } catch (error) {
    toast.error("Network Server Error")
     
    }
   }
// ...................Show content for Update....................................
   
   const showUpdate=async ()=>{
    if(!isShow){
      return  setisShow(true)
    }
    else{
      return setisShow(false)
    }
   }

  //...................Fetch Note Data....................................
   
   const getOneNote=async(noteID)=>{
   try {
    const responce= await fetch(`${OneNoteUrl}/${noteID}`,{
      method:"GET",
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
    if(responce.ok){
   const noteDetails= await responce.json()
   setoneNoteData({
    title:noteDetails.title,
    description: noteDetails.description
   })
    }
   } catch (error) {
    toast.error("Network Server Error by getting notes")
    
   }
   }
   // ...................Show Note Date For Update....................................
   
   const showOneNote=async(noteID)=>{
    setCurrNotID(noteID)
    showUpdate()
    getOneNote(noteID)

    // ...................take Input....................................
   
   }
   const handleInput = (e) => {
    const { name, value } = e.target;
    setoneNoteData({ ...oneNoteData,
       [name]: value });
  };
// ..............................Update Note with new Data>......................

const updateNote = async () => {
  try {
    const responce = await fetch(`${updateNoteUrl}/${currNoteID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(oneNoteData)
    });
    const noteData= await responce.json()
    if (responce.ok) {
      toast.success(noteData.message)
      setisShow(false);
      getNotes();
      toast.error(noteData.message)
    } else {
      // alert(noteData.message)
      toast.success(noteData.message)
    }
  } catch (error) {
    toast.error("NetWork Error")
    
  }
};

  

  return (
    <div className="w-full flex flex-col items-center gap-6 px-4 py-10 overflow-hidden">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        Here Is Your <strong className="text-sky-400">Notes</strong>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
      {notes.map((note, index) => (
  <div
    key={index}
    className="bg-[#111827] text-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col gap-3"
  >
    <div>
      <label className="text-slate-400 text-sm">Title:</label>
      <p className="text-xl font-semibold text-sky-400">{note.title}</p>
    </div>

    <div>
      <label className="text-slate-400 text-sm">Description:</label>
      <p className="text-sm text-gray-300">{note.description}</p>
    </div>

    <div>
      <label className="text-slate-400 text-sm">Created At:</label>
      <input
        type="text"
        value={formatDate(note.date)}
        disabled
        className="outline-none border border-white bg-transparent text-white px-2 py-1 rounded-lg w-full"
      />
    </div>
    <div className=' px-2 w-full flex gap-4'>
        <button className='text-blue-900 hover:text-blue-600 hover:cursor-pointer'><FaTrashAlt size={'30px'} onClick={()=>{DeleteNote(note._id)}}/></button>
        <button className='text-green-900 hover:text-green-500 hover:cursor-pointer' ><FaEdit size={'30px'} onClick={()=>{showOneNote(note._id)}}/></button>
    </div>
  </div>
))}

      </div>
      {isShow&&(
        <div className="md:w-1/2 w-full flex flex-col gap-4">
        <label htmlFor="title" className="text-lg">Title</label>
        <input
          type="text"
          autoComplete="off"
          name="title"
          value={oneNoteData.title}
          onChange={handleInput}
          className="w-full p-2 border border-white rounded-lg bg-transparent"
        />

        <label htmlFor="description" className="text-lg">Your Note</label>
        <textarea
          name="description"
          autoComplete="off"
          value={oneNoteData.description}
          onChange={handleInput}
          rows={5}
          className="w-full p-2 border border-white rounded-lg bg-transparent"
        />

        <button
          onClick={updateNote}
          className="mt-2 p-2 bg-[#1c2c4c] rounded-lg hover:bg-sky-600 transition duration-300"
        >
          Update Now
        </button>
      </div>
      )}
    </div>
  );
}

export default NoteCards;
