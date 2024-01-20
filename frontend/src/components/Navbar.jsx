import React from 'react'
import { Link } from 'react-router-dom'
import { RiBox3Fill } from "react-icons/ri";

const Navbar = () => {
  return (
    <>
        <div className="w-full flex items-center justify-between px-12 py-4 border-b bg-transparent">
            <div className="flex">
                <Link to="/" className="text-xl flex items-center gap-2 group font-semibold">
                    <RiBox3Fill className='text-2xl transform group-hover:rotate-180 transition-all'/> 
                    Re:Event
                </Link>
            </div>
            <div className="flex gap-4">
                <Link to="/create" className="text-sm bg-gray-100 rounded-xl shadow text-black px-4 py-1.5 hover:scale-105 hover:bg-black/80 hover:text-white border transition-all cursor-pointer">
                    Create Event
                </Link>
                <Link to="/login" className="text-sm bg-black rounded-xl shadow-lg text-white px-4 py-1.5 hover:scale-105 hover:bg-black/80 transition-all cursor-pointer">
                    Login / Register
                </Link>
            </div>
        </div>
    </>
  )
}

export default Navbar