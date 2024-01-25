import React, { createContext, useContext, useState } from "react";

const MainDashContext = createContext();

export const MainDashProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [openlogin, setOpenlogin] = useState(false);
  const [managetab, setManagetab] = useState("Overview");
  const [activemenuItem, setActivemenuItem] = useState("zoom");
  const [EventHeader, setEventHeader] = useState("Add Guests");


  // const [managetab, setManagetab] = useState("overview");



  return (
    <MainDashContext.Provider
      value={{
        activeTab,
        setActiveTab,
        openlogin,
        setOpenlogin,

        activemenuItem,
        setActivemenuItem,
        EventHeader,
        setEventHeader,

        managetab,
        setManagetab,

      }}
    >
      {children}
    </MainDashContext.Provider>
  );
};

export const useMainDashContext = () => {
  const context = useContext(MainDashContext);
  if (!context) {
    throw new Error(
      "useMainDashContext must be used within a MainDashProvider"
    );
  }
  return context;
};
