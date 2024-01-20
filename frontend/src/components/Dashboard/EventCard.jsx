import React from 'react'

const EventCard = () => {
  return (
    <>
        <div className="w-full border border-zinc-800 shadow-zinc-800 rounded-2xl shadow-2xl m-2 gap-4 bg-zinc-800 p-8 flex">
            <div className="w-2/3 bg-zinc-800 flex flex-col gap-1">
                <p className='text-md font-light'>Date: 10.30 AM</p>
                <h1 className='text-xl font-bold'>Event Name 🥳🎉</h1>
                <p className='text-md'>Event Description goes here as something</p>
            </div>
            <div className="w-1/3 bg-yellow-300 rounded-2xl">
                {/* <span className='bg-yellow-200 w-full h-full'></span> */}
                .
            </div>
        </div>
    </>
  )
}

export default EventCard