import React, { useState, useEffect } from "react";
import EventCard from "../components/Dashboard/EventCard";
import axios from "axios";
import { toast } from "sonner";


const Explore = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await axios.get('https://re-event-backend.onrender.com/events/getevents');
        setEvents(response.data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to fetch events');
      }
    };
    getAllEvents();
  }, []);


  return (
    <div className="mt-[6%]  items-center flex flex-col ml-[10%]   ">
      <div className=" flex w-3/5  flex-col justify-center">
        <div className=" flex  flex-col gap-3">
          <h1 className=" text-4xl ">Explore Events</h1>
          <p className=" text-white/70">
            Every week, we feature some of our favorite events in cities like
            San Francisco and New York. In addition, you can check out and
            subscribe to some great calendars from the community.
          </p>
        </div>
        <div className="mt-[3%]">
          <h1 className="text-xl"> Popular Events</h1>
          <div className=" flex flex-col   justify-between gap-10">
            <div className=" flex gap-[10rem]   flex-row ">
              <div className=" bg-purple-600/50 mr-10 hover:z-50   rounded-full group w-[10rem] ">
                <div className=" bg-[#323436]/50 flex    flex-col     gap-3   border border-white/10  transition-all px-6 py-2 cursor-pointer hover:border-white/20 backdrop-blur-3xl w-[18rem]  rounded-lg">
                  <div className="flex  justify-between items-center">
                    <img
                      src="https://image.tmdb.org/t/p/original/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg"
                      alt=""
                      className="w-12  opacity-75 -z-10 h-12 rounded-lg object-cover    "
                    />

                    <div className="  w-20 flex items-center  justify-center rounded-xl    text-center h-8 bg-zinc-900 ">
                      Open
                    </div>
                  </div>
                  <div>
                    <h1 className=" text-xl ">
                      Check the latest ai thing.....
                    </h1>
                    <p className=" text-white/40 text-sm">
                      in person do somethibng that is useful things that very
                      useful...
                    </p>
                  </div>
                </div>
              </div>
              <div className=" bg-orange-600/50 mr-10 hover:z-50    rounded-full group w-[10rem] ">
                <div className=" bg-[#323436]/50 flex    flex-col     gap-3   border border-white/10  transition-all px-6 py-2 cursor-pointer hover:border-white/20 backdrop-blur-3xl w-[18rem]  rounded-lg">
                  <div className="flex  justify-between items-center">
                    <img
                      src="https://image.tmdb.org/t/p/original/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg"
                      alt=""
                      className="w-12  opacity-75 -z-10 h-12 rounded-lg object-cover    "
                    />

                    <div className="  w-20 flex items-center  justify-center rounded-xl    text-center h-8 bg-zinc-900 ">
                      Open
                    </div>
                  </div>
                  <div>
                    <h1 className=" text-xl ">
                      Check the latest ai thing.....
                    </h1>
                    <p className=" text-white/40 text-sm">
                      in person do somethibng that is useful things that very
                      useful...
                    </p>
                  </div>
                </div>
              </div>
              <div className="mr-10 bg-[#eb4999]/40 hover:z-50    rounded-full group w-[10rem] ">
                <div className=" bg-[#323436]/50 flex    flex-col     gap-3   border border-white/10  transition-all px-6 py-2 cursor-pointer hover:border-white/20 backdrop-blur-3xl w-[18rem]  rounded-lg">
                  <div className="flex  justify-between items-center">
                    <img
                      src="https://image.tmdb.org/t/p/original/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg"
                      alt=""
                      className="w-12  opacity-75 -z-10 h-12 rounded-lg object-cover    "
                    />

                    <div className="  w-20 flex items-center  justify-center rounded-xl    text-center h-8 bg-zinc-900 ">
                      Open
                    </div>
                  </div>
                  <div>
                    <h1 className=" text-xl ">
                      Check the latest ai thing.....
                    </h1>
                    <p className=" text-white/40 text-sm">
                      in person do somethibng that is useful things that very
                      useful...
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex gap-[10rem]  flex-row ">
              <div className=" bg-green-600/30 mr-10  rounded-full group w-[10rem] ">
                <div className=" bg-[#323436]/50 flex    flex-col     gap-3   border border-white/10  transition-all px-6 py-2 cursor-pointer hover:border-white/20 backdrop-blur-3xl w-[18rem]  rounded-lg">
                  <div className="flex  justify-between items-center">
                    <img
                      src="https://image.tmdb.org/t/p/original/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg"
                      alt=""
                      className="w-12  opacity-75 -z-10 h-12 rounded-lg object-cover    "
                    />

                    <div className="  w-20 flex items-center  justify-center rounded-xl    text-center h-8 bg-zinc-900 ">
                      Open
                    </div>
                  </div>
                  <div>
                    <h1 className=" text-xl ">
                      Check the latest ai thing.....
                    </h1>
                    <p className=" text-white/40 text-sm">
                      in person do somethibng that is useful things that very
                      useful...
                    </p>
                  </div>
                </div>
              </div>
              <div className=" bg-white/30 mr-10  rounded-full group w-[10rem] ">
                <div className=" bg-[#323436]/50 flex    flex-col     gap-3   border border-white/10  transition-all px-6 py-2 cursor-pointer hover:border-white/20 backdrop-blur-3xl w-[18rem]  rounded-lg">
                  <div className="flex  justify-between items-center">
                    <img
                      src="https://image.tmdb.org/t/p/original/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg"
                      alt=""
                      className="w-12  opacity-75 -z-10 h-12 rounded-lg object-cover    "
                    />

                    <div className="  w-20 flex items-center  justify-center rounded-xl    text-center h-8 bg-zinc-900 ">
                      Open
                    </div>
                  </div>
                  <div>
                    <h1 className=" text-xl ">
                      Check the latest ai thing.....
                    </h1>
                    <p className=" text-white/40 text-sm">
                      in person do somethibng that is useful things that very
                      useful...
                    </p>
                  </div>
                </div>
              </div>
              <div className=" bg-red-400 mr-10  rounded-full group w-[10rem] ">
                <div className=" bg-[#323436]/50 flex    flex-col     gap-3   border border-white/10  transition-all px-6 py-2 cursor-pointer hover:border-white/20 backdrop-blur-3xl w-[18rem]  rounded-lg">
                  <div className="flex  justify-between items-center">
                    <img
                      src="https://image.tmdb.org/t/p/original/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg"
                      alt=""
                      className="w-12  opacity-75 -z-10 h-12 rounded-lg object-cover    "
                    />

                    <div className="  w-20 flex items-center  justify-center rounded-xl    text-center h-8 bg-zinc-900 ">
                      Open
                    </div>
                  </div>
                  <div>
                    <h1 className=" text-xl ">
                      Check the latest ai thing.....
                    </h1>
                    <p className=" text-white/40 text-sm">
                      in person do somethibng that is useful things that very
                      useful...
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex gap-[10rem]  flex-row ">
              <div className=" bg-green-600/30 mr-10  rounded-full group w-[10rem] ">
                <div className=" bg-[#323436]/50 flex    flex-col     gap-3   border border-white/10  transition-all px-6 py-2 cursor-pointer hover:border-white/20 backdrop-blur-3xl w-[18rem]  rounded-lg">
                  <div className="flex  justify-between items-center">
                    <img
                      src="https://image.tmdb.org/t/p/original/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg"
                      alt=""
                      className="w-12  opacity-75 -z-10 h-12 rounded-lg object-cover    "
                    />

                    <div className="  w-20 flex items-center  justify-center rounded-xl    text-center h-8 bg-zinc-900 ">
                      Open
                    </div>
                  </div>
                  <div>
                    <h1 className=" text-xl ">
                      Check the latest ai thing.....
                    </h1>
                    <p className=" text-white/40 text-sm">
                      in person do somethibng that is useful things that very
                      useful...
                    </p>
                  </div>
                </div>
              </div>
              <div className=" bg-white/30 mr-10  rounded-full group w-[10rem] ">
                <div className=" bg-[#323436]/50 flex    flex-col     gap-3   border border-white/10  transition-all px-6 py-2 cursor-pointer hover:border-white/20 backdrop-blur-3xl w-[18rem]  rounded-lg">
                  <div className="flex  justify-between items-center">
                    <img
                      src="https://image.tmdb.org/t/p/original/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg"
                      alt=""
                      className="w-12  opacity-75 -z-10 h-12 rounded-lg object-cover    "
                    />

                    <div className="  w-20 flex items-center  justify-center rounded-xl    text-center h-8 bg-zinc-900 ">
                      Open
                    </div>
                  </div>
                  <div>
                    <h1 className=" text-xl ">
                      Check the latest ai thing.....
                    </h1>
                    <p className=" text-white/40 text-sm">
                      in person do somethibng that is useful things that very
                      useful...
                    </p>
                  </div>
                </div>
              </div>
              <div className=" bg-red-400 mr-10  rounded-full group w-[10rem] ">
                <div className=" bg-[#323436]/50 flex    flex-col     gap-3   border border-white/10  transition-all px-6 py-2 cursor-pointer hover:border-white/20 backdrop-blur-3xl w-[18rem]  rounded-lg">
                  <div className="flex  justify-between items-center">
                    <img
                      src="https://image.tmdb.org/t/p/original/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg"
                      alt=""
                      className="w-12  opacity-75 -z-10 h-12 rounded-lg object-cover    "
                    />

                    <div className="  w-20 flex items-center  justify-center rounded-xl    text-center h-8 bg-zinc-900 ">
                      Open
                    </div>
                  </div>
                  <div>
                    <h1 className=" text-xl ">
                      Check the latest ai thing.....
                    </h1>
                    <p className=" text-white/40 text-sm">
                      in person do somethibng that is useful things that very
                      useful...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-3/4">

        {events.length === 0 ? (
          <>
            <h1>No events ma :(</h1>
          </>
        ) : (
          <div className="flex flex-col md:flex-row py-8 px-4">
            <div className="w-full md:w-1/4 flex items-start p-4">
              <div className="flex flex-row items-center gap-2">
                <span className='p-2 border rounded-full'></span>
                29th Feb, 2024
              </div>
            </div>
            <div className="w-full md:w-3/4 flex flex-col gap-4">
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
