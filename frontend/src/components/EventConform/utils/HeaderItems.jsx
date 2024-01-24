import React from "react";
import { useMainDashContext } from "../../../context/AppContext";

const HeaderItems = (props) => {
  const { name, icon } = props;

  const { EventHeader, setEventHeader } = useMainDashContext();

  const handleClick = () => {
    setEventHeader(name);
  };

  return (
    <div className="mt-5     flex items-center flex-col   cursor-pointer" onClick={handleClick}>
      <h1
        className={`${
          EventHeader === name ? "   bg-gradient-to-r from-white/50 to-pink-500 text-transparent bg-clip-text" : "text-gray-400"
        } font- text-md flex items-center  gap-2 cursor-pointer`}
      >
        {icon }
        
        
        {name}
      </h1>
      {EventHeader === name && (
        <div className="w-full h-1  rounded bg-white/80"></div>
      )}
    </div>
  );
};

export default HeaderItems;
