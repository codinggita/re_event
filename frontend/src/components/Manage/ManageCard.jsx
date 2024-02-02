import React from 'react'
import { IoPeople, IoLocationOutline,IoPersonSharp  } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useMainDashContext } from "../../context/AppContext";


const ManageCard = (props) => {
    const {image,id, eventname, time, location, organiser, description } = props
    const { setManagetab } = useMainDashContext();

    return (
        <>
            <div className="w-[99%] md:flex-row flex-col transition-all hover:border hover:border-zinc-400/40 border border-zinc-800 shadow-zinc-800 rounded-2xl  m-2 gap-4 bg-zinc-800 p-8 flex">
                <div className="w-full md:w-3/6 items-center flex">
                    <img src={image} alt="" className='rounded-2xl w-full' />
                </div>
                <div className="w-full md:w-3/5 bg-zinc-800 flex flex-col  items-start gap-1">
                    <h1 className='text-xl font-bold'>{eventname}</h1>
                    <p className='text-md'>Description: {description}</p>
                    <div className="flex flex-col md:flex-col justify-between py-1 w-full gap-1 items-start">
                        <div className="flex w-full items-center shadow-gray-200/20  gap-3 justify-start  p-2 rounded-lg">
                            <IoCalendarClearOutline className='border border-gray-200/40 p-2 rounded-xl text-4xl' />
                            <div className="flex flex-col">
                                <h1 className='text-md font-semibold'>Friday, 21 Jan, 2024</h1>
                                <h1 className='text-md'>{time}</h1>
                            </div>
                        </div>
                        <div className="flex w-full items-center shadow-gray-200/20 gap-3 justify-start p-2 rounded-lg">
                            <IoLocationOutline className='border border-gray-200/40 p-2 rounded-xl text-4xl' />
                            <div className="flex flex-col">
                                <h1 className='text-md font-semibold'>{location}</h1>
                                <h1 className='text-md'>Bombay, India</h1>
                            </div>
                        </div>
                        <div className="flex w-full  items-center shadow-gray-200/20 gap-3 justify-start p-2 rounded-lg">
                            <IoPersonSharp  className='border border-gray-200/40 p-2 rounded-xl text-4xl' />
                            <div className="flex flex-col">
                                <h1 className='text-md font-semibold'>by {organiser}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full gap-2 items-center">
                        <p className='w-1/2 bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-100/80 hover:text-black transition-all text-center py-1' onClick={()=>setManagetab('EditEvent')}>Edit Event</p>
                        <Link to={`/manage/${id}/checkin`} className='w-1/2 bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-100/80 hover:text-black transition-all text-center py-1'>Check-in</Link>
                    </div>
                </div>

            </div >
        </>
    )
}

export default ManageCard