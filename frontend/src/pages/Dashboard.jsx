import React, { useState } from 'react';
import { useMainDashContext } from '../context/AppContext';
import PastEvents from '../components/Dashboard/PastEvents';
import UpcomingEvents from '../components/Dashboard/UpcomingEvents';

const components = {
  upcoming: UpcomingEvents,
  past: PastEvents,
};

const Dashboard = () => {
  const { activeTab, setActiveTab } = useMainDashContext();
  const ActiveComponent = components[activeTab] || null;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  

  return (
    <>
      <div className="w-full p-10 text-white flex items-center justify-center">
        <div className="w-2/3 flex justify-between">
          <h1 className="text-3xl font-bold mb-5">Events</h1>
          <div className="flex gap-4 bg-gray-100 p-2 rounded-lg border items-center">
            <button
              className={`${
                activeTab === 'upcoming'
                  ? 'bg-black shadow-lg text-white hover:bg-black'
                  : 'bg-gray-100 text-black hover:bg-black/80'
              } rounded-lg hover:scale-105 hover:text-white px-3 py-1.5 transition-all`}
              onClick={() => handleTabClick('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`${
                activeTab === 'past'
                  ? 'bg-black shadow-lg text-white hover:bg-black'
                  : 'bg-gray-100 text-black hover:bg-black/80'
              } rounded-lg hover:scale-105 px-8 hover:text-white py-1.5 transition-all`}
              onClick={() => handleTabClick('past')}
            >
              Past
            </button>
          </div>
        </div>
      </div>

      {ActiveComponent && <ActiveComponent />}
    </>
  );
};

export default Dashboard;
