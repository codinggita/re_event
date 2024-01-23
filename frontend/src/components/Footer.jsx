import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className="w-full border-t border-zinc-800/60">
                <div className="flex w-full p-4 justify-center">
                    <p className="text-zinc-200 text-xs">Use <Link to="/" className='bg-gradient-to-r text-semibold from-white/50 to-pink-500 text-transparent bg-clip-text'>re:Event</Link> for planning and managing your next event.</p>
                </div>
            </div>
        </>
    )
}

export default Footer