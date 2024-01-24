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
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";
import Header from "../components/EventConform/Header";
import Sticky from "react-stickynode";

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
      <div className="w-full my-24 flex flex-col  bg-[#131517]  items-center  justify-around">
        <div className="w-full md:w-3/4 px-8  md:px-0 flex flex-col">
          {/* <p className='text-sm font-light text-zinc-500'>Manage <FaArrowRight className='inline text-xs' /></p> */}
          <Header />
          <Sticky enabled={true} top={67}>
            <div className="flex items-center    rounded-lg h-20  bg-[#131517] gap-2 w-[100%]">
              <ManageMenuItem tab="Overview" />
              <ManageMenuItem tab="Guests" />
              <ManageMenuItem tab="EditEvent" />
              <ManageMenuItem tab="Questions" />
              <ManageMenuItem tab="Analytics" />
              <ManageMenuItem tab="More" />
              <hr className="mb-4 border-zinc-500/60" />
            </div>
          </Sticky>
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </>
  );
};

export default ManageEvent;
