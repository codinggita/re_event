import React from 'react';
import { IoTicketOutline } from "react-icons/io5";
import { toast } from 'sonner';

const RegisterComponent = () => {
    const handleSubmit = () => {
        toast.success("Registered for the event successfully")
      }
    return (
        <>
            <div className="w-full flex flex-col items-center rounded-2xl bg-zinc-800 border border-zinc-700">
                <h1 className="text-lg font-medium flex items-center gap-2 bg-zinc-700 py-2 w-full rounded-t-2xl px-4">
                    <IoTicketOutline /> Register for the event
                </h1>
                <div className="w-full px-8 py-4">
                    <h1 className="text-gray-200/80 items-center flex flex-row gap-2">
                        <span className='p-4 bg-red-300 rounded-full'></span>
                        <span className='flex flex-col'>
                            You are signed in as <span className='font-semibold'>saiadithyakancharla@gmail.com</span>
                        </span>
                    </h1>
                </div>
                <hr className='w-[95%] opacity-50 bg-yellow-200' />
                <div className="w-full items-center flex justify-center px-8 py-4">
                    <button className='bg-zinc-100 rounded-lg text-lg py-2 font-semibold tracking-wide hover:scale-105 transition-all shadow-lg shadow-zinc-100/10 w-[100%] text-black/80'
                        onClick={handleSubmit}>Click to register</button>
                </div>
            </div>
        </>
    )
}

export default RegisterComponent