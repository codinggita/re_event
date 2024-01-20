import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <>
        <div className="w-full h-[100%]  items-center justify-center px-8 lg:px-20 gap-5 md:gap-0 py-10 lg:py-36 flex flex-col lg:flex-row">
            <div className="flex flex-col gap-4 w-full lg:w-1/2 p-2 items-start">
                <h1 className="lg:text-8xl text-4xl font-extrabold flex flex-col">
                    Effortlessly <span className='bg-gradient-to-r from-amber-500 to-pink-500 text-transparent bg-clip-text'>Plan your events.</span>
                </h1>
                <Link to="/create" className='bg-black px-4 py-2 mx-4 rounded-2xl text-white shadow-lg hover:scale-105 transition-all'>Create Event</Link>
            </div>
            <div className="flex w-full lg:w-1/2 flex-col gap-4 lg:p-2">
                <div className="flex gap-3 w-full">
                    <div className="w-1/3 rounded-2xl bg-pink-100 p-20"></div>
                    <div className="w-2/3 rounded-2xl bg-yellow-100 p-10"></div>
                </div>
                <div className="flex gap-3 w-full">
                    <div className="w-2/3 rounded-2xl bg-blue-100 p-10"></div>
                    <div className="w-1/3 rounded-2xl bg-emerald-100 p-20"></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HeroSection