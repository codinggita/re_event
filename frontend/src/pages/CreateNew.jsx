import React from "react";
import { FaImages } from "react-icons/fa6";
import { FaGlobeAmericas } from "react-icons/fa";
import { MdOutlineComputer } from "react-icons/md";
import { IoIosVideocam } from "react-icons/io";
import { useMainDashContext } from "../context/AppContext";
import EventUtil from "../components/CreateNew/EventUtil";
import Zoom from "../components/CreateNew/utils/Zoom";
import Virtual from "../components/CreateNew/utils/Virtual";
import InPerson from "../components/CreateNew/utils/InPerson";
import DateTime from "../components/CreateNew/utils/DateTime";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CreateNew = () => {
  const { activemenuItem, setActivemenuItem } = useMainDashContext();

  return (
    <>
      <div className=" flex  justify-center rounded-xl  mt-8 text-white ">
        <div className=" w-[80%] bg-[#212325]     rounded-2xl p-3">
          <div className=" relative bg-gradient-to-r from-amber-500 to-pink-500  rounded-xl    h-[500px]">
            {/* <img
              src="https://image.tmdb.org/t/p/original/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg"
              alt=""
              className="w-full h-full object-cover    "
            /> */}
            <div className=" bg-[#212325]/80  bottom-10 left-10  cursor-pointer group gap-5 p-5 h-[2.5rem] backdrop-blur-xl  rounded-md border border-gray-500   flex items-center pl-3 absolute ">
              <FaImages className=" text-white/80 text-xl group-hover:text-white" />
              <h1 className="  font-bold text-white/80   group-hover:text-white">
                Change Cover Photo
              </h1>
            </div>
          </div>

          <div className=" w-[90%] p-5">
            <p className=" p-3">Event Name</p>
            <h1
              className=" h-[3rem] focus:border-b-2  border-b-2 font-bold tracking-wide text-xl  text-gray-400    border-b-1 focus:border-gray-500 p-2 outline-none "
              contentEditable="true"
              suppressContentEditableWarning={true}
            >
              Enter Your Event Name
            </h1>
          </div>

          <div className=" p-5">
            <h1 className=" p-3    text-xl">
              Where is the Event taking place....
            </h1>
            <div>
              <div className=" bg-[#323436]  mt-4   w-[48%]  rounded-lg">
                <div className=" text-[#f7d5d5]  items-center justify-center flex  gap-2 px-1.5 py-1.5   ">
                  <EventUtil
                    name={"zoom"}
                    icon={<FaGlobeAmericas className=" text-lg" />}
                  />
                  <EventUtil
                    name={"virtual"}
                    icon={<MdOutlineComputer className=" text-lg" />}
                  />
                  <EventUtil
                    name={"In-Person"}
                    icon={<IoIosVideocam className=" text-lg" />}
                  />
                </div>
              </div>
              <div>
                {activemenuItem === "zoom" && (
                  <>
                    <Zoom />
                  </>
                )}
                {activemenuItem === "virtual" && (
                  <>
                    <Virtual />
                  </>
                )}
                {activemenuItem === "In-Person" && (
                  <>
                    <InPerson />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="p-5">
            <DateTime />
          </div>

          <div className="p-5">
            <h1 className="text-lg">Who has access to this event?</h1>

            <div className=" flex gap-5 p-3 flex-col">
              <div className="flex items-center gap-5">
                <input
                  type="checkbox"
                  name="access"
                  id="public"
                  value="public"
                  className=" w-5 h-5  caret-slate-500"
                />
                <div className="flex flex-col">
                  <label htmlFor="public" className=" text-lg">
                    Public{" "}
                  </label>
                  <h1 className="text-sm text-gray-400  ">
                    Anyone can join get Metting Details
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <input
                  type="checkbox"
                  name="access"
                  id="public"
                  value="public"
                  className=" w-5 h-5  caret-slate-500"
                />
                <div className="flex flex-col">
                  <label htmlFor="public" className=" text-lg">
                    Private{" "}
                  </label>
                  <h1 className="text-sm text-gray-400">
                    Only registered members can get the metting details
                  </h1>
                </div>
              </div>
            </div>
            {/* <input type="radio" name="access" id="invite" value="invite"/> */}
            {/* <label htmlFor="invite">Invite Only</label> */}
          </div>

          <Link to="/create/conform">
            <div className=" pl-8 pb-4  pt-4">
              {/* <div className=""> */}
              <button className=" bg-[#323436] rounded-lg hover:scale-105 flex items-center group gap-2 p-4">
                <FaAnglesRight className="text-sm " />
                <h1 className="text-sm ">Create Event</h1>
              </button>
              {/* </div> */}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CreateNew;
