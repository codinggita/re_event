import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiBox3Fill } from "react-icons/ri";
import { useMainDashContext } from "./../context/AppContext";
import Cookies from "js-cookie";

const LoginNavbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { openlogin, setOpenlogin } = useMainDashContext();
  const [openProfile, setOpenProfile] = useState(false);
  const [modifiedEmail1, setModifiedEmail] = useState("");

  const { profile, setProfile } = useMainDashContext();
  const cookie = Cookies.get("user");
  // console.log(cookie);
  console.log(profile)
  const user = JSON.parse(cookie);
  const email = user?.decodedjwt?.email;

  // Find the index of the last occurrence of '@gmail.com'
  const lastIndex = email.lastIndexOf("@gmail.com");

  useEffect(() => {
    // Check if '@gmail.com' was found in the email
    if (lastIndex !== -1) {
      //   // Remove the last occurrence of '@gmail.com'
      const modifiedEmail = email.slice(0, lastIndex);
      setModifiedEmail(modifiedEmail);
    }
  }, [email]);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  const handleLoginClick = () => {
    setOpenlogin(!openlogin);
  };

  //   const handleDate = ()=>{
  const newdate = new Date();
  const date = newdate.getDate();
  const month = newdate.getMonth();
  const year = newdate.getFullYear();
  const hours = newdate.getHours();
  // get 12 hour format
  const hoursIn12HrFormat = hours >= 13 ? hours % 12 : hours;
  const minutes = newdate.getMinutes();
  const seconds = newdate.getSeconds();
  const mili = newdate.getMilliseconds();
  const appm = hours >= 12 ? "PM" : "AM";
  const gmt = newdate.getTimezoneOffset();

  const finalDate = ` ${hoursIn12HrFormat}:${minutes} ${appm} GMT +5:30 `;

  const handleProfileClick = () => {
    setOpenProfile(!openProfile);
  };
  //   }

  return (
    <>
      <div className="w-full z-[1000]  flex fixed bg-zinc-900/80 items-center backdrop-blur-2xl justify-between px-12 py-4 border-b border-gray-600 text-white">
        {/* <div className="w-full z-50 flex fixed bg-zinc-900/80 items-center justify-between px-12 py-4 border-b border-gray-600 text-white"> */}

        <div className="flex">
          <Link
            to="/"
            className="text-xl flex items-center  group font-semibold"
          >
            <RiBox3Fill className="text-2xl transform mr-2 group-hover:rotate-180 transition-all " />
            Re:
            <h1 className="bg-gradient-to-r from-white/50 to-pink-500 text-transparent bg-clip-text">
              Event
            </h1>
          </Link>
        </div>
        <div className="hidden md:flex gap-8  lg:flex lg:items-center ">
          <h1 className=" text-white/60">{finalDate}</h1>
          <Link
            to="/create"
            className="text-sm bg-gray-100 rounded-xl shadow text-black px-4 py-1.5 hover:scale-105 hover:bg-black/80 hover:text-white border transition-all cursor-pointer"
          >
            Create Event
          </Link>
          <div>
            <img
              src="https://picsum.photos/200"
              className="w-8 h-8 rounded-full cursor-pointer border-2 "
              onClick={handleProfileClick}
            />
            {openProfile && (
              <div className=" absolute  flex  flex-col  items-start  gap-2   top-[5rem]   px-4 py-5  bg-zinc-800  shadow-lg rounded-xl right-6">
                <div className=" flex gap-3   items-center  cursor-pointer  hover:bg-black/20 w-full  px-2  rounded-xl">
                  <img
                    src="https://picsum.photos/200"
                    className="w-9 h-9 rounded-full border-2"
                  />
                  <div className=" flex  py-1 flex-col  items-start ">
                    <h1 className="text-white text-lg "> {modifiedEmail1} </h1>
                    <h2 className="text-white/60 text-sm">{email}</h2>
                  </div>
                </div>
                <hr className="   text-white/30 border-white/20  w-full" />
                <div className=" text-zinc-400  text-base    w-full flex gap-2 mt-2 flex-col ">
                  <Link to="/profile" className="hover:bg-zinc-700/70 w-full cursor-pointer py-1 px-2 rounded-lg hover:text-zinc-300">
                    View Profile
                  </Link>
                  <h1 className="hover:bg-zinc-700/70 w-full cursor-pointer py-1 px-2 rounded-lg hover:text-zinc-300">
                    Settings
                  </h1>
                  <h1
                    className="hover:bg-zinc-700/70 w-full cursor-pointer py-1 px-2 rounded-lg hover:text-zinc-300"
                    onClick={() => {
                      Cookies.remove("user");
                      Cookies.remove("token");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-xl focus:outline-none"
          >
            &#9776;
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden flex flex-col items-center bg-gray-100 absolute px-20 top-10 border rounded-xl right-20 py-4">
          <Link to="/create" className="text-sm my-2 border-b">
            Create Event
          </Link>
          <Link to="/login" className="text-sm my-2">
            Login / Register
          </Link>
        </div>
      )}
    </>
  );
};

export default LoginNavbar;
