import React, { useState, useEffect } from "react";
import { useMainDashContext } from "../context/AppContext";
import PastEvents from "../components/Dashboard/PastEvents";
import UpcomingEvents from "../components/Dashboard/UpcomingEvents";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
// import { set } from "mongoose";

const components = {
  upcoming: UpcomingEvents,
  past: PastEvents,
};

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

const Dashboard = () => {
  const { activeTab, setActiveTab, askuserName, setAskuserName } = useMainDashContext();
  const ActiveComponent = components[activeTab] || null;
  const [username, setUsername] = useState("");

 
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/events/getevents"
        );
        setEvents(response.data);
        separateEvents(response.data);
        setAskuserName(true);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to fetch events");
      }
    };

    getAllEvents();
  }, []);


  const separateEvents = (events) => {
    const today = new Date();

    const upcoming = events.filter(
      (event) => new Date(event.eventdate) > today
    );
    const past = events.filter((event) => new Date(event.eventdate) <= today);

    setUpcomingEvents(upcoming);
    setPastEvents(past);
  };

  const groupEventsByDate = (events) => {
    const groupedEvents = {};

    events.forEach((event) => {
      const date = formatDate(event.eventdate);
      if (!groupedEvents[date]) {
        groupedEvents[date] = [event];
      } else {
        groupedEvents[date].push(event);
      }
    });

    return groupedEvents;
  };

  const sortEventsByDate = (groupedEvents) => {
    const sortedDates = Object.keys(groupedEvents).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    });

    const sortedEvents = {};
    sortedDates.forEach((date) => {
      sortedEvents[date] = groupedEvents[date];
    });

    return sortedEvents;
  };

  
  const handleEmail = (e) => {
    setUsername(e);
  };
  const handleUserName = async () => {
    try {
      const userRaw = Cookies.get("user");
      const user = JSON.parse(userRaw);
      const uid = user?.decodedjwt?.userId;
      const token = Cookies.get("token");

      // Make sure username is not empty before sending the request
      if (!username) {
        console.error("Username cannot be empty");
        return;
      }

      // Send the request to set the username
      const response = await axios.post("http://localhost:3000/login/setusername", { username, uid });

      if (response.data.success) {
        const updatedResponse = await axios.get("http://localhost:3000/login/me2", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(updatedResponse.data);

        // Optionally update the UI with the updated user data
        // setCookie("user2", updatedResponse.data.decodedjwt, { path: "/" });
        Cookies.set("user3", updatedResponse, { expires: 1 / 24 });
        // setProfile(updatedResponse.data);
      } else {
        console.error("Failed to set username");
      }
    } catch (error) {
      console.error("Error while setting username:", error.message);
    }
  };
  const groupedUpcomingEvents = groupEventsByDate(upcomingEvents);
  const sortedUpcomingEvents = sortEventsByDate(groupedUpcomingEvents);
  const groupedPastEvents = groupEventsByDate(pastEvents);
  const sortedPastEvents = sortEventsByDate(groupedPastEvents);
  return (
    <>
      {/* <div className="w-full flex flex-col items-center justify-center">
        <div className="max-w-[1600px] flex flex-col items-center justify-center"> */}
      <div className="w-full mt-20 px-10 text-white flex items-center justify-center">
        <div className="w-full md:w-2/3 flex justify-between">
          <h1 className="text-3xl font-bold">Events</h1>
          <div className="flex gap-4 bg-zinc-100 p-1 rounded-lg border items-center">
            <button
              className={`${
                activeTab === "upcoming"
                  ? "bg-black shadow-lg text-white hover:bg-black"
                  : "bg-gray-100 text-black hover:bg-black/80"
              } rounded-lg hover:scale-105 hover:text-white px-3 py-1.5 transition-all`}
              onClick={() => handleTabClick("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`${
                activeTab === "past"
                  ? "bg-black shadow-lg text-white hover:bg-black"
                  : "bg-gray-100 text-black hover:bg-black/80"
              } rounded-lg hover:scale-105 px-8 hover:text-white py-1.5 transition-all`}
              onClick={() => handleTabClick("past")}
            >
              Past
            </button>
          </div>
        </div>
      </div>

      {ActiveComponent && (
        <ActiveComponent
          upcomingEvents={upcomingEvents}
          pastEvents={pastEvents}
        />
      )}
      {askuserName &&
      <>
        <div className="flex w-full h-full items-center absolute bg-black/50 backdrop-blur-md  justify-center">
          <div className=" absolute    backdrop-blur-2xl  shadow-xl border-white/40  border  px-8 py-12  rounded-3xl  bg-[#212325]/80 text-white  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col  items-center justify-between  gap-10 ">
              <div className="flex items-center group justify-center  cursor-default">
                {/* <RiBox3Fill className="text-5xl  transform mr-2 group-hover:rotate-180 transition-all  " /> */}
                <h1 className=" text-5xl">re:</h1>
                <h1 className=" text-5xl  bg-gradient-to-r from-white/50 to-pink-500 text-transparent bg-clip-text">
                  Event
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="mb-2 tracking-wider text-sm font-bold">
                  Enter your User Name
                </h1>
                <div
                  className="flex flex-col gap-5"
                  //  onSubmit={handleSubmitForm}
                >
                  <input
                    className="focus:border-1 outline-none bg-transparent border-gray-500 rounded-md pl-4 w-[300px] py-2 border-[1px]"
                    type="text"
                    placeholder="email"
                    onChange={(e) => handleEmail(e.target.value)}
                    required
                  />
                  <button
                    className="bg-white rounded-md text-black/90 px-10 py-2"
                    onClick={(e) => {
                      // setOncontinue(true);
                      handleUserName();
                    }}
                  >
                    Continue with this username
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      }
    </>
  );
};

export default Dashboard;
