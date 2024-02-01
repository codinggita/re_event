import React from 'react';
import { PiMicrophoneStageFill } from "react-icons/pi";

const HostDetails = (props) => {
    const { host } = props

    if (!host) {
        return null;
    }

    const username = host.split('@')[0];
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);

    return (
        <>
            <div className="w-full rounded-2xl flex items-center p-2 flex-col bg-zinc-800">
                <h1 className='font-semibold  text-start w-full py-2 px-4'> <PiMicrophoneStageFill className='inline text-lg mr-1' /> Hosted By</h1>
                <hr className='w-[95%] opacity-50 bg-zinc-200' />
                <h1 className="text-gray-200/80 items-center mt-2 p-2 w-full flex flex-row gap-2">
                    <img src="https://source.unsplash.com/random" className="w-8 h-8 rounded-full cursor-pointer border-2" />
                    {capitalizedUsername}
                </h1>
                {/* <h1 className="text-gray-200/80 items-center p-2 w-full flex flex-row gap-2">
                    <span className='p-4 bg-purple-300 rounded-full'></span>
                    Shiva
                </h1> */}
            </div>
        </>
    )
}

export default HostDetails