import React from 'react'
import { IoPeople, IoLocationOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import pors from '../../assets/pors.jpg';


const EventCard = (props) => {
  const { eventname, time, location, organiser } = props
  return (
    <>
      <Link to={`/e/${eventname}`} className="w-full md:flex-row flex-col-reverse hover:scale-105 transition-all hover:border hover:border-zinc-500/40 border border-zinc-800 hover:shadow-zinc-800 rounded-2xl hover:shadow-2xl m-2 gap-4 bg-zinc-800 p-8 flex">
        <div className="w-full md:w-2/3 bg-zinc-800 flex flex-col items-start gap-1">
          <div className="flex gap-2 items-center justify-center mb-2">
            <p className='text-md font-light text-zinc-200/70 flex items-center gap-2'><FaRegClock />  {time}</p>
            <span className='px-3 rounded-md text-xs py-0.5 bg-green-700 text-white text-start'>Going</span>
          </div>
          <h1 className='text-xl font-bold'>{eventname}</h1>
          <p className='text-md'>Event Description goes here as something that is going ...</p>
          <p className='text-md text-zinc-200/70'> <IoPeople className='inline' /> by {organiser}</p>
          <p className='text-md text-zinc-200/70'> <IoLocationOutline className='inline' /> {location}</p>
          <div className="flex gap-2 items-center">
            <Link to={`/manage/${eventname}`} className='px-3 font-semibold rounded-md text-md py-1 my-2 bg-zinc-200 hover:shadow-xl shadow-zinc-100 group text-black text-start flex items-center gap-1'>Manage <FaArrowRight className='transform group-hover:text-black text-zinc-200/90 transition-all'/> </Link>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <img src={"https://media.gq-magazine.co.uk/photos/5d80ad292e812f000817b75c/1:1/w_1600%2Cc_limit/20190917-GT-05.jpg"} alt="" className='rounded-2xl w-full'/>
        </div>
      </Link>
    </>
  )
}

export default EventCard