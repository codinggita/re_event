import React from 'react';
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const GuestListItem = (props) => {
    const {name, email, time} = props;
    return (
        <>
            <div className="w-full py-2 flex items-center gap-2 px-4 bg-zinc-800/70 hover:bg-zinc-700/50 transition-all cursor-pointer border justify-between border-zinc-700/40 rounded-lg">
                <div className="flex flex-row gap-2 items-center">
                    <span className='p-3 rounded-full bg-yellow-600'></span>
                    <p className='text-lg'>{name}</p>
                    <p className='text-sm text-zinc-400'> - {email}</p>
                </div>
                <div className="flex flex-row gap-2">
                    <p className='text-green-400/90 text-md p-2 rounded-lg hover:bg-green-600 transition-all cursor-pointer hover:text-white'><MdDone /></p>
                    <p className='text-red-400/90 text-md p-2 hover:bg-red-600 transition-all cursor-pointer rounded-lg hover:text-white'><RxCross2 /></p>
                    <p className=' text-xs p-2'>{time}</p>
                </div>
            </div>
        </>
    )
}

export default GuestListItem