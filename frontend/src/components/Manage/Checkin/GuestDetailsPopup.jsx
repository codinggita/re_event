import React from "react";
import { toast } from "sonner";
import success from "./success.gif";

const GuestDetailsPopup = ({ guest, onClose }) => {
  console.log(guest);
  const modifiedEmail = guest.matchedUser.email;
  const email = modifiedEmail.split("@")[0];
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const time = formatTime(guest.matchedUser.registeredDate);
  console.log(email);

  const promise = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 1000)
    );
  const handleCheckin = () => {
    onClose();

    toast.promise(promise, {
      loading: "Checking in...",
      success: (data) => `Successfully checked in 🥳`,
      error: "Something went wrong",
    });
  };
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="fixed top-1/2 left-1/2 w-1/4 items-center flex flex-col  justify-center transform -translate-x-1/2 -translate-y-1/2 bg-zinc-800 border border-zinc-600 p-5 rounded-2xl shadow-lg">
          <div className="w-full items-center  justify-center  gap-2  flex ">
            <img src={success} alt="success" className="w-1/4 h-1/4" />
            {/* <img
              src="https://picsum.photos/200"
              className="w-7 h-7 rounded-full cursor-pointer border-2 "
            /> */}
            <p className="text-xl text-gray-300">{email}</p>
          </div>
          <hr className="w-full my-4" />
          <div className="flex px-3 py-5 justify-between w-full">
            <div className="flex flex-col items-start">
              <p className="text-md">Registered</p>
              <p className="text-xs">Check-in Time: {time}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-md">Status</p>
              <p className="text-xs py-0.5 px-2 bg-green-500/40 text-green-600 rounded-xl">
                Approved
              </p>
            </div>
          </div>

          {/* Close button */}
          <div className="gap-2  w-full">
            <button
              onClick={onClose}
              // onClick={handleCheckin}
              className="mt-4 p-2 w-1/2 bg-zinc-600 rounded-md hover:bg-gray-500"
            >
              Done
            </button>
            {/* <button
             
              className="mt-4 p-2 w-1/2 bg-green-600 rounded-md hover:bg-green-700"
            >
              Check-in
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestDetailsPopup;
