import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import NoEvents from './NoEvents';


const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
};

const PastEvents = ({pastEvents}) => {

  const groupEventsByDate = (events) => {
    const groupedEvents = {};

    events.forEach(event => {
      const date = formatDate(event.eventdate);
      if (!groupedEvents[date]) {
        groupedEvents[date] = [event];
      } else {
        groupedEvents[date].push(event);
      }
    });

    return groupedEvents;
  };

  const sortEventsByDate = (groupedEvents) => {
    const sortedDates = Object.keys(groupedEvents).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    });

    const sortedEvents = {};
    sortedDates.forEach(date => {
      sortedEvents[date] = groupedEvents[date];
    });

    return sortedEvents;
  };

  const groupedPastEvents = groupEventsByDate(pastEvents);
  const sortedPastEvents = sortEventsByDate(groupedPastEvents);  


  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="max-w-[1600px]  w-full flex p-10 items-center justify-center text-white">
          <div className="w-full md:w-2/3 flex flex-col">
            <h1 className='text-lg text-start'>Past Events</h1>
            {pastEvents.length === 0 ? <NoEvents type="past" /> : <>
              {Object.entries(sortedPastEvents).map(([date, eventsOnDate]) => (
                <div key={date} className="flex flex-col md:flex-row py-8 px-4">
                  <div className="w-full md:w-1/4 flex items-start p-4">
                    <div className="flex flex-row items-center gap-2">
                      <span className='p-2 border rounded-full'></span>
                      {date}
                    </div>
                  </div>
                  <div className="w-full md:w-3/4 flex flex-col gap-4">
                    {eventsOnDate.map((event) => (
                      <EventCard
                        key={event.id}
                        eventname={event.eventname}
                        location={event.eventlocation}
                        time={event.eventtime}
                        organiser={event.eventcreatedby}
                        image={event.eventbanner}
                        id={event.eventcode}
                        description={event.description}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </>}
          </div>
        </div>
      </div>
    </>
  )
}

export default PastEvents