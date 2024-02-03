import React from "react";
import { toast } from "sonner";
import success from "./success.gif";
import unauthorized from "./unauthorized.gif";
import already from "./already.gif";

const GuestDetailsPopup = ({ guest, onClose }) => {
  console.log(guest);
  console.log(guest.message);
  // const image = guest.matchedUser.approveStatus ? success : guest.message === "Unauthorized" ? unauthorized : already;
  let email, date, time;

  if (guest.message === "Unauthorized") {
    email = "unauthorized";
    date = "unauthorized";
    time = "unauthorized";
  } else {
    const modifiedEmail = guest.matchedUser.email;
    email = modifiedEmail.split("@")[0];

    const formatTime = (dateString) => {
      const date = new Date(dateString);
      const optionsDate = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const optionsTime = {
        hour: "numeric",
        minute: "numeric",
      };

      const formattedDate = date.toLocaleDateString("en-US", optionsDate);
      const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

      return { date: formattedDate, time: formattedTime };
    };

    ({ date, time } = formatTime(guest.matchedUser.registeredDate)); // Corrected line
  }

  // if(guest.message === "Unauthorized"){
  let image;

  if (guest.message === "User checked in") {
    image = success;
  } else if (guest.message === "Unauthorized") {
    image = unauthorized;
  } else if (guest.message === "User already checked in") {
    image = already;
  }

  let mess;
  let statusColor;
  if (guest.message === "User checked in") {
    mess = "Approved";
    statusColor = "bg-green-700";
  } else if (guest.message === "Unauthorized") {
    mess = "Unauthorized";
    statusColor = "bg-red-700";
  } else if (guest.message === "User already checked in") {
    mess = "Already Checked In";
    statusColor = "bg-yellow-700";
  }

  // console.log(email);

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
      <div className="h-screen w-full flex items-center  bg-black/30 backdrop-blur-sm">
        <div className="fixed top-1/2 left-1/2 w-1/4  flex flex-col    transform -translate-x-1/2 -translate-y-1/2 bg-zinc-800 border border-zinc-600 p-5 rounded-2xl shadow-lg">
          <div className="w-full items-center  justify-center  gap-2  flex ">
            <img src={image} alt="success" className="w-1/4 h-1/4" />
            {/* <img
              src="https://picsum.photos/200"
              className="w-7 h-7 rounded-full cursor-pointer border-2 "
            /> */}
            <p className="text-xl text-gray-300">{email}</p>
          </div>
          <hr className="w-full my-4" />

          <div className=" flex flex-col items-center  gap-4 justify-between ">
            <div className="flex w-full  justify-between items-center">
              <h1 className="  text-base">Status </h1>
              <div
                className={` ${statusColor} text-sm  px-2 py-1.5 rounded-lg`}
              >
                <h1>{mess}</h1>
              </div>
            </div>
            <div className=" flex  flex-col w-full  gap-1">
              <div className=" justify-between items-center flex">
                <h1 className="text-base">Time</h1>
                <h1 className=" text-sm">{time}</h1>
              </div>
              <div className=" justify-between items-center flex">
                <h1 className="text-base">Date</h1>
                <h1 className=" text-sm">{date}</h1>
              </div>
            </div>
            <button
              onClick={onClose}
              // onClick={handleCheckin}
              className="mt-4 p-2 w-1/2 bg-zinc-600 rounded-md hover:bg-gray-500"
            >
              Done
            </button>
          </div>

          {/* Close button */}
        </div>
      </div>
    </>
  );
};

export default GuestDetailsPopup;
