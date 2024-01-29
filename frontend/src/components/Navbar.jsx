import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiBox3Fill } from "react-icons/ri";
import { useMainDashContext } from "./../context/AppContext";


const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { openlogin, setOpenlogin } = useMainDashContext();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  const handleLoginClick = () => {
    setOpenlogin(!openlogin);
  };

  return (
    <>

      <div className="w-full z-[1000]  flex fixed bg-zinc-900/80 items-center backdrop-blur-2xl justify-between px-12 py-4 border-b border-gray-600 text-white">

      {/* <div className="w-full z-50 flex fixed bg-zinc-900/80 items-center justify-between px-12 py-4 border-b border-gray-600 text-white"> */}

        <div className="flex gap-5">
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
          <Link to="/explore" className="text px-4 py-1 hover:text-black hover:bg-zinc-300 cursor-pointer rounded-xl transition-all">Explore</Link>
        </div>
        <div className="hidden md:flex gap-4">
          <Link
            to="/create"
            className="text-sm bg-gray-100 rounded-xl shadow text-black px-4 py-1.5 hover:scale-105 hover:bg-black/80 hover:text-white border transition-all cursor-pointer"
          >
            Create Event
          </Link>
          <button
            className="text-sm bg-black rounded-xl shadow-lg text-white px-4 py-1.5 hover:scale-105 hover:bg-black/80 transition-all cursor-pointer"
            onClick={handleLoginClick}
         >
            Login / Register
          </button>
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

export default Navbar;
