import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
import axios from "axios";
const Header = () => {
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
  // console.log(event);
  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  const eventdate = formatDate(event.eventdate);
  return (
    <div className="flex w-full bg-[#131517]  justify-between">
      <div className=" flex justify-between w-full md:flex-row flex-col backdrop-blur-md mt-10">
        <div className="w-full flex md:flex-col flex-row gap-2 items-center md:items-start">
          <h1 className=" text-3xl">{event.eventname}</h1>
          <p className=" text-sm text-gray-400">
            {eventdate}, {event.eventtime} - OCT 15 (FRI), 10:30 AM
          </p>
        </div>
        <div className="flex gap-2  items-end">
          <div className="flex gap-2 flex-col">
            <p className=" text-sm">Shareable Event Link</p>
            <div className="flex items-center gap-2  h-9  border border-gray-600 px-2  bg-[#323436]/80 backdrop-blur-lg rounded-md">
              <MdContentCopy className=" text-white cursor-pointer" />
              <div className="h-8 w-[0.2px]  bg-gray-500 "></div>
              <div className="flex items-center cursor-pointer text-zinc-400 hover:text-white/80 gap-2">
                <p>re.ven/e/{id}</p>
              </div>
            </div>
          </div>
          <Link
            to={`/e/${id}`}
            className="px-6 bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-100/80 hover:text-black transition-all text-center py-1.5"
          >
            Visit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
