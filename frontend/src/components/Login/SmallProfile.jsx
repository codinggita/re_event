import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useMainDashContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { RiBox3Fill } from "react-icons/ri";

const SmallProfile = () => {
  // const [modifiedEmail1, setModifiedEmail] = useState("");
  // const [openProfile, setOpenProfile] = useState(false);

  // const email = Cookies.get("user");
  // // console.log(email);
  // const user = JSON.parse(email);
  // const email1 = user?.decodedjwt?.email;
  // // console.log(email1)

  // const lastIndex = email1.lastIndexOf("@gmail.com");
  // useEffect(() => {
  //   if (lastIndex !== -1) {
  //     const modifiedEmail = email1.slice(0, lastIndex);
  //     setModifiedEmail(modifiedEmail);
  //   }
  // }, [email]);

  //   const handleProfileClick = () => {
  //   setOpenProfile(!openProfile);
  //   };
  return (
    <Link
    to="/"
    className="text-lg items-center  group font-semibold hidden fixed top-[5rem]  -right-6 md:flex -rotate-90"
  >
    
    <h1 className="bg-gradient-to-r from-white/50 to-pink-500 text-transparent bg-clip-text">
      Dashboard
    </h1>
  </Link>
  );
};

export default SmallProfile;
