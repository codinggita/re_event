import React, { useEffect } from "react";
import axios from "axios";
import LogSign from "../components/Login/LogSign";
import HeroSection from "../components/HeroSection";
import { useMainDashContext } from "../context/AppContext";
const Home = () => {
  // useEffect(() => {
  //   axios.get('http://localhost:3000/').then((response) => {
  //     console.log(response.data)
  //   })
  // })
  const { openlogin, setOpenlogin } = useMainDashContext();
  return (
    <>
      <div className="w-full flex items-center justify-center">
        {openlogin && <LogSign />}
        {/* <LogSign /> */}
        <HeroSection />
      </div>
    </>
  );
};

export default Home;
