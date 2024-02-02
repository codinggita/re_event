import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const MoreCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleDeleteEvent = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/events/deleteevent/${id}`);
      if (response.status === 200) {
        // console.log('Event deleted successfully');
        toast.success('Event deleted successfully');
        navigate('/dashboard');
      } else {
        console.error('Failed to delete event');
        toast.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error.message);
      toast.error('Error deleting event');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === id) {
      handleDeleteEvent();
    } else {
      // console.error('Entered input does not match eventcode');
      toast.error('Entered input does not match eventcode');
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-2 p-2">
        <h1 className='text-lg'>More details</h1>
        <div className="flex flex-col m-2 pt-8 gap-2 items-start">
          <p className='font-semibold'>Delete Event?</p>
          <p className='text-sm'>Click on the below button to delete the event</p>
          <button className='px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 transition-all shadow-red-400/20 shadow-lg' onClick={() => setConfirmDelete(true)}>Delete Event</button>
        </div>
      </div>

      {confirmDelete && (
        <div className="w-full h-screen bg-black/40 backdrop-blur-sm absolute top-0 left-0 z-[100]">

          <div className="absolute backdrop-blur-lg shadow-xl z-[100] border-white/40 border px-8 py-12 rounded-3xl bg-[#212325]/90 text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center justify-between gap-10">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-semibold tracking-wide">Are you sure you want to cancel?</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="tracking-wider pb-4 text-sm ">Enter the event name below to delete</h1>
                <h1 className="text-lg mb-2">Event : {id}</h1>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <input
                    className="focus:border-1 outline-none bg-transparent border-gray-500 rounded-md pl-4 w-[300px] py-2 border-[1px]"
                    type="text"
                    placeholder="Enter here"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button
                    className="bg-red-600/60 rounded-lg text-white px-10 py-2"
                    type="submit"
                  >
                    Delete the event
                  </button>
                  <button
                    className="bg-zinc-100 rounded-lg text-black px-10 py-2"
                    onClick={() => setConfirmDelete(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MoreCard;
