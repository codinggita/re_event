import React from 'react'

const AnalyticsGraphCard = () => {
  return (
    <>
         <div className="w-full flex flex-col bg-zinc-800 rounded-2xl">
            <div className="w-full h-full bg-white p-40 rounded-t-2xl">.</div>
            <div className="w-full h-full flex bg-pink-100 p-32 rounded-b-2xl">
                <div className="w-1/2 text-black">
                    <p className='font-semibold'>Page Views</p>
                    <p className='font-semibold'>69</p>
                </div>
                <div className="w-1/2"></div>
            </div>
         </div>
    </>
  )
}

export default AnalyticsGraphCard