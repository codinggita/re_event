import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const MyEvents = () => {
  const [data, setData] = useState({});
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState(null); // New state to store event details
  const email = Cookies.get("user");
  const user = JSON.parse(email);
  const email1 = user?.decodedjwt?.email;

  useEffect(() => {
    const getUserEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/events/geteventsbyuserid/${email1}`
        );
        setData(response.data);
        setRegisteredEvents(response.data.registeredEvents);
        setCreatedEvents(response.data.createdEvents);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getUserEvents();
  }, [email1]);

  const getEventDetails = async (eventcode) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/events/geteventbyid/${eventcode}`
      );
      setEventDetails(response.data); // Store event details in state
      toast.success("Event details fetched successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching event details");
    }
  }

  return (
    <div className="w-full flex items-center justify-center space-x-8">
      <div className="w-1/2">
        {createdEvents.length > 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl text-white">Created Events</h1>
            <div className="flex flex-col items-center justify-center">
              {createdEvents.map((event) => (
                <div key={event.eventcode} className="flex flex-col items-center justify-center my-4">
                  <h1 className="text-3xl font-bold text-gray-100">{event}</h1>
                  <div
                    // to={`/event/${event.eventcode}`}
                    className="text-blue-500 underline"
                    onClick={() => getEventDetails(event)}
                  >
                    View Details
                  </div>
                  {eventDetails && eventDetails.eventcode === event.eventcode && (
                    <div>
                      {/* Display event details */}
                      <p>{eventDetails.description}</p>
                      {/* Add more details as needed */}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-100">No Created Events</h1>
          </div>
        )}
      </div>
      <div className="w-1/2">
        {registeredEvents.length > 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl text-white">Registered Events</h1>
            <div className="flex flex-col items-center justify-center">
              {registeredEvents.map((event) => (
                <div key={event.eventcode} className="flex flex-col items-center justify-center my-4">
                  <h1 className="text-3xl font-bold text-gray-100">{event.eventname}</h1>
                  <div
                    // to={`/event/${event.eventcode}`}
                    className="text-blue-500 underline"
                    onClick={() => getEventDetails(event.eventcode)}
                  >
                    View Details
                  </div>
                  {eventDetails && eventDetails.eventcode === event.eventcode && (
                    <div>
                      {/* Display event details */}
                      <p>{eventDetails.description}</p>
                      {/* Add more details as needed */}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-100">No Registered Events</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyEvents;
