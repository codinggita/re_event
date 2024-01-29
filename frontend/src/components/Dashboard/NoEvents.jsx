import React from 'react';
import { Link } from 'react-router-dom';
import { IoCalendar } from "react-icons/io5";


const NoEvents = (props) => {
    const { type } = props;
    return (
        <>
            <div className="w-full flex flex-col gap-10 items-center justify-center p-36">
                <div className="flex flex-col w-full items-center justify-center gap-2">
                    <IoCalendar className="text-6xl text-zinc-400" />
                    <p className="text-lg font-light">
                        {type === 'upcoming' ? 'No upcoming events' : 'No past events'}
                    </p>
                    <p className="font-semibold">
                        {type === 'upcoming' ? 'Create an event to get started' : 'Create an event to get started'}
                    </p>
                </div>
                <Link to="/create" className="text-black bg-zinc-200 hover:scale-105 transition-all px-4 py-2 text-lg font-semibold rounded-xl">Create Event</Link>
            </div>
        </>
    )
}

export default NoEvents