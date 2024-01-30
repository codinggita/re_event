import React from "react";
import { useMainDashContext } from "../../../context/AppContext";

const Virtual = () => {
  const { newevent, setNewEvent } = useMainDashContext();
  return (
    <>
      <div className="p-4 w-full md:w-[90%] ">
        <h1 className="pb-8">Event URL</h1>
        <div className="flex items-center flex-col md:flex-row w-full gap-3 md:gap-16">
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter Event URL"
              className=" w-full h-[2.5rem] border-none outline-none  bg-[#323436] border-gray-500 rounded-md p-3 mt-2"
              onChange={(e) =>
                setNewEvent({ ...newevent, eventurl: e.target.value })
              }
            />
          </div>
          <div className=" flex items-center  justify-between gap-5">
            <div className=" w-[0.2px] h-10  bg-white"></div>
            <h1>
              Enter the URL to your Event - Google Meet, Twitch, Youtube, etc.
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Virtual;
