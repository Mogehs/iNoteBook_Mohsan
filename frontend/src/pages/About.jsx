import React from 'react'
import { useAuth } from '../store/Auth'

function About() {
  const {user,isLogedIn}=useAuth()
  return (
    <div className="max-h-screen  overflow-hidden  px-6 py-12">
  <div className="max-w-4xl mx-auto space-y-10">
    
    <section className="text-center">
      <h1 className="text-4xl font-bold">About <span className="text-sky-500">iNotebook</span></h1>
     {isLogedIn &&( <p>Hi! <strong>{user.username}</strong></p>)}
      <p className="mt-4 text-gray-300">
        I am <strong>Mohsan</strong>, a full-stack React developer passionate about building secure, user-friendly applications. iNotebook is one of my personal projects aimed at helping users take smart notes effortlessly.
      </p>
    </section>

  
    <section>
      <h2 className="text-2xl font-semibold">Why iNotebook?</h2>
      <p className="text-gray-300 mt-2">
        iNotebook is designed to provide a fast, minimal, and secure note-taking experience. Whether you are on your phone or PC, your notes stay synced and encrypted.
      </p>
    </section>

    
   
  
    <section>
      <h2 className="text-2xl font-semibold">Let's Connect</h2>
      <p className="text-gray-300 mt-2">
        If you're looking to collaborate or hire a React full-stack developer, feel free to reach out:
      </p>
      <div className="mt-4">
        <p>Email: <a href="mailto:mohsanalimohsan649@gmail.com" className="text-sky-400 underline">mohsanalimohsan649@gmail.com</a></p>
        <p>GitHub: <a href="https://github.com/mohsanalimohsan649" className="text-sky-400 underline">github.com/mohsanalimohsan649</a></p>
      </div>
    </section>
  </div>
</div>

  )
}

export default About