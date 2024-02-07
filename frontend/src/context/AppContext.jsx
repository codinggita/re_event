import React, { createContext, useContext, useState } from "react";

const MainDashContext = createContext();

export const MainDashProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [openlogin, setOpenlogin] = useState(false);
  const [managetab, setManagetab] = useState("Overview");
  const [activemenuItem, setActivemenuItem] = useState("zoom");
  const [EventHeader, setEventHeader] = useState("Add Guests");
  const [RegisterClick, setRegisterClick] = useState(false);

  const [profile, setProfile] = useState({});
  const [editedEvent, setEditedEvent] = useState({});

  const [userProfileMenu, setUserprofilemenu] = useState("Myevents");

  const [askuserName, setAskuserName] = useState(false);

  const [newevent, setNewEvent] = useState({
    eventname: "",
    eventdate: "",
    eventtime: "",
    eventbanner: "",
    description: "",
    eventlocation: "",
    eventcreatedby: "",
    eventtype: "online",
    registrationstatus: "open",
    eventstatus: "upcoming",
    eventurl: "",
    eventticketprice: "",
    visibility: "",
    questions: [],
    registeredusers: []
  });


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

        RegisterClick,
        setRegisterClick,

        profile,
        setProfile,

        newevent,
        setNewEvent,

        editedEvent,
        setEditedEvent,

        userProfileMenu,
        setUserprofilemenu,

        askuserName,
        setAskuserName
        
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
