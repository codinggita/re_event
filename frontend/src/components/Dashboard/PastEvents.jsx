import React from 'react'
import EventCard from './EventCard'

const PastEvents = () => {
  return (
    <>
      <div className="w-full flex p-10 items-center justify-center text-white">
        <div className="w-2/3 flex flex-col">
          <h1 className='text-lg text-start'>Past Events</h1>
          <div className="flex py-8 px-4">
            <div className="w-1/4">
              Date
            </div>
            <div className="w-3/4 flex flex-col gap-4">
              <EventCard />
              <EventCard />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PastEvents