import React from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";
const EventConfrom = () => {
  return (
    <div>
            <div>
                <h1>Re:Event Demo Event</h1>
                <p>OCT 15 (FRI), 10:30 AM - OCT 15 (FRI), 10:30 AM</p>
            </div>
            <div>
                <p>Shareable Event Link</p>
                <div>
                <FaRegEyeSlash />
                <div>
                <p>lu.ma/Meet/xyzkip</p>
                <MdContentCopy />
                </div>
                </div>
            </div>
    </div>
  )
}

export default EventConfrom