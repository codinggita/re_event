import React from "react";

import { useMainDashContext } from "../../context/AppContext";

const EventUtil = (props) => {
  const { name, icon } = props;
  const { activemenuItem, setActivemenuItem } = useMainDashContext();

  return (
    <>
      <button
        className={`${
          activemenuItem === name
            ? "bg-[#68696b] text-white"
            : "text-gray-400 hover:text-white"
        }
      } flex  hover:bg-[#68696b] w-[10rem] p-3 rounded-md items-center justify-center gap-3`}
        onClick={() => setActivemenuItem(name)}
      >
        {icon}
        <div className=" ">{name}</div>
      </button>
    </>
  );
};

export default EventUtil;
