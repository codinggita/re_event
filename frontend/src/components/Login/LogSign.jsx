import React, { useState, useEffect } from "react";
import { FaGoogle, FaChevronLeft } from "react-icons/fa";
import OtpInput from "react-otp-input";
import { RiBox3Fill } from "react-icons/ri";
import { toast } from "sonner";
import axios from "axios";
import { CookiesProvider, useCookies } from "react-cookie";
import Cookies from "js-cookie";
import { useMainDashContext } from "../../context/AppContext";
// import { set } from "mongoose";
// import { set } from "mongoose";

const LogSign = () => {

const{profile, setProfile} = useMainDashContext();

  const [cookies, setCookie] = useCookies(["user"]);
  const [oncontinue, setOncontinue] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  // const [otp2, setOtp2] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmitForm = async (e) => {
    setOncontinue(true);
    e.preventDefault(); // Prevents the default form submission behavior

    // Add your logic here, e.g., send OTP
    try {
      const response = await axios.post('http://localhost:3000/login/send-otp', { email });
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  const handleEmail = (e) => {
    //  e.preventDefault();
    setEmail(e);
    console.log(email)
  }
  useEffect(() => {
    if (otp.length === 5) {
      handleSubmit();
    }
  }, [otp]);

  const handleSubmit = () => {
    console.log(otp);
    // toast.success("Osama bin laden");
  };

  const handleOtpSubmitForm = async () =>{
    try{
      const checker = await axios.post(
        "http://localhost:3000/login/verify-otp",
        { otp, email }
      );
      // console.log(checker.data);
      const token = checker.data.token;
      const user = checker.data.user;

      // Store the token in a cookie with a 1-hour expiry
      Cookies.set("token", [token, user], { expires: 1 / 24 });

      toast.success("Login successful");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "http://localhost:3000/login/me",
        config
      );
      console.log(response.data);
      setCookie("user", response.data, { path: "/" });
      setProfile(response.data);
    }catch (error) {
      setMessage(error.response.data);
    }
  }

  return (
    <>
      <div className="flex w-full h-full items-center absolute bg-black/50 backdrop-blur-md  justify-center">
        <div className=" absolute    backdrop-blur-2xl  shadow-xl border-white/40  border  px-8 py-12  rounded-3xl  bg-[#212325]/80 text-white  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {!oncontinue ? (
            <div className="flex flex-col  items-center justify-between  gap-10 ">
              <div className="flex items-center group justify-center  cursor-default">
                <RiBox3Fill className="text-5xl  transform mr-2 group-hover:rotate-180 transition-all  " />
                <h1 className=" text-5xl">re:</h1>
                <h1 className=" text-5xl  bg-gradient-to-r from-white/50 to-pink-500 text-transparent bg-clip-text">
                  Event
                </h1>
              </div>
              <div className=" flex flex-col  items-center gap-2">
                <h1 className="  text-3xl">Welcome to re:Event</h1>
                <h2 className=" text-md">Please use your email below</h2>
              </div>
              <div className="flex flex-col">
                <h1 className="mb-2 tracking-wider text-sm font-bold">Email</h1>
                <form
                  className="flex flex-col gap-5"
                  onSubmit={handleSubmitForm}
                >
                  <input
                    className="focus:border-1 outline-none bg-transparent border-gray-500 rounded-md pl-4 w-[300px] py-2 border-[1px]"
                    type="text"
                    placeholder="email"
                    onChange={(e) => handleEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-white rounded-md text-black/90 px-10 py-2"
                    // onClick={() => {
                    //   setOncontinue(true);
                    // }}
                  >
                    Continue with Email
                  </button>
                  <hr className="    border-gray-400  " />
                  <button className=" rounded-md flex bg-[#212325] border-white/30 border px-8 py-2 items-center justify-center gap-2">
                    <FaGoogle className="text-gray-200" />
                    <h1 className="    text-gray-200 ">Continue with Google</h1>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-5 ">
                <div
                  className="rounded-xl flex items-center cursor-pointer justify-center -mt-6 border border-gray-500 w-8 h-8"
                  onClick={() => setOncontinue(false)}
                >
                  <FaChevronLeft className="text-lg text-white/60 " />
                </div>
                <h1 className="text-2xl text-white">Enter Code </h1>
                <h1>{otp}</h1>
                <div className="flex flex-col gap-1 mb-5">
                  <h2 className="text-sm text-white/80">
                    Please enter the 5 digit code sent to{" "}
                  </h2>
                  <h3 className="text-sm">shivatadigadapa@gmail.com</h3>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-10">
                <div className="w-full flex items-center justify-center flex-col">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={5}
                    renderSeparator={<div className="ml-5"> </div>}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                      width: "40px",
                      height: "40px",
                      border: "1px",
                      borderRadius: "5px",
                      backgroundColor: "black",
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  />
                  <div className="flex gap-2 mt-4">
                    <button
                      type="submit"
                      // onClick={handleSubmit}
                      className="mt-4 border bg-gray-600 border-gray-500 text-white py-2 px-4 rounded-md shadow-md font-semibold tracking-wider"
                      onClick={handleOtpSubmitForm}
                    >
                      ReSend code
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LogSign;