import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import LogSign from "../components/Login/LogSign";
import { useMainDashContext } from "../context/AppContext";
const Home = () => {
  const { openlogin, setOpenlogin } = useMainDashContext();
  return (
    <>
      <div className="w-full flex items-center max-w-[1500px] justify-center">
      {openlogin && <LogSign />}
        <HeroSection />
      </div>
    </>
  );
};

export default Home;
