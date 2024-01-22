import React from 'react'
import { IoPeople , IoLocationOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { Link } from 'react-router-dom';


const EventCard = (props) => {
  const {eventname, time, location, organiser} = props
  return (
    <>
        <Link to={`/e/${eventname}`} className="w-full border border-zinc-800 shadow-zinc-800 rounded-2xl shadow-2xl m-2 gap-4 bg-zinc-800 p-8 flex">
            <div className="w-2/3 bg-zinc-800 flex flex-col items-start gap-1">
                <p className='text-md font-light text-zinc-200/70 flex items-center mb-2 gap-2'><FaRegClock />  {time}</p>
                <h1 className='text-xl font-bold'>{eventname}</h1>
                <p className='text-md'>Event Description goes here as something that is going ...</p>
                <p className='text-md text-zinc-200/70'> <IoPeople className='inline'/> by {organiser}</p>
                <p className='text-md text-zinc-200/70'> <IoLocationOutline className='inline'/> {location}</p>
                <span className='px-3 rounded-md text-xs py-0.5 my-1 bg-green-700 text-white text-start'>Going</span>
            </div>
            <div className="w-1/3 bg-yellow-300 rounded-2xl">
                {/* <span className='bg-yellow-200 w-full h-full'></span> */}
                .
            </div>
        </Link>
    </>
  )
}

export default EventCard