import React from "react";
import HeaderItems from "./utils/HeaderItems";
import { IoPeopleSharp } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { BsQuestionSquareFill } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { SlGraph } from "react-icons/sl";

const HeaderMenu = () => {
  return (
    <>
      <div className="flex  gap-12  px-8 pt-3">
        <HeaderItems name={"Add Guests"} icon={<IoPeopleSharp className=" text-white/50"/> } />
        <HeaderItems name={"Edit Event"} icon={<MdModeEditOutline className=" text-white/50"/> } />
        <HeaderItems name={"Emails"} icon={<MdEmail className=" text-white/50"/>} />
        <HeaderItems name={"Questions"}  icon={<BsQuestionSquareFill className=" text-white/50"/>}/>
        <HeaderItems name={"Payment"}  icon={<MdOutlinePayment className=" text-white/50"/>} />
        <HeaderItems name={"Insights"} icon={<SlGraph className=" text-white/50"/>} />
        <HeaderItems name={"Settings"} />

      </div>
      <hr className="border-gray-200" />
    </>
  );
};

export default HeaderMenu;
