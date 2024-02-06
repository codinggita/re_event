import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
const Overview = lazy(() => import("../components/Manage/Items/Overview"));
const Guests = lazy(() => import("../components/Manage/Items/GuestsCard"));
const Analytics = lazy(() => import("../components/Manage/Items/Analytics"));
const MoreCard = lazy(() => import("../components/Manage/Items/MoreCard"));
const EditEvent = lazy(() => import("../components/Manage/Items/EditEvent"));
const Questions = lazy(() => import("../components/Manage/Items/Questions"));
import { useMainDashContext } from "../context/AppContext";
import ManageMenuItem from "../components/Manage/ManageMenuItem";
import Header from "../components/EventConform/Header";
import Sticky from "react-stickynode";
import { IoPeopleSharp } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { BsQuestionSquareFill } from "react-icons/bs";
import { SlGraph } from "react-icons/sl";
import { RiBox3Fill } from "react-icons/ri";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const components = {
  Overview: Overview,
  Guests: Guests,
  Analytics: Analytics,
  More: MoreCard,
  Questions: Questions,
  EditEvent: EditEvent,
};

const ManageEvent = () => {
  const navigate = useNavigate();
  const { managetab } = useMainDashContext();
  const ActiveComponent = components[managetab] || null;
  const cookie = Cookies.get("user");
  console.log(cookie);
  const user = JSON.parse(cookie);
  const _umail = user.decodedjwt.email;
  console.log(_umail);
  const [isUserEvent, setIsUserEvent] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const getuserEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/events/geteventsbyuserid/${_umail}`
        );
        const userEvents = response.data.createdEvents;
        const isthis = userEvents.some((event) => event === id);
        setIsUserEvent(isthis);
        console.log(isthis);
        if (!isthis) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getuserEvents();
  }, []);
  return (
    <>
      {isUserEvent && (
        <div className="w-full flex justify-center">
          <div className="w-full my-2 flex flex-col   max-w-[1600px] items-center  justify-around">
            <Link
              to="/dashboard"
              className="text-xl items-center  group font-semibold hidden fixed top-[5rem]  -left-6 md:flex -rotate-90"
            >
              <RiBox3Fill className="text-2xl transform mr-2 group-hover:rotate-180 transition-all " />
              Re:
              <h1 className="bg-gradient-to-r from-white/50 to-pink-500 text-transparent bg-clip-text">
                Event
              </h1>
            </Link>
            <div className="flex z-50 w-[90%] md:w-3/4 flex-col ">
              {/* <p className='text-sm font-light text-zinc-500'>Manage <FaArrowRight className='inline text-xs' /></p> */}
              <Sticky enabled={true}>
                <div className="   ">
                  <Header />
                  <div className="flex items-center h-20   bg-[#131517]  gap-8 w-[100%]">
                    <ManageMenuItem
                      tab="Overview"
                      icon={<IoPeopleSharp className=" " />}
                    />
                    <ManageMenuItem
                      tab="Guests"
                      icon={<IoPeopleSharp className=" " />}
                    />
                    <ManageMenuItem
                      tab="EditEvent"
                      icon={<MdModeEditOutline className=" " />}
                    />
                    <ManageMenuItem
                      tab="Questions"
                      icon={<BsQuestionSquareFill className=" " />}
                    />
                    <ManageMenuItem
                      tab="Analytics"
                      icon={<SlGraph className=" " />}
                    />
                    <ManageMenuItem tab="More" icon={<MdEmail className=" " />} />
                  </div>
                  <hr className="mb-4 -mt-6 h-1 w-full border-zinc-500/60" />
                </div>
              </Sticky>
            </div>
            <div className="w-full md:w-3/4 px-8  md:px-0 flex flex-col">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading...</div>}>
                {ActiveComponent && <ActiveComponent />}
              </Suspense>
            </div>
          </div>
        // </div>
      )}
    </>
  );
};

export default ManageEvent;
