import React, { useState, useEffect } from "react";
import { FaImages, FaGlobeAmericas, } from "react-icons/fa";
import { MdOutlineComputer } from "react-icons/md";
import { IoIosVideocam } from "react-icons/io";
import { useMainDashContext } from "../../../context/AppContext";
import EventUtil from "../../../components/CreateNew/EventUtil";
import EditDateComponent from "../EditDateComponent";
import ImageKit from 'imagekit';
import { nanoid } from 'nanoid';
import { toast } from 'sonner';
import axios from 'axios';
import { useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const imgID = nanoid(10);
  const { activemenuItem, setActivemenuItem } = useMainDashContext();
  const { newevent, setNewEvent } = useMainDashContext();
  const [event, setEvent] = useState({});
  const { editedEvent, setEditedEvent } = useMainDashContext();
   const imagekit = new ImageKit({
    publicKey: "public_2rLWcPMCq/TpjA/J9rqwkH8YLNU=",
    privateKey: "private_cz09upy0twlhYcqaCnHidFizWKo=",
    urlEndpoint: "https://ik.imagekit.io/vsnlabs",
    transformationPosition: "path",
    authenticationEndpoint: "http://localhost:5000/imagekit",
  });


  const getEventDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/events/geteventbyid/${id}`);
      setEvent(response.data);
      setEditedEvent(response.data);

      changeBackground(response.data.eventbanner);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log('Edited:', editedEvent)
  const changeBackground = (imageUrl) => {
    const bgElement = document.getElementById('heroSection');
    if (bgElement) {
      bgElement.style.backgroundImage = `url(${imageUrl})`;
    }
  };

  const handleImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    try {
      const response = await imagekit.upload({
        file: file,
        fileName: imgID,
        folder: "/banner/",
      });

      const imageUrl = response.url;
      setEditedEvent({ ...editedEvent, eventbanner: imageUrl });
      console.log('Image URL:', imageUrl);
      changeBackground(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/events/editevent/${id}`, editedEvent);
      console.log('Event updated:', response.data);
      toast.success('Event updated successfully');
    } catch (error) {
      console.log('Error updating event:', error);
      toast.error('Failed to update event');
    }
  };

  const handleChange = (field, value) => {
    setEditedEvent({
      ...editedEvent,
      [field]: value,
    });
  };

  useEffect(() => {
    getEventDetails();
  }, []);
  console.log(event);

  useEffect(() => {
    setNewEvent(event);
  }, [event]);

  return (
    <>
      <div className={`mt-5 flex flex-col justify-start w-[100%]`}>
        <h1 className="my-3 text-xl text-center w-full">Edit Event</h1>
        <div className="w-full rounded-xl flex justify-center text-white ">
          <div className={`w-[95%] bg-[#212325] m-0 rounded-2xl p-3`}>
            <div id="heroSection" className={`bg-gradient-to-r from-amber-500 to-pink-500 rounded-xl h-[500px] relative bg-cover`}>
              <input
                type="file"
                id="coverPhotoInput"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
              <label
                htmlFor="coverPhotoInput"
                className="bg-[#212325]/80 bottom-10 left-10 cursor-pointer group gap-5 p-5 h-[2.5rem] backdrop-blur-xl rounded-md border border-gray-500 flex items-center pl-3 absolute"
              >
                <FaImages className="text-white/80 text-xl group-hover:text-white" />
                <h1 className="font-bold text-white/80 group-hover:text-white">
                  Change Cover Photo
                </h1>
              </label>
            </div>

            <div className="w-[90%] p-5 flex flex-col gap-5">
              <div>
                <p className="p-3">Event Name</p>
                <input
                  type="text"
                  name="eventname"
                  id="eventname"
                  placeholder="Enter Your Event Name"
                  className="w-full h-[3rem] focus:border-b-2 border-b-2 font-bold tracking-wide text-xl text-gray-400 bg-transparent border-b-1 focus:border-gray-500 p-2 outline-none"
                  value={editedEvent.eventname}
                  onChange={(e) => handleChange("eventname", e.target.value)}
                />
              </div>
              <div>
                <p className="p-3">Event Description</p>
                <textarea
                  className="h-[8rem] focus:border-b-2 w-full rounded-lg bg-[#323436] font-bold tracking-wide text-md text-gray-400 focus:border-gray-500 p-2 outline-none"
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  placeholder="Enter Your Event Description"
                  value={editedEvent.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center w-[100%] flex-col p-5">
              <h1 className="p-3 text-xl">
                Where is the Event taking place....
              </h1>
              <div className="">
                <div className="bg-[#323436] w-full md:w-3/5 mt-4 rounded-lg">
                  <div className="text-[#f7d5d5] flex flex-col md:flex-row w-[100%] justify-around gap-2 px-1.5 py-1.5">
                    <EventUtil
                      name={"zoom"}
                      icon={<FaGlobeAmericas className="text-lg" />}
                    />
                    <EventUtil
                      name={"virtual"}
                      icon={<MdOutlineComputer className="text-lg" />}
                    />
                    <EventUtil
                      name={"In-Person"}
                      icon={<IoIosVideocam className="text-lg" />}
                    />
                  </div>
                </div>
                <div className="">
                  {activemenuItem === "zoom" && (
                    <>
                      <h1 className="p-3  text-xl">Enter Zoom Information</h1>
                      <div className=" p-4">
                        <p className=" text-sm">Zoom Meeting URL</p>
                        <input
                          type="text"
                          placeholder="https://zoom.us/j/1234567890"
                          className=" w-full md:w-[30rem] h-[2.5rem] border-none outline-none  bg-[#323436] border-gray-500 rounded-md p-3 mt-2"
                          onChange={(e) =>
                            setEditedEvent({ ...editedEvent, eventurl: e.target.value })
                          }
                          value={editedEvent.eventurl}
                        />
                      </div>
                    </>
                  )}
                  {activemenuItem === "virtual" && (
                    <div className="p-4 w-full md:w-[90%] ">
                      <h1 className="pb-8">Event URL</h1>
                      <div className="flex items-center flex-col md:flex-row w-full gap-3 md:gap-16">
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="Enter Event URL"
                            className=" w-full h-[2.5rem] border-none outline-none  bg-[#323436] border-gray-500 rounded-md p-3 mt-2"
                            onChange={(e) =>
                              setEditedEvent({ ...editedEvent, eventurl: e.target.value })
                            }
                          />
                        </div>
                        <div className=" flex items-center  justify-between gap-5">
                          <div className=" w-[0.2px] h-10  bg-white"></div>
                          <h1>
                            Enter the URL to your Event - Google Meet, Twitch, Youtube, etc.
                          </h1>
                        </div>
                      </div>
                    </div>
                  )}
                  {activemenuItem === "In-Person" && (
                    <div className="p-4">
                      <h1>Enter Location</h1>
                      <div className="w-full  flex items-center flex-col md:flex-row gap-3  md:gap-16 ">
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="Enter Location"
                            className=" w-full md:w-[30rem] h-[2.5rem] border-none outline-none  bg-[#323436] border-gray-500 rounded-md p-3 mt-2"
                            onChange={(e) =>
                              setEditedEvent({ ...editedEvent, eventlocation: e.target.value })
                            }
                            value={editedEvent.eventlocation}
                          />
                        </div>
                        <div className="w-full flex items-center gap-5">
                          <div className="h-10 w-[0.2px] bg-white"></div>
                          <button className=" bg-[#323436] text-white p-3 rounded-md mt-2">
                            Use Current Location
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-2 md:p-5">
              <EditDateComponent />
            </div>

            <div className="p-5">
              <h1 className="text-lg">Who has access to this event?</h1>

              <div className="flex gap-5 p-3 flex-col">
                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    name="access"
                    id="public"
                    value="public"
                    className="w-5 h-5 caret-slate-500"
                    onChange={(e) => handleChange("visibility", e.target.value)}
                    checked={editedEvent.visibility === "public"}
                  />
                  <div className="flex flex-col">
                    <label htmlFor="public" className="text-lg">
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
                    className="w-5 h-5 caret-slate-500"
                    onChange={(e) => handleChange("visibility", e.target.value)}
                    checked={editedEvent.visibility === "private"}
                  />
                  <div className="flex flex-col">
                    <label htmlFor="public" className="text-lg">
                      Private{" "}
                    </label>
                    <h1 className="text-sm text-gray-400">
                      Only registered members can get the metting details
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="pl-8 pb-4 pt-4">
              <button className="bg-[#323436] rounded-lg hover:scale-105 flex items-center group gap-2 p-4"
                onClick={handleSubmit}
              >
                {/* <FaAnglesRight className="text-sm " /> */}
                <h1 className="text-sm ">Save Changes</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEvent;
