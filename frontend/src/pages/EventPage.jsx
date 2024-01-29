import React from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/EventPage/Banner";
import Location from "../components/EventPage/Location";
import HostDetails from "../components/EventPage/HostDetails";
import AboutComponent from "../components/EventPage/AboutComponent";
import RegisterComponent from "../components/EventPage/RegisterComponent";
import { useMainDashContext } from "../context/AppContext";
import { FaXmark } from "react-icons/fa6";
import { toast } from "sonner";

export const RegisterQuestionComponent = () => {
  const { RegisterClick, setRegisterClick } = useMainDashContext();
  const promise = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 1000)
    );
  return (
    <div className="w-full   mt-[5%] absolute h-[100vh] bg-[#1e1f20]/90  backdrop-blur-lg">
      <div className="div  flex items-center flex-col justify-center">
        <div className=" flex flex-col gap-3">
          <h1 className=" mt-5 text-2xl">Register Your Self</h1>
          <div className="flex items-center  gap-2">
            <img
              src="data:image/jpeg;base64,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"
              alt="car"
              className="w-10 h-10 object-cover rounded-full"
            />
            <div>
              <h1 className="text-xl">Rimac Nevera</h1>
              <h2 className="text-sm text-white/50">
                shivatadigadapa@gmail.com
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-5">
            <div className=" flex  justify-center gap-1  flex-col">
              <h1 className="text-sm ml-2  text-white/80">Phone Number*</h1>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-[25rem] rounded-lg   select-none border-none active:border-zinc-600 p-3
               bg-[#161719] text-white/80"
              />
            </div>
            <div className=" flex  justify-center gap-1  flex-col">
              <h1 className="text-sm ml-2 text-white/80">Github*</h1>
              <input
                type="text"
                placeholder="Profile Link"
                className="w-[25rem] rounded-lg  select-none border-none active:border-zinc-600 p-3
               bg-[#161719] text-white/80"
              />
            </div>
            <div className=" flex  justify-center gap-1  flex-col">
              <h1 className="text-sm ml-2 text-white/80">LinkedIn*</h1>
              <input
                type="text"
                placeholder="Profile Link"
                className="w-[25rem] rounded-lg  select-none border-none active:border-zinc-600 p-3
               bg-[#161719]/80 text-white/80"
              />
            </div>
            <div
              className=" flex  justify-center gap-1  mt-5  flex-col"
              onClick={() => {
                toast.promise(promise, {
                  loading: "Loading...",
                  success: (data) => {
                    return `Registered for the event successfully`;
                  },
                  error: "Error",
                });
                setRegisterClick(!RegisterClick);
              }}
            >
              <button
                className="w-[25rem] rounded-lg  select-none border-none active:border-zinc-600 p-2
              bg-white text-black/90 "
              >
                Request to register
              </button>
            </div>
          </div>
        </div>
      </div>
      <FaXmark
        className="bg-[#1e1f20] hover:cursor-pointer  text-3xl absolute top-0 right-0  mt-5 mr-5  "
        onClick={() => setRegisterClick(!RegisterClick)}
      />
    </div>
  );
};

const EventPage = () => {
  const { RegisterClick, setRegisterClick } = useMainDashContext();
  const { id } = useParams();

  return (
    <>
      <div
        className={
          RegisterClick
            ? `w-full mt-10 flex  items-center justify-center p-10 bg-[#1e1f20]/90  backdrop-blur-lg fixed`
            : `w-full mt-10 flex  items-center justify-center p-10`
        }
      >
        <div className="w-full md:w-2/3 ">
          <Banner img="https://cdn.motor1.com/images/mgl/g440ng/s3/rimac-nevera.jpg" />
          <div className="w-full flex flex-col md:flex-row gap-4 py-5">
            
            <div className="md:w-1/3 w-full flex flex-col gap-4">
              <Location />

              <HostDetails />
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-4">

              <RegisterComponent />

              <AboutComponent />

            </div>
          </div>
        </div>
      </div>
      {RegisterClick && <RegisterQuestionComponent />}
      {/* <RegisterQuestionComponent /> */}
    </>
  );
};

export default EventPage;
