import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useMainDashContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { RiBox3Fill } from "react-icons/ri";

const SmallProfile = () => {
  const [modifiedEmail1, setModifiedEmail] = useState("");
  const [openProfile, setOpenProfile] = useState(false);

  const email = Cookies.get("user");
  console.log(email);
  //convert to json
  const user = JSON.parse(email);
  const email1 = user?.decodedjwt?.email;
  console.log(email1)

  // Find the index of the last occurrence of '@gmail.com'
  const lastIndex = email1.lastIndexOf("@gmail.com");
  useEffect(() => {
    // Check if '@gmail.com' was found in the email
    if (lastIndex !== -1) {
      //   // Remove the last occurrence of '@gmail.com'
      const modifiedEmail = email1.slice(0, lastIndex);
      setModifiedEmail(modifiedEmail);
    }
  }, [email]);

    const handleProfileClick = () => {
    setOpenProfile(!openProfile);
    };
  return (
    <Link
    to="/"
    className="text-xl items-center  group font-semibold hidden fixed top-[5rem]  -right-6 md:flex -rotate-90"
  >
    <RiBox3Fill className="text-2xl transform mr-2 group-hover:rotate-180 transition-all " />
    Re:
    <h1 className="bg-gradient-to-r from-white/50 to-pink-500 text-transparent bg-clip-text">
      Event
    </h1>
  </Link>
  );
};

export default SmallProfile;
