import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import Overview from '../components/Manage/Items/Overview';
import Guests from '../components/Manage/Items/GuestsCard';
import Analytics from '../components/Manage/Items/Analytics';
import MoreCard from '../components/Manage/Items/MoreCArd';
import { useMainDashContext } from '../context/AppContext';
import ManageMenuItem from '../components/Manage/ManageMenuItem';

const components = {
  Overview: Overview,
  Guests: Guests,
  Analytics: Analytics,
  More: MoreCard,
};

const ManageEvent = () => {
  const { managetab } = useMainDashContext();
  const ActiveComponent = components[managetab] || null;


  const { id } = useParams()
  return (
    <>
      <div className="w-full my-20 flex flex-col items-center justify-center">
        <div className="w-full md:w-2/3 px-8 md:px-0 flex flex-col">
          <p className='text-sm font-light text-zinc-500'>Manage <FaArrowRight className='inline text-xs' /></p>
          <div className="flex items-center w-full justify-between">
            <h1 className="text-2xl font-bold">{id}</h1>
            <Link to={`/e/${id}`} className="bg-zinc-700 hover:bg-zinc-100 hover:text-black transition-all hover:scale-105 text-white shadow py-1.5 px-4 rounded-xl">Event Page <FaArrowRight className='inline text-xs' /></Link>
          </div>

          <div className="flex items-center mt-4 gap-2 w-full">
            <ManageMenuItem tab='Overview' />
            <ManageMenuItem tab='Guests' />
            <ManageMenuItem tab='Analytics' />
            <ManageMenuItem tab='More' />
          </div>
          <hr className='mb-4 border-zinc-500/60' />
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </>
  )
}

export default ManageEvent