import React from "react";
import { useMainDashContext } from "../../context/AppContext";

const ManageMenuItem = (props) => {
  const { managetab, setManagetab } = useMainDashContext();
  const handleTabClick = (tab) => {
    setManagetab(tab);
  };
  const { tab, icon } = props;
  return (
    <>
      <div
        className={`${
          managetab === tab
            ? " border-b-2 border-white text-white flex items-center"
            : "text-white/50 flex items-center"
        }flex items-center cursor-pointer  hover:border-b-2 hover:border-white hover:text-white  transition-all py-1 px-2     gap-2 `}
        onClick={() => handleTabClick(tab)}
      >
        {icon}

        <button
          className={`${
            managetab === tab ? " text-white" : ""
          } hover:text-white transition-all  `}
        >
          {tab}
        </button>
      </div>
      {/* <button className={`${managetab === tab ? 'border-b-2 border-white text-white' : 'text-zinc-200/80'} hover:text-white transition-all hover:border-b-2 hover:border-white py-1.5 px-4`} onClick={() => handleTabClick(tab)}>{tab}</button> */}
    </>
  );
};

export default ManageMenuItem;
