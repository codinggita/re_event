import React from 'react';
import ManageCard from '../ManageCard';
import GuestListMenuItem from '../GuestListMenuItem';
import { useMainDashContext } from '../../../context/AppContext';
import HostProfile from '../HostProfile';

const Overview = () => {
  const { setManagetab } = useMainDashContext();
  const guests = [
    {
      name: 'Takeshi Goda',
      email: 'test@mail.com',
      time: '10:30 AM'
    },
    {
      name: 'Sasuke',
      email: 'test@mail.com',
      time: '15:30 PM'
    },
    {
      name: 'Alexandar Christie',
      email: 'mail@test.com',
      time: '10:30 AM'
    },
    {
      name: 'Adolf Hitler',
      email: 'nuclear@bomb.com',
      time: '12:00 PM'
    }
  ]
  return (
    <>
      <div className="w-full">
        <ManageCard eventname="Why Porsche is the best german ?" location="California, US" time="10.30 AM" organiser="Raiden Shogun" />

        <div className="w-full p-4 flex flex-col items-center">
          <div className="flex w-full px-2 py-6 items-center justify-between">
            <h1 className='text-lg'>Recent Registrations - ({guests.length})</h1>
            <button className='bg-zinc-800 hover:bg-zinc-200 transition-all px-4 py-1 rounded-lg text-white hover:text-black' onClick={()=>setManagetab('guests')}>View all</button>
          </div>
          <div className="w-full flex gap-2 flex-col">
            {guests && guests.map((guest, index) => (
              <GuestListMenuItem key={index} name={guest.name} email={guest.email} time={guest.time} />
            ))
            }
          </div>
        </div>

        <HostProfile />
      </div>
    </>
  )
}

export default Overview