import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ManageEvent = () => {
  const { id } = useParams()
  return (
    <>
      <div className="w-full my-20 flex items-center">
        <div className="w-1/2 flex flex-col items-start gap-4">
          <h1 className='text-5xl font-bold'>Manage - {id}</h1>
          <p className='text-xl font-light'>Manage your events here</p>
        </div>
        <div className="w-1/2">
          
        </div>
      </div>
    </>
  )
}

export default ManageEvent