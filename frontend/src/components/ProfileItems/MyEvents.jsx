import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MyEvents = () => {
  const [data, setData] = useState({});
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const email = Cookies.get("user");
  const user = JSON.parse(email);
  const email1 = user?.decodedjwt?.email;
  // console.log(email1)
  useEffect(() => {
    const getuserEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/events/geteventsbyuserid/${email1}`
        );
        setData(response.data);
        setRegisteredEvents(response.data.registeredEvents);
        setCreatedEvents(response.data.createdEvents);
        // console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getuserEvents();
  }, []);

  const getEventDetails = async (eventcode) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/events/geteventbyid/${eventcode}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-1/2">
          {createdEvents.length > 0 ? (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl text-white">Created Events</h1>
              <div className="flex flex-col items-center justify-center">
                {createdEvents.map((event) => (
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="text-3xl font-bold text-gray-100">{event}</h1>
                    </div>
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
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="text-3xl font-bold text-gray-100">{event.eventcode}</h1>
                    </div>
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
    </>
  )
}

export default MyEvents