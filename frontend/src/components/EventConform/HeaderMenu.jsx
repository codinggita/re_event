import React from "react";
import HeaderItems from "./utils/HeaderItems";


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
