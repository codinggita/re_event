import React, { useState, useEffect, Suspense, lazy } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useMainDashContext } from '../context/AppContext';
const MyEvents = lazy(() => import('../components/ProfileItems/MyEvents'));
const Settings = lazy(() => import('../components/ProfileItems/SettingsItem'));
const components = {
  MyEvents: MyEvents,
  Settings: Settings
};


const Profile = () => {
  const { userProfileMenu, setUserprofilemenu } = useMainDashContext();
  const ActiveComponent = components[userProfileMenu] || null;
  const cookie = Cookies.get('user');
  console.log(cookie);
  const user = JSON.parse(cookie);
  console.log(user);
  const email = user.decodedjwt.decode.email;
  const username = user.decodedjwt.user;

  const [userdata, setUserdata] = useState({});
  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/events/geteventsbyuserid/${email}`);
        setUserdata(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getuser();
  }, []);
  return (
    <>
      <div className="w-full flex py-20 px-8 md:p-32 flex-col items-center justify-center">
        <div className="flex w-full flex-col max-w-[1600px] items-center justify-center">
          <div className="flex w-full flex-col gap-4 items-center">
            <div className="flex gap-4 px-4 md:px-12 py-4 bg-zinc-800/40 border border-zinc-700/40 rounded-2xl items-center">
              <img src="https://picsum.photos/200" alt="profile" className="rounded-full w=20 h-20 md:h-32 md:w-32" />
              <div className="flex flex-col gap-4">
                <p className='text-sm md:text-xl font-semibold'>{username}</p>
                <p className='text-sm md:text-md'>{email}</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-around border-zinc-100/40">
              <button
                onClick={() => setUserprofilemenu('MyEvents')}
                className={` ${userProfileMenu === 'MyEvents' ? 'border-b-2 border-zinc-100 font-semibold' : ''}  px-4 text-sm md:text-lg py-1 text-center focus:outline-none`}
              >
                My Events
              </button>
              <button
                onClick={() => setUserprofilemenu('MyTickets')}
                className={` ${userProfileMenu === 'MyTickes' ? 'border-b-2 border-zinc-100 font-semibold' : ''} px-4 text-sm md:text-lg py-1 text-center focus:outline-none `}
              >
                My Tickets
              </button>
              <button
                onClick={() => setUserprofilemenu('Settings')}
                className={` ${userProfileMenu === 'Settings' ? 'border-b-2 border-zinc-100 font-semibold' : ''} px-4 text-sm md:text-lg py-1 text-center focus:outline-none `}
              >
                Settings
              </button>
            </div>
          </div>
          <div className="w-full border border-zinc-100/20 mb-4"></div>
          <Suspense fallback={<div className='w-full flex h-full items-center justify-center'>Loading...</div>}>
            {ActiveComponent && <ActiveComponent />}
          </Suspense>
        </div>
      </div >
    </>
  )
}

export default Profile