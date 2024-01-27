import React from "react";

const Virtual = () => {
  return (
    <>
      <div className="p-4  md:w-[90%] ">
        <h1>Event URL</h1>
        <div className="flex items-center  gap-16">
          <div>
            <input
              type="text"
              placeholder="Enter Event URL"
              className=" w-[30rem] h-[2.5rem] border-none outline-none  bg-[#323436] border-gray-500 rounded-md p-3 mt-2"
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
