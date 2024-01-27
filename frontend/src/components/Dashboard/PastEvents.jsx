import React from 'react'
import EventCard from './EventCard';
import NoEvents from './NoEvents';

const PastEvents = () => {
  const events = [
      // {
      //   id: 1,
      //   name: 'Test event one',
      //   location: 'Bora Bora Islands',
      //   time: '10.30 AM',
      //   organiser: 'Bals Shiva',
      // },
      // {
      //   id: 2,
      //   name: 'Why Porsche is the best german ?',
      //   location: 'Republican of Congo',
      //   time: '10.30 AM',
      //   organiser: 'Bals Shiva',
      // },
  ];
  return (
    <>
      <div className="w-full flex p-10 items-center justify-center text-white">
        <div className="w-full md:w-2/3 flex flex-col">
          <h1 className='text-lg text-start'>Past Events</h1>
          {events.length === 0 ? <NoEvents type="past"/> : <>
            <div className="flex flex-col md:flex-row py-8 px-4">
              <div className="w-full md:w-1/4 flex items-start p-4">
                <div className="flex flex-row items-center gap-2">
                  <span className='p-2 border rounded-full'></span>
                  2nd Aug, 2024
                </div>
              </div>
              <div className="w-full md:w-3/4 flex flex-col gap-4">
                {events.map((event) => <EventCard key={event.id} eventname={event.name} location={event.location} time={event.time} organiser={event.organiser} />)}
              </div>
            </div>
          </>}
        </div>
      </div>
    </>
  )
}

export default PastEvents