import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const MoreCard = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full flexflex-col gap-2 p-2">
        <h1 className='text-lg'>More details</h1>
        <div className="flex flex-col m-2 pt-8 gap-2 items-start">
          <p className='font-semibold'>Delete Event?</p>
          <p className='text-sm'>Click on the below button to delete the event</p>
          <button className=' px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 transition-all shadow-red-400/20 shadow-lg' onClick={() => setOpen(true)}>Delete Event</button>
        </div>
      </div>



      {open && (
        <div className=" absolute  backdrop-blur-lg  shadow-xl border-white/40  border  px-8 py-12  rounded-3xl  bg-[#212325]/90 text-white  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col  items-center justify-between  gap-10 ">
            <div className=" flex flex-col  items-center gap-2">
              <h1 className="text-lg">Are you sure you want to cancel?</h1>
            </div>
            <div className="flex flex-col">
              <h1 className=" tracking-wider text-sm font-bold">Enter the event name below to delete</h1>
              <h1 className="text-lg mb-2">Event : {id}</h1>
              <form className="flex flex-col gap-2">
                <input
                  className="focus:border-1 outline-none bg-transparent border-gray-500 rounded-md pl-4 w-[300px] py-2 border-[1px]"
                  type="text"
                  placeholder="enter here"
                />
                <button
                  className="bg-red-600/60 rounded-lg text-white px-10 py-2"
                >
                  Delete the event
                </button>
                <button
                  className="bg-zinc-100 rounded-lg text-black px-10 py-2"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default MoreCard