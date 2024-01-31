import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/EventPage/Banner";
import Location from "../components/EventPage/Location";
import HostDetails from "../components/EventPage/HostDetails";
import AboutComponent from "../components/EventPage/AboutComponent";
import RegisterComponent from "../components/EventPage/RegisterComponent";
import { useMainDashContext } from "../context/AppContext";
import { FaXmark } from "react-icons/fa6";
import { toast, Toaster } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";

// export const RegisterQuestionComponent = (props) => {
//   const { id } = props;
//   const { questions } = props;
//   const cookie = Cookies.get("user");
//   const user = JSON.parse(cookie);
//   const _uid = user.decodedjwt.userId;
//   const _umail = user.decodedjwt.email;
//   const modifiedEmail = _umail.split("@")[0];

//   // console.log(questions);
//   const { RegisterClick, setRegisterClick } = useMainDashContext();

//   const { newevent, setNewEvent } = useMainDashContext();
//   const eventcode = id;

//   return (

//   );
// };

const EventPage = () => {
  const { RegisterClick, setRegisterClick } = useMainDashContext();
  const [event, setEvent] = useState({});
  const [questions, setQuestions] = useState([]);
  const [qrHash, setQrHash] = useState("");
  const { id } = useParams();
  const cookie = Cookies.get("user");
  console.log(cookie);
  const user = JSON.parse(cookie);
  console.log(user.decodedjwt.userId);
  const _id = user.decodedjwt.userId;
  const _umail = user.decodedjwt.email;
  const modifiedEmail = _umail.split("@")[0];
  // console.log(id);

  useEffect(() => {
    const getEvent = async () => {
      try {
        // console.log(id)

        const response = await axios.get(
          `http://localhost:3000/events/geteventbyid/${id}`
        );
        const eventData = response.data;

        setEvent(eventData);
        setQuestions(eventData.questions);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to fetch event");
      }
    };

    getEvent();
  }, [id]);

  const handleApiEventCall = async () => {
    // Show loading toast
    const loadingPromise = toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 500); // Adjust the duration as needed

        // setNewEvent({...newevent, registeredusers: [...newevent.registeredusers, _uid]})
        axios
          .post(`http://localhost:3000/events/neweventAddUser/${id}`, {
            _uid: _id,
            email: _umail,
          })
          .then((response) => {
            if (response.status === 200) {
              resolve("Registered for the event successfully");
            } else if (response.status === 205) {
              reject(new Error("You are already registered for this event"));
            }
            console.log(response,"checking qr hash")
          })
          .catch((error) => {
            reject(error);
          });

        // axios
        //   .post(`http://localhost:3000/events/registerUserForEvent/${id}`, {
        //     userid: _id,
        //     email: _umail,
        //   })
        // .then((response) => {
        //   if (response.status === 200) {
        //     resolve("Registered for the event successfully");
        //   } else if (response.status === 205) {
        //     reject(new Error("You are already registered for this event"));
        //   }
        // })
        // .catch((error) => {
        //   reject(error);
        // });
      }),
      {
        loading: "Loading...",
        success: (data) => {
          return data;
        },
        error: (error) => {
          return error.message || "Error";
        },
        duration: 5000, // Adjust the duration as needed
      }
    );

    try {
      await loadingPromise; // Wait for the promise to resolve or reject
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
    }
  };
  // console.log(event);

  return (
    <>
      <div
        className={
          RegisterClick
            ? `w-full mt-10 flex  items-center justify-center p-10 bg-[#1e1f20]/90  backdrop-blur-lg fixed`
            : `w-full mt-10 flex  items-center justify-center p-10`
        }
      >
        {/* <Toaster /> */}
        <div className="w-full md:w-2/3 ">
          <Banner
            img={event.eventbanner}
            location={event.eventlocation}
            time={event.eventtime}
            date={event.eventdate}
            eventname={event.eventname}
            organiser={event.eventcreatedby}
          />
          <div className="w-full flex flex-col md:flex-row gap-4 py-5">
            <div className="md:w-1/3 w-full flex flex-col gap-4">
              <Location />
              <HostDetails host={event.eventcreatedby} />
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-4">
              <RegisterComponent id={id} _id={_id} />
              <AboutComponent description={event.description} />
            </div>
          </div>
          {/* <RegisterQuestionComponent /> */}
        </div>
      </div>
      {RegisterClick && (
        <div className="w-full absolute h-[100vh] z-[1000] bg-[#1e1f20]/90  backdrop-blur-lg">
          <div className="flex items-center mt-[5%] flex-col justify-center">
            <div className=" flex flex-col gap-3">
              <h1 className=" mt-5 text-2xl">Register Your Self</h1>
              <div className="flex items-center  gap-2">
                <img
                  src="
               https://picsum.photos/200"
                  alt="car"
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div>
                  <h1 className="text-xl">{modifiedEmail}</h1>
                  <h2 className="text-sm text-white/50">{_umail}</h2>
                </div>
              </div>
              <div className="flex flex-col gap-5 mt-5">
                {questions.map((question) => {
                  return (
                    <div className=" flex  justify-center gap-1  flex-col">
                      <h1 className="text-sm ml-2  text-white/80">
                        {question.question}
                      </h1>
                      <input
                        type={question.field}
                        placeholder="Enter your answer here"
                        className="w-[25rem] rounded-lg   select-none border-none active:border-zinc-600 p-3
                bg-[#161719] text-white/80"
                        required={question.required}
                      />
                    </div>
                  );
                })}
                <div
                  className=" flex  justify-center gap-1  mt-5  flex-col"
                  onClick={() => {
                    setRegisterClick(!RegisterClick);
                    handleApiEventCall();
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
      )}
    </>
  );
};

export default EventPage;
