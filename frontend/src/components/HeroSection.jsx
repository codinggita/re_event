import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import arrow from '../assets/arrow.png';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const token = Cookies.get("user");
  return (
    <>
      <div className="w-full flex items-center bg-gradient-to-r from-zinc-900 to-zinc-950 justify-center">

        <div className={
          `w-full max-w-[1600px] items-center lg:py-24 text-white justify-center px-8 lg:px-20 gap-5 md:gap-0 py-10 flex flex-col `}>
          <div className="w-full flex items-center lg:pt-12 flex-col md:flex-row">
            <div className="flex flex-col gap-4 w-full  h-[40vh] lg:w-1/2 p-2 items-center md:items-start justify-center">
              <h1 className="lg:text-8xl herofont text-4xl font-extrabold flex flex-col">
                Effortlessly{" "}
                <span className="bg-gradient-to-r text-9xl from-amber-400 to-pink-500 text-transparent bg-clip-text">
                  Plan your Events.
                </span>
              </h1>
              <div className="flex flex-row  items-start gap-4">
                <div className="flex gap-4 items-start">
                  <img src={arrow} className="w-24 " />
                  <Link
                    to={token ? "/create-event" : "/"}
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
            <motion.div className="flex w-full lg:w-1/2 flex-col gap-4 lg:p-2"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex gap-3 w-full">
                <div className="w-1/3 rounded-2xl bg-pink-200 hover:bg-pink-600 transition-all cursor-pointer hover:scale-95 p-20"></div>
                <div className="w-2/3 rounded-2xl bg-yellow-200 hover:bg-yellow-600 transition-all cursor-pointer hover:scale-95 p-10"></div>
              </div>
              <div className="flex gap-3 w-full">
                <div className="w-2/3 rounded-2xl bg-blue-200 hover:bg-blue-600 transition-all cursor-pointer hover:scale-95 p-10"></div>
                <div className="w-1/3 rounded-2xl bg-emerald-200 hover:bg-emerald-600 transition-all cursor-pointer hover:scale-95 p-20"></div>
              </div>
              <div className="flex gap-3 w-full">
                <div className="w-1/4 rounded-2xl bg-purple-200 hover:bg-purple-600 transition-all cursor-pointer hover:scale-95 p-10"></div>
                <div className="w-3/4 rounded-2xl bg-red-200 hover:bg-red-600 transition-all cursor-pointer hover:scale-95 p-20"></div>
              </div>
            </motion.div>
          </div>



          <div className="w-full flex flex-col md:flex-row rounded-[3rem] gap-5 my-12">
            <motion.div className="w-full bg-zinc-800 border border-zinc-400/40 p-20 relative rounded-3xl group shadow-xl shadow-zinc-600/20 text-white"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
            >
              <h1 className="text-4xl herofont z-[5]">Okay</h1>
              {/* <img src="https://themeim.com/demo/softim/assets/images/element/element-69.png" className="w-1/2 absolute bottom-0 left-0 hidden group-hover:flex transition-all rounded-b-3xl " />
              <img src="https://themeim.com/demo/softim/assets/images/element/element-69.png" className="w-1/2 absolute top-0 right-0 hidden group-hover:flex transition-all rotate-180 rounded-b-3xl " /> */}
            </motion.div>
            <motion.div className="w-full bg-zinc-300 border border-zinc-800/40 shadow-xl shadow-zinc-300/20 p-20 rounded-3xl"
             initial={{ opacity: 0, y: 100 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}>
              okayyyy
            </motion.div>
            <motion.div className="w-full lg:w-1/3 bg-slate-300 p-20 rounded-3xl"
             initial={{ opacity: 0, y: 100 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.4 }}>
              okayyyy
            </motion.div>
          </div>
        </div>
      </div>

    </>
  );
};

export default HeroSection;

