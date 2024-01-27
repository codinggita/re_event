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
  const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 1000));
  return (
    <div className="w-full   mt-[5%] absolute h-[100vh] bg-[#1e1f20]/90  backdrop-blur-lg">
      <div className="div  flex items-center flex-col justify-center">
        <div className=" flex flex-col gap-3">
          <h1 className=" mt-5 text-2xl">Register Your Self</h1>
          <div className="flex items-center  gap-2">
            <img
              src="https://cdn.motor1.com/images/mgl/g440ng/s3/rimac-nevera.jpg"
              alt="car"
              className="w-10 h-10 object-cover rounded-full"
            />
            <div>
              <h1 className="text-xl">Rimac Nevera</h1>
              <h2 className="text-sm text-white/50">shivatadigadapa@gmail.com</h2>
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
          <div className=" flex  justify-center gap-1  mt-5  flex-col"
            onClick={() => {
              
toast.promise(promise, {
  loading: 'Loading...',
  success: (data) => {
    return `Registered for the event successfully`;
  },
  error: 'Error',
});
              setRegisterClick(!RegisterClick); 
            }}
            >
            <button className="w-[25rem] rounded-lg  select-none border-none active:border-zinc-600 p-2
              bg-white text-black/90 ">Request to register</button>
               </div>
          </div>

        </div>

      </div>
      <FaXmark className="bg-[#1e1f20] hover:cursor-pointer  text-3xl absolute top-0 right-0  mt-5 mr-5  "
      onClick={() => setRegisterClick(!RegisterClick)}/>
    </div>
  );
};

const EventPage = () => {
  const { RegisterClick, setRegisterClick } = useMainDashContext();
  const { id } = useParams();

  return (
    <>
      <div className="w-full mt-10 flex items-center justify-center p-10">
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
