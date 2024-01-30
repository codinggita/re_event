import React from "react";
import { useMainDashContext } from "../../../context/AppContext";

const InPerson = () => {
  const { newevent, setNewEvent } = useMainDashContext();
  return (
    <>
      <div className="p-4">
        <h1>Enter Location</h1>
        <div className="w-full  flex items-center flex-col md:flex-row gap-3  md:gap-16 ">
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter Location"
              className=" w-full md:w-[30rem] h-[2.5rem] border-none outline-none  bg-[#323436] border-gray-500 rounded-md p-3 mt-2"
              onChange={(e) =>
                setNewEvent({ ...newevent, eventlocation: e.target.value })
              }
            />
          </div>
          <div className="w-full flex items-center gap-5">
            <div className="h-10 w-[0.2px] bg-white"></div>
            <button className=" bg-[#323436] text-white p-3 rounded-md mt-2">
              Use Current Location
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InPerson;
