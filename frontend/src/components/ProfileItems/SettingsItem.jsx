import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Cookies from 'js-cookie';


const SettingsItem = () => {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const email = Cookies.get('user');
  const user = JSON.parse(email);
  const email1 = user?.decodedjwt?.email;

  const handleDeleteEvent = async () => {
    try {
      toast.success("Account deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error('Error deleting event:', error.message);
      toast.error('Error deleting event');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === email1) {
      handleDeleteEvent();
    } else {
      toast.error('Entered email does not match email');
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-2 px-12 py-4">
        <h1 className='text-lg'>Settings</h1>
        <div className="flex flex-col m-2 pt-3 gap-2 items-start">
          <p className='font-semibold'>Edit Account?</p>
          <p className='pt-3'>Edit Email?</p>
          <form className="flex flex-col w-full items-center gap-2" onSubmit={handleSubmit}>
            <div className="flex w-full items-center gap-2">
              <input
                className="focus:border-1 w-full outline-none bg-zinc-700/80 border-gray-500/70 rounded-lg pl-4 py-2 border"
                type="text"
                placeholder="Enter here"
                value={email1}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="bg-zinc-100 rounded-lg w-1/5 text-zinc-900 font-semibold px-0 py-2"
                type="submit"
              >
                Change Email
              </button>
            </div>
            <p className='pt-3 text-start w-full'>Edit Username?</p>
            <div className="flex w-full items-center gap-2">
              <input
                className="focus:border-1 w-full outline-none bg-zinc-700/80 border-gray-500/70 rounded-lg pl-4 py-2 border"
                type="text"
                placeholder="Enter here"
                value={email1}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="bg-zinc-100 rounded-lg w-1/5 text-zinc-900 font-semibold px-0 py-2"
                type="submit"
              >
                Change Username
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col m-2 pt-8 gap-2 items-start">
          <p className='font-semibold'>Delete Account?</p>
          <p className='text-sm'>Click on the below button to delete the event</p>
          <button className='px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 transition-all shadow-red-400/20 shadow-lg' onClick={() => setConfirmDelete(true)}>Delete Event</button>
        </div>
      </div>

      {confirmDelete && (
        <div className="w-full h-screen flex items-center justify-center bg-black/40 backdrop-blur-sm absolute top-0 left-0 z-[100]">
          <div className="d backdrop-blur-lg shadow-xl z-[100] border-white/40 border px-8 py-12 rounded-3xl bg-[#212325]/90 text-white ">
            <div className="flex flex-col items-center justify-between gap-10">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-semibold tracking-wide">Are you sure you want to delete the account?</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="tracking-wider pb-4 text-sm ">Enter the username below to delete</h1>
                <h1 className="text-lg mb-2">Event : {email1}</h1>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <input
                    className="focus:border-1 w-full outline-none bg-transparent border-gray-500 rounded-md pl-4 py-2 border-[1px]"
                    type="text"
                    placeholder="Enter here"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button
                    className="bg-red-600/60 rounded-lg text-white px-10 py-2"
                    type="submit"
                  >
                    Delete user account
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

export default SettingsItem;
