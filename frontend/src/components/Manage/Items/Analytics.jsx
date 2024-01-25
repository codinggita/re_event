import React from 'react';
import { Link, useParams } from 'react-router-dom';
import FeedbackListItem from '../FeedbackListItem';
import AnalyticsGraphCard from '../AnalyticsGraphCard';

const Analytics = () => {
  const { id } = useParams();
  return (
    <>
      <div className="w-full flex gap-5 flex-col p-8">
        <div className="flex w-full  items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className='text-lg font-semibold'>Page Views</h1>
            <p className="text-sm text-zinc-300">See your event page insights </p>
          </div>
          <Link to={`/e/${id}`} className="bg-zinc-700 hover:bg-zinc-300 hover:text-black transition-all text-white shadow py-1.5 px-4 rounded-xl">Filter</Link>
        </div>

       
      <AnalyticsGraphCard />
        
        <div className="flex flex-col p-4">
          <div className="flex w-full  items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className='text-lg font-semibold'>Feedback Submissions</h1>
              <p className="text-sm text-zinc-300">See how your guests feel about the event.</p>
            </div>
            <Link to={`/e/${id}`} className="bg-zinc-700 hover:bg-zinc-300 hover:text-black transition-all text-white shadow py-1.5 px-4 rounded-xl">Filter</Link>
          </div>
          <div className="flex w-full flex-wrap justify-center gap-3 my-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <FeedbackListItem key={item} num={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Analytics