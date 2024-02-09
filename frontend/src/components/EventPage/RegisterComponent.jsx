// import React, { useState, useEffect } from "react";
// import { IoTicketOutline } from "react-icons/io5";
// import { toast } from "sonner";
// import Cookies from "js-cookie";
// import { useMainDashContext } from "../../context/AppContext";
// import axios from "axios";

// const RegisterComponent = (props) => {
//   // const [registerCheck, setRegisterCheck] = useState(false);
//   // const [loading, setLoading] = useState(true);

//   const { id, _id } = props;
//   const cookie = Cookies.get("user");
//   const user = JSON.parse(cookie);
//   const _uid = user?.decodedjwt?.userId;
//   const _umail = user?.decodedjwt?.email;

//   const { RegisterClick, setRegisterClick } = useMainDashContext();

//   const userData = {
//     _uid: _uid,
//     email: _umail,
//   };

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       console.log(userData);
//   //       const response = await axios.get(
//   //         `https://re-event-backend.onrender.com/events/checkuserev/${id}/${_id}`
//   //       );

//   //       if (response.status === 205) {
//   //         setRegisterCheck(true);
//   //         console.log("You are already registered for this event");
//   //       }
//   //       else if (response.status === 200) {
//   //         setRegisterCheck(false);
//   //         console.log("You are not registered for this event");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error checking user registration:", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchData();
//   // }, [_umail, _uid]);

//   // const handleSubmit = () => {
//   //   setRegisterClick(!RegisterClick);
//   //   window.scrollTo({
//   //     top: 0,
//   //     behavior: "smooth",
//   //   });
//   // };

//   return (
//     <>
//       {/* <div className="w-full flex flex-col items-center rounded-2xl bg-zinc-800 border border-zinc-700">
//         <h1 className="text-lg font-medium flex items-center gap-2 bg-zinc-700 py-2 w-full rounded-t-2xl px-4">
//           <IoTicketOutline /> Register for the event
//         </h1>
//         <div className="w-full px-8 py-4">
//           <h1 className="text-gray-200/80 items-center flex flex-row gap-2">
//             <span className="p-4 bg-red-300 rounded-full"></span>
//             <span className="flex flex-col">
//               You are signed in as{" "}
//               <span className="font-semibold">
//                 <span className="text-white/80"> {_umail} </span>
//               </span>
//             </span>
//           </h1>
//         </div>
//         <hr className="w-[95%] opacity-50 bg-yellow-200" />
//         <div className="w-full items-center flex justify-center px-8 py-4">
//           {loading ? (
//             <div>Loading...</div>
//           ) : registerCheck ? (
//             <button className="bg-zinc-100 rounded-lg text-lg py-2 font-semibold tracking-wide hover:scale-105 transition-all shadow-lg shadow-zinc-100/10 w-[100%] text-black/80">
//               Download Your RSVP
//             </button>
//           ) : (
//             <button
//               className="bg-zinc-100 rounded-lg text-lg py-2 font-semibold tracking-wide hover:scale-105 transition-all shadow-lg shadow-zinc-100/10 w-[100%] text-black/80"
//               onClick={handleSubmit}
//             >
//               Click to Register
//             </button>
//           )}
//         </div>
//       </div> */}
//     </>
//   );
// };

// export default RegisterComponent;
