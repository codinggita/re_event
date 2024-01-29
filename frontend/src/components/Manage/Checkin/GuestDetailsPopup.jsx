import React from 'react';
import { toast } from 'sonner';

const GuestDetailsPopup = ({ guest, onClose }) => {
    const { name, email, time } = guest;
    const promise = () => new Promise((resolve) => setTimeout(()=> resolve({name: 'Sonner'}), 1000));
    const handleCheckin = () => { 
        onClose();
        
        toast.promise(promise, {
            loading: 'Checking in...',
            success: (data) => `Successfully checked in 🥳`,
            error: 'Something went wrong',
        });
    }
    return (
        <>
            <div className="h-screen w-full flex-items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="fixed top-1/2 left-1/2 w-1/4 items-center flex flex-col transform -translate-x-1/2 -translate-y-1/2 bg-zinc-800 border border-zinc-600 p-8 rounded-2xl shadow-lg">
                    <div className="w-full items-center flex flex-col">
                        <span className="bg-indigo-400 p-7 m-2 rounded-full"></span>
                        <p className="text-xl font-bold">{name}</p>
                        <p className="text-sm text-gray-500">{email}</p>
                        <hr className="w-full my-4" />
                    </div>
                    <div className="flex px-3 py-5 justify-between w-full">
                        <div className="flex flex-col items-start">
                            <p className='text-md'>Registered</p>
                            <p className="text-xs">Check-in Time: {time}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className='text-md'>Status</p>
                            <p className="text-xs py-0.5 px-2 bg-green-500/40 text-green-600 rounded-xl">Approved</p>
                        </div>
                    </div>

                    {/* Close button */}
                    <div className="flex items-center gap-2 justify-between w-full">
                        <button onClick={onClose} className="mt-4 p-2 w-1/2 bg-zinc-600 rounded-md hover:bg-gray-500">
                            Cancel
                        </button>
                        <button onClick={handleCheckin} className="mt-4 p-2 w-1/2 bg-green-600 rounded-md hover:bg-green-700">
                            Check-in
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GuestDetailsPopup;