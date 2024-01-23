import React from 'react'
import EventCard from './EventCard'

const PastEvents = () => {
  return (
    <>
      <div className="w-full flex p-10 items-center justify-center text-white">
        <div className="w-full md:w-2/3 flex flex-col">
          <h1 className='text-lg text-start'>Past Events</h1>
          <div className="flex flex-col md:flex-row py-8 px-4">
            <div className="w-full md:w-1/4 flex items-start p-4">
              <div className="flex flex-row items-center gap-2">
                <span className='p-2 border rounded-full'></span>
                2nd Aug, 2024
              </div>
            </div>
            <div className="w-full md:w-3/4 flex flex-col gap-4">
              <EventCard eventname="Guest Seminar" location="Singapore City" time="10.30 AM" organiser="Kratos" />
              <EventCard eventname="Why Porsche is the best german ?" location="California, US" time="10.30 AM" organiser="Raiden Shogun" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PastEvents