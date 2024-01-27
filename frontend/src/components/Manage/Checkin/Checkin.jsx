import React, { useState } from 'react';
import { PiExport } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";
import { RiBox3Fill } from 'react-icons/ri';
import GuestListItem from './GuestListItem';
import GuestDetailsPopup from './GuestDetailsPopup';



const Checkin = () => {
    const { id } = useParams();
    const [selectedGuest, setSelectedGuest] = useState(null);
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
        },
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
        },
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
        }, {
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

    const handleGuestItemClick = (guest) => {
        setSelectedGuest(guest);
    };


    const closePopup = () => {
        setSelectedGuest(null);
    };

    return (
        <>
            <div className={`${selectedGuest ? 'fixed': ''} w-full flex p-12 justify-center`}>
                <Link
                    to="/"
                    className="text-xl items-center  group font-semibold hidden fixed top-[5rem]  -left-6 md:flex -rotate-90"
                >
                    <RiBox3Fill className="text-2xl transform mr-2 group-hover:rotate-180 transition-all " />
                    Re:
                    <h1 className="bg-gradient-to-r from-white/50 to-pink-500 text-transparent bg-clip-text">
                        Event
                    </h1>
                </Link>
                <div className={`  w-3/4 flex flex-col gap-3`}>
                    <div className="flex items-center justify-between w-full">
                        <p>Check in Guests - {id} </p>
                        <div className="flex gap-2">
                            <Link to={`/manage/${id}`} className='px-6 bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-100/80 hover:text-black flex items-center transition-all text-center py-1.5'>
                                Export
                                <PiExport className='ml-2 text- xl' />
                            </Link>
                            <Link to={`/manage/${id}/checkin`} className='px-6 bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-100/80 hover:text-black flex items-center transition-all text-center py-1.5'>
                                Scan
                                <FaCamera  className='ml-2 text-xl' />
                            </Link>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                        <div className="flex gap-2 items-center justify-between w-full">
                            <IoIosSearch className='p-1 bg-zinc-800 border border-zinc-200/20 text-4xl rounded-lg' />
                            <input type="text" className="w-full px-4 py-1.5 my-3 text-zinc-200 rounded-lg outline-none focus:border border-[1px] border-zinc-200/20 bg-zinc-800" placeholder='Search in guests ...' />
                        </div>

                        {guests && guests.map((guest, index) => (
                            <div key={index} onClick={() => handleGuestItemClick(guest)}>
                                <GuestListItem name={guest.name} email={guest.email} time={guest.time} />
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
            {selectedGuest && (
                <GuestDetailsPopup
                    guest={selectedGuest}
                    onClose={closePopup}
                />
            )}
        </>
    )
}

export default Checkin