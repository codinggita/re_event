import React from 'react';
import { MdOutlineEdit, MdOutlineAttachEmail } from "react-icons/md";


export const HostCard = ({ name, email }) => {
    return (
        <>
            <div className="flex w-full md:w-[48%] justify-between bg-zinc-600/60 rounded-xl gap-2 border border-zinc-700/60 px-6 py-3 items-center ">
                <div className="flex items-center gap-2">
                    <img
                        src="https://picsum.photos/200"
                        className="w-8 h-8 rounded-full cursor-pointer border-2 "
                    />
                    <div className="flex items-center gap-2">
                        <p className='text-md'>{name}</p>
                        <p className='text-xs'>{email}</p>
                    </div>
                </div>
                <MdOutlineEdit className='text-3xl text-zinc-400 border p-1.5 rounded-lg border-zinc-600 cursor-pointer' />
            </div>
        </>
    )
}


const HostProfile = (props) => {
    const { hosts } = props;

    if (!hosts) {
        return null; 
    }

    const username = hosts.split('@')[0];
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);

    return (
        <>
            <div className="flex flex-col w-full items-center p-4">
                <p className='text-lg text-start mb-4 w-full'>Host:</p>
                <div className="w-full bg-zinc-800 rounded-xl items-start flex flex-wrap gap-5 p-6">
                    {/* {hosts.map((host, index) => {
                        const username = hosts.split('@')[0];
                        const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
                        return (
                            <HostCard key={index} name={capitalizedUsername} email={hosts} />
                            )
                        })} */}
                    <HostCard name={capitalizedUsername} email={hosts} />

                    <div className="flex flex-col md:flex-row gap-2 items-center justify-between w-full">
                        <div className="flex  gap-3 items-center">
                            <MdOutlineAttachEmail className='text-4xl border p-1.5 rounded-lg border-zinc-600 text-zinc-400' />
                            <div className="flex flex-col">
                                <p className='text-lg text-start w-full'>Invite Hosts</p>
                                <p className='text-xs md:text-sm text-start w-full'>Enter email address to add more hosts and managers</p>
                            </div>
                        </div>
                        <input type="text" placeholder='Enter email address' className='bg-zinc-700 outline-none border border-zinc-600 rounded-lg p-2 w-full md:w-1/2' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HostProfile