import React, { useState } from "react";
import { useMainDashContext } from "../../../context/AppContext";
import { toast } from "sonner";

const InPerson = () => {
  const { newevent, setNewEvent } = useMainDashContext();
  const [mapImage, setMapImage] = useState(null);
  const [locationAddress, setLocationAddress] = useState('');

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;


          const apiKey = 'AIzaSyAaYxvRwjfZmkunDmGVf4buRA7ClXw0Lk8';
          const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

          try {
            const response = await fetch(geocodingApiUrl);
            const data = await response.json();

            if (data.status === 'OK' && data.results.length > 0) {
              console.log(data)
              const address = data.results[0].formatted_address;
              setLocationAddress(address);
              setNewEvent({ ...newevent, eventlocation: address });
            } else {
              console.error("Unable to fetch location address");
              toast.error("Unable to fetch location address");
            }
          } catch (error) {
            console.error("Error fetching location address:", error);
            toast.error("Error fetching location address");
          }


          const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=300x150&markers=${latitude},${longitude}&key=${apiKey}`;

          setMapImage(mapImageUrl);
        },
        (error) => {
          console.error("Error getting current location:", error);
          toast.error("Error getting current location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      toast.error("Geolocation is not supported by this browser");
    }
  };

  return (
    <>
      <div className="p-4">
        <h1>Enter Location</h1>
        <div className="w-full  flex items-center flex-col md:flex-row gap-3  md:gap-16 ">
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter Location"
              className=" w-full md:w-[30rem] h-[2.5rem] border-none outline-none  bg-[#323436] border-gray-500 rounded-md p-3 mt-2"
              onChange={(e) =>
                setNewEvent({ ...newevent, eventlocation: e.target.value })
              }
              value={newevent.eventlocation}
            />
          </div>
          <div className="w-full flex items-center gap-5">
            <div className="h-10 w-[0.2px] bg-white"></div>
            <button
              className=" bg-[#323436] text-white p-3 rounded-md mt-2"
              onClick={handleUseCurrentLocation}
            >
              Use Current Location
            </button>
          </div>
        </div>
        {mapImage && (
          <div className="mt-4">
            <img src={mapImage} alt="Map Preview" />
          </div>
        )}
      </div>
    </>
  );
};

export default InPerson;
