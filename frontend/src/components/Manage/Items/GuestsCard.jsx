import React, { useState, useEffect } from 'react';
import { PiExport } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import GuestListMenuItem from '../GuestListMenuItem';
import { Link, useParams } from 'react-router-dom';
import { MdQrCode } from "react-icons/md";
import axios from 'axios';
import { format } from "date-fns";
import { CSVLink } from 'react-csv';

const GuestsCard = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get(
          `https://re-event-backend.onrender.com/events/geteventbyid/${id}`
        );
        setEvent(response.data);
        setTotalRegistrations(response.data.registeredUsers.length);
        setCsvData(response.data.registeredUsers.map((guest) => ({
          name: guest.email.split('@')[0],
          email: guest.email,
          registeredDate: format(new Date(guest.registeredDate), "do MMM yyyy, h:mm aa")
        })));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getEvent();
  }, []);

  const maximumRegistrations = 100;
  const progressBarWidth = (totalRegistrations / maximumRegistrations) * 100;

  const filteredUsers = event.registeredUsers && event.registeredUsers.filter((guest) => {
    const username = guest.email.split('@')[0];
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    return (
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      capitalizedUsername.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Time', key: 'registeredDate' },
  ];

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex w-full p-4 gap-3 flex-col">
          <h1 className="text-start text-xl">Registrations overview</h1>
          <p className="text-start text-zinc-400 text-md">Total registrations: {totalRegistrations}</p>
          <div className="w-full bg-zinc-700 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 shadow-purple-500/60 shadow-lg h-2.5 rounded-full" style={{ width: `${progressBarWidth}%` }}></div>
          </div>
        </div>

        <hr className="w-full mt-10 mb-4 border-zinc-700" />

        <div className="flex w-full flex-col p-4">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-start text-xl">Guest List</h1>
            <div className="flex gap-2 items-center">

              <Link to={`/manage/${id}/checkin`} className='px-6 bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-100/80 hover:text-black flex items-center transition-all text-center py-1.5'>

                Scan
                <PiExport className='ml-2 text-2xl' />
              </Link>
              <CSVLink data={csvData} headers={headers} filename={'guest_list.csv'}>
                <div className='px-6 bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-100/80 hover:text-black flex items-center transition-all text-center py-1.5'>
                  Export
                  <PiExport className='ml-2 text-2xl' />
                </div>
              </CSVLink>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-between w-full">
              <IoIosSearch className='p-1 bg-zinc-800 border border-zinc-200/20 text-4xl rounded-lg' />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-1.5 my-3 text-zinc-200 rounded-lg outline-none focus:border border-[1px] border-zinc-200/20 bg-zinc-800"
                placeholder='Search in guests ...'
              />
              {/* <PiExport className='p-1 bg-zinc-800 border border-zinc-200/20 text-4xl rounded-lg cursor-pointer hover:shadow-lg shadow-zinc-100' /> */}
            </div>

            {totalRegistrations === 0 ? (
              <p className="text-zinc-400 text-md mt-4">No registered users.</p>
            ) : (
              filteredUsers &&
              filteredUsers.map((guest, index) => {
                const username = guest.email.split('@')[0];
                const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
                return (
                  <GuestListMenuItem
                    key={index}
                    name={capitalizedUsername}
                    email={guest.email}
                    time={format(guest.registeredDate, "PPP")}
                  />
                )
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestsCard;
