import React, { useState, Suspense, lazy } from "react";
import { FaImages } from "react-icons/fa6";
// const {FaImages} = lazy(() => import("react-icons/fa6"));
import { FaGlobeAmericas } from "react-icons/fa";
import { MdOutlineComputer } from "react-icons/md";
import { IoIosVideocam } from "react-icons/io";
import { useMainDashContext } from "../context/AppContext";
import EventUtil from "../components/CreateNew/EventUtil";
import Zoom from "../components/CreateNew/utils/Zoom";
import Virtual from "../components/CreateNew/utils/Virtual";
import InPerson from "../components/CreateNew/utils/InPerson";
import DateTime from "../components/CreateNew/utils/DateTime";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RiBox3Fill } from "react-icons/ri";
import ImageKit from "imagekit";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";

const CreateNew = (props) => {
  const navigate = useNavigate();
  const imgID = nanoid(10);
  const { activemenuItem, setActivemenuItem } = useMainDashContext();
  const { newevent, setNewEvent } = useMainDashContext();
  const { width, saveName, mt } = props;
  const imagekit = new ImageKit({
    publicKey: "public_2rLWcPMCq/TpjA/J9rqwkH8YLNU=",
    privateKey: "private_cz09upy0twlhYcqaCnHidFizWKo=",
    urlEndpoint: "https://ik.imagekit.io/vsnlabs",
    transformationPosition: "path",
    authenticationEndpoint: "http://localhost:5000/imagekit",
  });
  // console.log("newevent", newevent);
  const email = Cookies.get("user");
  const user = JSON.parse(email);
  const email1 = user?.decodedjwt?.email;
  // console.log(email1)

  const changeBackground = (imageUrl) => {
    const bgElement = document.getElementById("heroSection");
    if (bgElement) {
      bgElement.style.backgroundImage = `url(${imageUrl})`;
    }
  };

  const handleImage = async (event) => {
    event.preventDefault();
    console.log("ok");
    const file = event.target.files[0];

    try {
      const response = await imagekit.upload({
        file: file,
        fileName: imgID,
        folder: "/banner/",
      });

      const imageUrl = response.url;
      setNewEvent({ ...newevent, eventbanner: imageUrl });
      console.log("Image URL:", imageUrl);
      changeBackground(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/events/newevent",
        {
          ...newevent,
          eventcreatedby: email1,
        }
      );
      console.log(response);
      console.log("Event created:", response.data);
      toast.success("Event created successfully");
      console.log(response.data);
      addEventToCreatorUser(email1, response.data.eventcode);
      navigate(`/manage/${response.data.eventcode}`);

      setNewEvent({
        eventname: "",
        eventdate: "",
        eventtime: "",
        eventbanner: "",
        description: "",
        eventlocation: "",
        eventcreatedby: "",
        eventtype: "online",
        registrationstatus: "open",
        eventstatus: "upcoming",
        eventurl: "",
        eventticketprice: "",
        visibility: "",
        questions: [],
        registeredusers: [],
      });
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event");
    }
  };

  const addEventToCreatorUser = async (creatorId, eventcode) => {
    try {
      await axios.post("http://localhost:3000/events/addeventtocreatoruser", {
        creatorId,
        eventcode,
      });
      console.log("Event added to the creator user successfully");
    } catch (error) {
      console.error("Error adding event to creator user:", error);
    }
  };

  const handleChange = (field, value) => {
    setNewEvent({
      ...newevent,
      [field]: value,
    });
  };

  const [currentTheme, setCurrentTheme] = useState({
    fromColor: "white/50",
    toColor: "pink-500",
  });

  const changeTheme = (fromColor, toColor) => {
    setCurrentTheme({ fromColor, toColor });
  };

  return (
    <>
      <div
        className={`z-[100] flex flex-col justify-start w-full 
        `}
      >
        <Link
          to="/dashboard"
          className="text-xl items-center  group font-semibold hidden fixed top-[5rem]  -left-6 md:flex -rotate-90"
        >
          <RiBox3Fill className="text-2xl transform mr-2 group-hover:rotate-180 transition-all " />
          Re:
          <h1 className="bg-gradient-to-r from-white/50 to-pink-500 text-transparent bg-clip-text">
            Event
          </h1>
        </Link>
        <h1 className="px-10 md:mx-32 text-center py-10 text-2xl text-zinc-100 herofont">
          {saveName}
        </h1>
        <div className="  w-full rounded-xl  flex justify-center  text-white ">
          <div
            className={`w-[90%] md:w-3/4  bg-[#212325] m-0   rounded-2xl p-3`}
          >
            <div
              id="heroSection"
              className={`bg-gradient-to-r from-${currentTheme.fromColor} to-${currentTheme.toColor} rounded-xl h-[200px] md:h-[500px] relative bg-cover`}
            >
              {/* ... existing code ... */}
              <input
                type="file"
                id="coverPhotoInput"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
              <Suspense>
                <label
                  htmlFor="coverPhotoInput"
                  className="bg-[#212325]/80 bottom-2 md:bottom-10 left-2 md:left-10 cursor-pointer group gap-5 p-5 h-[2.5rem] backdrop-blur-xl rounded-md border border-gray-500 flex items-center pl-3 absolute"
                >
                  <FaImages className="text-white/80 text-xl group-hover:text-white" />
                  <h1 className="font-bold text-white/80 group-hover:text-white">
                    Change Cover Photo
                  </h1>
                </label>
              </Suspense>

              <div className="absolute top-2 md:bottom-10  right-2 md:right-10 flex  items-center gap-2 ">
                <div
                  className="w-8 h-8 rounded-full border-2 border-gray-700 cursor-pointer bg-gradient-to-r from-amber-500 to-pink-500"
                  onClick={() => {
                    changeTheme("amber-500", "pink-500");
                  }}
                ></div>
                <div
                  className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-700 bg-gradient-to-r from-blue-500 to-green-500"
                  onClick={() => changeTheme("blue-500", "green-500")}
                ></div>
                <div
                  className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-700 bg-gradient-to-r from-purple-500 to-indigo-500"
                  onClick={() => changeTheme("purple-500", "indigo-500")}
                ></div>
                <div
                  className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-700 bg-gradient-to-r from-red-500 to-yellow-500"
                  onClick={() => changeTheme("red-500", "yellow-500")}
                ></div>
              </div>
            </div>

            <div className=" w-full md:w-[90%] p-5 flex flex-col   gap-5">
              <div>
                <p className=" p-3">Event Name</p>
                {/* <h1
                  className=" h-[3rem] focus:border-b-2  border-b-2 font-bold tracking-wide text-xl  text-gray-400    border-b-1 focus:border-gray-500 p-2 outline-none "
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                >
                  Enter Your Event Name
                </h1> */}
                <input
                  type="text"
                  name="eventname"
                  id="eventname"
                  placeholder="Enter Your Event Name"
                  className="w-full h-[3rem] focus:border-b-2  border-b-2 font-bold tracking-wide text-xl  text-gray-100 bg-transparent border-b-1 focus:border-gray-500 p-2 outline-none "
                  onChange={(e) => handleChange("eventname", e.target.value)}
                />
              </div>
              <div>
                <p className=" p-3">Event Description</p>
                <textarea
                  className=" h-[8rem] focus:border-b-2 w-full rounded-lg bg-[#323436]  font-bold tracking-wide text-md  text-gray-100     focus:border-gray-500 p-2 outline-none "
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  placeholder="Enter Your Event Description"
                  onChange={(e) => handleChange("description", e.target.value)}
                // Enter Your Event Description
                />
              </div>
            </div>

            <div className=" flex  justify-center    w-[100%] flex-col p-5">
              <h1 className=" p-3    text-xl">
                Where is the Event taking place....
              </h1>
              <div className=" ">
                <div className=" bg-[#323436]  w-full md:w-3/5  mt-4   rounded-lg">
                  <div className=" text-[#f7d5d5] flex-col md:flex-row  flex w-[100%]  justify-around  gap-2 px-1.5 py-1.5   ">
                    <EventUtil
                      name={"zoom"}
                      icon={<FaGlobeAmericas className=" text-lg" />}
                    />
                    <EventUtil
                      name={"virtual"}
                      icon={<MdOutlineComputer className=" text-lg" />}
                    />
                    <EventUtil
                      name={"In-Person"}
                      icon={<IoIosVideocam className=" text-lg" />}
                    />
                  </div>
                </div>
                <div className="">
                  {activemenuItem === "zoom" && (
                    <>
                      <Zoom />
                    </>
                  )}
                  {activemenuItem === "virtual" && (
                    <>
                      <Virtual />
                    </>
                  )}
                  {activemenuItem === "In-Person" && (
                    <>
                      <InPerson />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-5">
              <DateTime />
            </div>

            <div className="p-5">
              <h1 className="text-lg">Who has access to this event?</h1>

              <div className=" flex gap-5 p-3 flex-col">
                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    name="access"
                    id="public"
                    value="public"
                    className=" w-5 h-5  caret-slate-500"
                    onChange={(e) => handleChange("visibility", e.target.value)}
                  />
                  <div className="flex flex-col">
                    <label htmlFor="public" className=" text-lg">
                      Public{" "}
                    </label>
                    <h1 className="text-sm text-gray-400  ">
                      Anyone can join get Metting Details
                    </h1>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    name="access"
                    id="private"
                    value="private"
                    className=" w-5 h-5 caret-slate-500"
                    onChange={(e) => handleChange("visibility", e.target.value)}
                  />
                  <div className="flex flex-col">
                    <label htmlFor="public" className=" text-lg">
                      Private{" "}
                    </label>
                    <h1 className="text-sm text-gray-400">
                      Only registered members can get the metting details
                    </h1>
                  </div>
                </div>
              </div>
              {/* <input type="radio" name="access" id="invite" value="invite"/> */}
              {/* <label htmlFor="invite">Invite Only</label> */}
            </div>

            {/* <Link to="/manage/fdsfds"> */}
            <div className=" pl-8 pb-4  pt-4">
              {/* <div className=""> */}
              <button
                className=" bg-[#323436] rounded-lg hover:scale-105 flex items-center group gap-2 p-4"
                onClick={handleSubmit}
              >
                <FaAnglesRight className="text-sm " />
                <h1 className="text-sm ">{saveName}</h1>
              </button>
              {/* </div> */}
            </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNew;
