import React from 'react';
import { MdOutlineEdit, MdOutlineAttachEmail } from "react-icons/md";


export const HostCard = ({ name, email }) => {
    return (
        <>
            <div className="flex w-[48%] justify-between bg-zinc-600/60 rounded-xl gap-2 border border-zinc-700/60 px-6 py-3 items-center ">
                <div className="flex items-center gap-2">
                    <span className='p-4 rounded-full bg-red-200'></span>
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


const HostProfile = () => {
    const hosts = [
        { name: 'Raiden Shogun', email: 'test@mail.com' },
        { name: 'Another name', email: 'ok@nuil.com' },
    ]
    return (
        <>
            <div className="flex flex-col w-full items-center p-4">
                <p className='text-lg text-start mb-4 w-full'>Host:</p>
                <div className="w-full bg-zinc-800 rounded-xl items-start flex flex-wrap gap-5 p-6">
                    {hosts.map((host, index) => (
                        <HostCard key={index} name={host.name} email={host.email} />
                    ))}
                    <div className="flex items-center justify-between w-full">
                        <div className="flex gap-3 items-center">
                            <MdOutlineAttachEmail className='text-4xl border p-1.5 rounded-lg border-zinc-600 text-zinc-400' />
                            <div className="flex flex-col">
                                <p className='text-lg text-start w-full'>Invite Hosts</p>
                                <p className='text-sm text-start w-full'>Enter email address to add more hosts and managers</p>
                            </div>
                        </div>
                        <input type="text" placeholder='Enter email address' className='bg-zinc-700 outline-none border border-zinc-600 rounded-lg p-2 w-1/2' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HostProfile