import React, { useState, useEffect, useRef } from "react";
import { FaGoogle } from "react-icons/fa";
import OtpInput from "react-otp-input";
import { FaChevronLeft } from "react-icons/fa";
// import { useMainDashContext } from "../../context/AppContext";

const LogSign = () => {
  const [oncontinue, setOncontinue] = useState(false);
  const [otp, setOtp] = useState("");
  // const { openlogin, setOpenlogin } = useMainDashContext();

  return (
    <>
      <div className=" absolute  backdrop-blur-lg   border-white/70  border  px-8 py-12  rounded-xl  bg-black/80 text-white  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {!oncontinue ? (
          <div className="flex flex-col  items-center justify-between  gap-10 ">
            {/* <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="logo"
              className="w-1/2 invert  mx-auto"
            /> */}
            <h1 className=" text-5xl">re:Event</h1>
            <div className=" flex flex-col  items-center gap-2">
              <h1 className="  text-3xl">Welcome to re:Event</h1>
              <h2 className=" text-md">Please use your email below</h2>
            </div>
            <div className="flex flex-col">
              <h1 className=" mb-2  tracking-wider text-sm font-bold">Email</h1>
              <form className=" flex flex-col gap-5">
                <input
                  className=" focus:border-1 outline-none bg-transparent   border-gray-500  rounded-md pl-4 w-[300px]   py-2  border-[1px] "
                  type="text"
                  placeholder="email"
                />
                <button
                  className="bg-white rounded-md text-black/90 px-10 py-2"
                  onClick={() => setOncontinue(true)}
                >
                  Continue with Email
                </button>
                <hr className="    border-gray-400  " />
                <div className=" rounded-md flex bg-gray-700 px-8 py-2 items-center justify-center gap-2">
                  <FaGoogle className="text-gray-200" />
                  <button className="    text-gray-200 ">
                    Continue with Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className=" flex flex-col gap-5  ">
              <div
                className="rounded-xl  flex items-center cursor-pointer justify-center -mt-6 border  border-gray-500 w-8 h-8"
                onClick={() => setOncontinue(false)}
              >
                <FaChevronLeft className="  text-lg  text-white/60 " />
              </div>

              <h1 className="text-2xl  text-white">Enter Code </h1>
              <h1>{otp}</h1>
              <div className=" flex flex-col gap-1 mb-5">
                <h2 className=" text-sm text-white/80">
                  please enter the 5 digit code sent to{" "}
                </h2>
                <h3 className="text-sm">shivatadigadapa@gmail.com</h3>
              </div>
            </div>
            <div className="flex flex-col    items-center justify-center gap-10">
              <form className="w-full flex items-center justify-center flex-col">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={5}
                  renderSeparator={<div className="ml-5"> </div>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: "40px",
                    height: "40px",
                    // outline:"none",
                    border: "1px",
                    borderRadius: "5px",
                    backgroundColor: "black",
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                />
                <button
                  type="submit"
                  className="mt-4 border bg-gray-600  border-gray-500 text-white py-2 px-4 rounded-md shadow-md font-semibold tracking-wider"
                >
                  ReSend code
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LogSign;
