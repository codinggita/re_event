import React, { useState, useEffect } from 'react';
import ManageCard from '../ManageCard';
import GuestListMenuItem from '../GuestListMenuItem';
import { useMainDashContext } from '../../../context/AppContext';
import HostProfile from '../HostProfile';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from "date-fns";

const Overview = () => {
  const { setManagetab } = useMainDashContext();
  const { id } = useParams();
  const [event, setEvent] = useState({});
  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/events/geteventbyid/${id}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getEvent();
  }, []);
  // console.log(event) 
  const guests = [
    {
      name: "Takeshi Goda",
      email: "test@mail.com",
      time: "10:30 AM",
    },
    {
      name: "Sasuke",
      email: "test@mail.com",
      time: "15:30 PM",
    },
    {
      name: "Alexandar Christie",
      email: "mail@test.com",
      time: "10:30 AM",
    },
    {
      name: "Adolf Hitler",
      email: "nuclear@bomb.com",
      time: "12:00 PM",
    },
  ];
  return (
    <>
      <div className="w-full">
        <ManageCard eventname={event.eventname} location={event.eventlocation} time={event.eventtime} organiser={event.eventcreatedby} image={event.eventbanner} description={event.description} id={id} />

        <div className="w-full p-4 flex flex-col items-center">
          <div className="flex w-full px-2 py-6 items-center justify-between">
            <h1 className="text-lg">
              Recent Registrations - ({event.registeredUsers && event.registeredUsers.length})
            </h1>
            <button
              className="bg-zinc-800 hover:bg-zinc-200 transition-all px-4 py-1 rounded-lg text-white hover:text-black"
              onClick={() => setManagetab("Guests")}
            >
              View all
            </button>
          </div>
          <div className="w-full flex gap-2 flex-col">
            {event.registeredUsers &&
              event.registeredUsers.map((guest, index) => {
                const username = guest.email.split('@')[0];
                const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
                return (
                  <GuestListMenuItem
                    key={index}
                    name={capitalizedUsername}
                    email={guest.email}
                    time={format(guest.registeredDate, "PPP")}
                  />
                );
              })
            }
          </div>
        </div>

        <HostProfile hosts={event.eventcreatedby}/>
      </div>
    </>
  );
};

export default Overview;
