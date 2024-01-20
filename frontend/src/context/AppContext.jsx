import React, { createContext, useContext, useState } from "react";

const MainDashContext = createContext();

export const MainDashProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [openlogin, setOpenlogin] = useState(false);

  return (
    <MainDashContext.Provider
      value={{
        activeTab,
        setActiveTab,
        openlogin,
        setOpenlogin,
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