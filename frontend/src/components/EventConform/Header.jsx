import React from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";
const Header = () => {
  return (
    <div className="flex justify-between">
    <div className=" flex flex-col gap-2">
      <h1 className=" text-3xl">Re:Event Demo Event</h1>
      <p className=" text-sm text-gray-400">
        OCT 15 (FRI), 10:30 AM - OCT 15 (FRI), 10:30 AM
      </p>
    </div>
    <div className="flex gap-2 flex-col">
      <p>Shareable Event Link</p>
      <div className="flex items-center gap-2  border border-gray-500 px-1.5  bg-[#323436]/80 backdrop-blur-lg rounded-md">
        <FaRegEyeSlash className="   " />
        <div className="h-10 w-[0.2px]  bg-gray-500"></div>
        <div className="flex items-center gap-2">
          <p>lu.ma/Meet/xyzkip</p>
          <div className="h-10 w-[0.2px]  bg-gray-500"></div>
          <MdContentCopy />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Header