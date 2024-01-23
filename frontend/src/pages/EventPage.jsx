import React from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../components/EventPage/Banner';
import Location from '../components/EventPage/Location';
import HostDetails from '../components/EventPage/HostDetails';
import AboutComponent from '../components/EventPage/AboutComponent';
import RegisterComponent from '../components/EventPage/RegisterComponent';



const EventPage = () => {
  const { id } = useParams();

  return (
    <>
      <div className="w-full mt-10 flex items-center justify-center p-10">
        <div className="w-full md:w-2/3 ">
          <Banner img="https://miro.medium.com/v2/resize:fit:1400/1*O9ZowM6DT_MRqCNjr79ZrA.jpeg" />
          <div className="w-full flex flex-col md:flex-row gap-4 py-5">
            <div className="md:w-1/3 w-full flex flex-col gap-4">
              <Location />
              <HostDetails />

            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-4">
              <RegisterComponent />
              <AboutComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventPage