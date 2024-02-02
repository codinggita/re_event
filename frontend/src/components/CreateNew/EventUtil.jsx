import React from "react";
import { useMainDashContext } from "../../context/AppContext";

const EventUtil = (props) => {
  const { name, icon } = props;
  const { activemenuItem, setActivemenuItem } = useMainDashContext();
  const { newevent, setNewEvent } = useMainDashContext();

  const handleClick = () => {
    setActivemenuItem(name);
    if (name === "zoom" || name === "virtual") {
      setNewEvent({ ...newevent, eventtype: "online" });
    } else if (name === "In-Person") {
      setNewEvent({ ...newevent, eventtype: "offline" });
    }
  }

  return (
    <>
      <button
        className={`${activemenuItem === name
            ? "bg-[#68696b] text-white"
            : "text-gray-400 hover:text-white"
          }
      } flex  hover:bg-[#68696b] w-full md:w-[10rem] p-3 rounded-md items-center justify-center gap-3`}
        onClick={handleClick}
      >
        {icon}
        <div className=" ">{name}</div>
      </button>
    </>
  );
};

export default EventUtil;
