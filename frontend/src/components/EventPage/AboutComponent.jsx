import React from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";

const AboutComponent = () => {
    return (
        <>
            <div className="w-full flex flex-col items-center rounded-2xl bg-zinc-800 border border-zinc-700">
                <h1 className="text-lg font-medium flex items-center gap-2 bg-zinc-700 py-2 w-full rounded-t-2xl px-4">
                    <IoMdInformationCircleOutline /> About the event
                </h1>
                <div className="w-full px-6 py-2">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit nesciunt quae aperiam neque ipsa aliquid deserunt accusamus hic repellendus nemo. Cumque facilis similique repellat suscipit.</p>
                </div>
                <hr className='w-[95%] opacity-50 my-3 bg-yellow-200' />
                <p className="w-full px-6 py-2">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi repellat, repellendus tempora illum maxime possimus impedit, ipsa porro pariatur, quo quas nihil nulla incidunt tenetur perferendis iure omnis! Expedita, rem?
                </p>
                <ul className='w-full px-6 py-2'>
                    <li>🎉 lorem Programme 1</li>
                    <li>🥳 Programme 2 Lorem, ipsum dolor.</li>
                    <li>✈️ Programme 3 Lorem, ipsum.</li>
                    <li>🍔 Programme 4 Lorem ipsum dolor sit amet.</li>
                    <li>🎨 Programme 5</li>
                </ul>
            </div>
        </>
    )
}

export default AboutComponent