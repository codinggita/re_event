import React, { useState, useEffect } from 'react';
import { useMainDashContext } from '../context/AppContext';
import PastEvents from '../components/Dashboard/PastEvents';
import UpcomingEvents from '../components/Dashboard/UpcomingEvents';
import axios from 'axios';
import { toast } from 'sonner';


const components = {
  upcoming: UpcomingEvents,
  past: PastEvents,
};

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
};

const Dashboard = () => {
  const { activeTab, setActiveTab } = useMainDashContext();
  const ActiveComponent = components[activeTab] || null;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


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

  const groupedUpcomingEvents = groupEventsByDate(upcomingEvents);
  const sortedUpcomingEvents = sortEventsByDate(groupedUpcomingEvents);
  const groupedPastEvents = groupEventsByDate(pastEvents);
  const sortedPastEvents = sortEventsByDate(groupedPastEvents);
  return (
    <>
      {/* <div className="w-full flex flex-col items-center justify-center">
        <div className="max-w-[1600px] flex flex-col items-center justify-center"> */}
      <div className="w-full mt-20 px-10 text-white flex items-center justify-center">
        <div className="w-full md:w-2/3 flex justify-between">
          <h1 className="text-3xl font-bold">Events</h1>
          <div className="flex gap-4 bg-zinc-100 p-1 rounded-lg border items-center">
            <button
              className={`${activeTab === 'upcoming'
                ? 'bg-black shadow-lg text-white hover:bg-black'
                : 'bg-gray-100 text-black hover:bg-black/80'
                } rounded-lg hover:scale-105 hover:text-white px-3 py-1.5 transition-all`}
              onClick={() => handleTabClick('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`${activeTab === 'past'
                ? 'bg-black shadow-lg text-white hover:bg-black'
                : 'bg-gray-100 text-black hover:bg-black/80'
                } rounded-lg hover:scale-105 px-8 hover:text-white py-1.5 transition-all`}
              onClick={() => handleTabClick('past')}
            >
              Past
            </button>
          </div>
        </div>
      </div>

      {ActiveComponent && <ActiveComponent 
        upcomingEvents={upcomingEvents} 
        pastEvents={pastEvents} 
      />}

    </>
  );
};

export default Dashboard;
