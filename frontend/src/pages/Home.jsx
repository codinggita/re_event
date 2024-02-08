import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import LogSign from "../components/Login/LogSign";
import { useMainDashContext } from "../context/AppContext";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
const Home = () => {
  const cookie = Cookies.get("user");
  // console.log(cookie);
  const { openlogin, setOpenlogin } = useMainDashContext();
  return (
    <>
      <div className="w-full flex items-center  justify-center">
        {cookie ? (
          <></>
        ) : (
          <>
            {openlogin && <LogSign />}
            {/* <HeroSection /> */}
          </>
        )}
        {/* {openlogin && <LogSign />} */}
        <HeroSection />
      </div>
    </>
  );
};

export default Home;
