import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import NoEvents from './NoEvents';
import axios from 'axios';
import { toast } from 'sonner';

const PastEvents = () => {
  // const events = [
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
  // ];

  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/events/getevents');
        setEvents(response.data);
        separateEvents(response.data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to fetch events');
      }
    };

    getAllEvents();
  }, []);

  const separateEvents = (events) => {
    const today = new Date();

    const upcoming = events.filter(event => new Date(event.eventdate) > today);
    const past = events.filter(event => new Date(event.eventdate) <= today);

    setUpcomingEvents(upcoming);
    setPastEvents(past);
  };
  console.log('past', pastEvents);
  console.log('upcoming', upcomingEvents)
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="max-w-[1600px]  w-full flex p-10 items-center justify-center text-white">
          <div className="w-full md:w-2/3 flex flex-col">
            <h1 className='text-lg text-start'>Past Events</h1>
            {pastEvents.length === 0 ? <NoEvents type="past" /> : <>
              <div className="flex flex-col md:flex-row py-8 px-4">
                <div className="w-full md:w-1/4 flex items-start p-4">
                  <div className="flex flex-row items-center gap-2">
                    <span className='p-2 border rounded-full'></span>
                    2nd Aug, 2024
                  </div>
                </div>
                <div className="w-full md:w-3/4 flex flex-col gap-4">
                  {pastEvents.map((event) => <EventCard
                    key={event.id}
                    eventname={event.eventname}
                    location={event.eventlocation}
                    time={event.eventtime}
                    organiser={event.eventcreatedby}
                    image={event.eventbanner}
                    id={event.eventcode}
                  />)}
                </div>
              </div>
            </>}
          </div>
        </div>
      </div>
    </>
  )
}

export default PastEvents