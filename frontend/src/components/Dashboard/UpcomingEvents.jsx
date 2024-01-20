import React from 'react';
import EventCard from './EventCard';

const UpcomingEvents = () => {
  return (
    <>
      <div className="w-full flex p-10 items-center justify-center text-white">
        <div className="w-2/3 flex flex-col">
          <h1 className='text-lg text-start'>Upcoming Events</h1>
          <div className="flex py-8 px-4">
            <div className="w-1/4">
              Date
            </div>
            <div className="w-3/4 flex flex-col gap-4">
              <EventCard eventname="How to roast people (dark edition) 💗" location="Bora Bora Islands" time="10.30 AM" organiser="Bals Shiva"/>
              <EventCard eventname="How to fuck people (cute edition) 💗" location="Republican of Congo" time="10.30 AM" organiser="Bals Shiva"/>
              {/* <EventCard /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpcomingEvents