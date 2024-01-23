import React from 'react';
import { PiExport } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import GuestListMenuItem from '../GuestListMenuItem';


const GuestsCard = () => {
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
      <div className="w-full flex flex-col">
        <div className="flex w-full p-4 gap-3 flex-col">
          <h1 className="text-start text-xl">Registrations overveiw</h1>
          <p className="text-start text-zinc-400 text-md">Total registrations: 16</p>
          <div class="w-full bg-zinc-700 rounded-full h-2.5">
            <div class="bg-gradient-to-r from-violet-500 to-purple-500 shadow-purple-500/60 shadow-lg h-2.5 rounded-full w-[45%]" ></div>
          </div>
        </div>

        <hr className="w-full mt-10 mb-4 border-zinc-700" />

        <div className="flex w-full flex-col p-4">
          <h1 className="text-start text-xl">Guest List</h1>
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-between w-full">
              <IoIosSearch className='p-1 bg-zinc-800 border border-zinc-200/20 text-4xl rounded-lg' />
              <input type="text" className="w-full px-4 py-1.5 my-3 text-zinc-200 rounded-lg outline-none focus:border border-[1px] border-zinc-200/20 bg-zinc-800" placeholder='Search in guests ...' />
              <PiExport className='p-1 bg-zinc-800 border border-zinc-200/20 text-4xl rounded-lg cursor-pointer hover:shadow-lg shadow-zinc-100' />
            </div>

            {guests && guests.map((guest, index) => (
              <GuestListMenuItem key={index} name={guest.name} email={guest.email} time={guest.time} />
            ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default GuestsCard