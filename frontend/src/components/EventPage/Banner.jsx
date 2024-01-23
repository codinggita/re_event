import React from 'react';
import { useParams } from 'react-router-dom';
import { IoCalendarClearOutline, IoLocationOutline } from "react-icons/io5";

const Banner = (props) => {
  const { id } = useParams();
  const { img } = props;
  return (
    <>
      <div className="w-full flex flex-col bg-zinc-800 p-3 rounded-2xl">
        <img src={img} alt="" className="rounded-xl " />
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start p-3 gap-2 justify-center">
            <h1 className="text-3xl font-semibold">{id}</h1>
            <h1 className="text-lg font-light flex items-center gap-2"><span className='p-3 bg-pink-200 rounded-full'></span>by Host Name</h1>
          </div>
          <h1 className="text-xl font-medium p-3">10.30 AM</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between py-3 md:px-12 gap-5 items-start">
          <div className="flex w-full md:w-1/2 items-center shadow-gray-200/20  gap-3 justify-start  p-2 rounded-lg">
            <IoCalendarClearOutline className='border border-gray-200/40 p-2 rounded-xl text-4xl' />
            <div className="flex flex-col">
              <h1 className='text-md font-semibold'>Friday, 21 Jan, 2024</h1>
              <h1 className='text-md'>10:00 AM</h1>
            </div>
          </div>
          <div className="flex w-full md:w-1/2 items-center shadow-gray-200/20 gap-3 justify-start p-2 rounded-lg">
            <IoLocationOutline className='border border-gray-200/40 p-2 rounded-xl text-4xl' />
            <div className="flex flex-col">
              <h1 className='text-md font-semibold'>Indian Institute of Technology</h1>
              <h1 className='text-md'>Bombay, India</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner