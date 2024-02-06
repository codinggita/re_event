import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import arrow from '../assets/arrow.png'

const HeroSection = () => {
  const token = Cookies.get("user");
  return (
    <>
      <div className="w-full flex items-center bg-gradient-to-r from-zinc-900 to-zinc-950 justify-center">
        <div className={
          `w-full max-w-[1600px] items-center lg:py-24 text-white justify-center px-8 lg:px-20 gap-5 md:gap-0 py-10 flex flex-col lg:flex-row`}>
          <div className="flex background-blur-xl bg-zinc-900/50 flex-col gap-4 w-full  h-[40vh] lg:w-1/2 p-2 items-center md:items-start justify-center">
            <h1 className="lg:text-6xl text-4xl font-extrabold flex flex-col">
              Effortlessly{" "}
              <span className="bg-gradient-to-r text-8xl from-amber-500 to-pink-500 text-transparent bg-clip-text">
                Plan your events.
              </span>
            </h1>
            <div className="flex flex-row  items-center gap-4">
              <div className="flex gap-4 items-start">
                <img src={arrow} className="w-24 " />
                <Link
                  to="/create" o
                  className="bg-white px-4 py-2  rounded-2xl text-black shadow-lg hover:scale-105 transition-all"
                >
                  Create Event
                </Link>
              </div>
              {token && (
                <Link
                  to="/dashboard"
                  className="bg-zinc-800 px-4 py-2 border border-zinc-600/60 rounded-2xl text-white shadow-lg hover:scale-105 transition-all"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex w-full lg:w-1/2 flex-col gap-4 lg:p-2">
            <div className="flex gap-3 w-full">
              <div className="w-1/3 rounded-2xl bg-pink-200 p-20"></div>
              <div className="w-2/3 rounded-2xl bg-yellow-200 p-10"></div>
            </div>
            <div className="flex gap-3 w-full">
              <div className="w-2/3 rounded-2xl bg-blue-200 p-10"></div>
              <div className="w-1/3 rounded-2xl bg-emerald-200 p-20"></div>
            </div>
            <div className="flex gap-3 w-full">
              <div className="w-1/4 rounded-2xl bg-purple-200 p-10"></div>
              <div className="w-3/4 rounded-2xl bg-red-200 p-20"></div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default HeroSection;
