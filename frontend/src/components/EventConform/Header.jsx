import React from "react";
import { Link, useParams } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
const Header = () => {
  const { id } = useParams();
  return (
    <div className="flex  bg-[#131517]  justify-between">
      <div className=" flex justify-between w-full  backdrop-blur-md mt-10">

        <div className=" flex flex-col gap-2 ">
          <h1 className=" text-3xl">Re:Event {id}</h1>
          <p className=" text-sm text-gray-400">
            OCT 15 (FRI), 10:30 AM - OCT 15 (FRI), 10:30 AM
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
          <Link to={`/e/${id}`} className='px-6 bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-100/80 hover:text-black transition-all text-center py-1.5'>Visit</Link>
        </div>
      </div>

    </div>
  );
};

export default Header;
