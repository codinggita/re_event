import React from 'react';
import EventCard from './EventCard';

const UpcomingEvents = () => {
  return (
    <>
      <div className="w-full flex p-10 items-center justify-center text-white">
        <div className="w-full md:w-2/3 flex flex-col">
          <h1 className='text-lg text-start'>Upcoming Events</h1>
          <div className="flex flex-col md:flex-row py-8 px-4">
            <div className="w-full md:w-1/4 flex items-start p-4">
              <div className="flex flex-row items-center gap-2">
                <span className='p-2 border rounded-full'></span>
                29th Feb, 2024
              </div>
            </div>
            <div className="w-full md:w-3/4 flex flex-col gap-4">
              <EventCard eventname="Test event one" location="Bora Bora Islands" time="10.30 AM" organiser="Bals Shiva" />
              <EventCard eventname="Test event two" location="Republican of Congo" time="10.30 AM" organiser="Bals Shiva" />
              {/* <EventCard /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpcomingEvents