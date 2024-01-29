import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Overview from "../components/Manage/Items/Overview";
import Guests from "../components/Manage/Items/GuestsCard";
import Analytics from "../components/Manage/Items/Analytics";
import MoreCard from "../components/Manage/Items/MoreCArd";
import EditEvent from "../components/Manage/Items/EditEvent";
import Questions from "../components/Manage/Items/Questions";
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

const components = {
  Overview: Overview,
  Guests: Guests,
  Analytics: Analytics,
  More: MoreCard,
  Questions: Questions,
  EditEvent: EditEvent,
};

const ManageEvent = () => {
  const { managetab } = useMainDashContext();
  const ActiveComponent = components[managetab] || null;

  const { id } = useParams();
  return (
    <>
      <div className="w-full my-2 flex flex-col    items-center  justify-around">
        <Link
          to="/"
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
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </>
  );
};

export default ManageEvent;
