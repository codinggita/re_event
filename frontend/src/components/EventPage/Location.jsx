import React from 'react'

const Location = () => {
    return (
        <>
            <div className="w-full rounded-2xl border border-zinc-600 bg-zinc-800">
                <div className='w-full'>
                    <iframe className='w-full rounded-t-2xl' src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                </div>
                <div className="w-full flex flex-col items-start justify-center py-2 px-4">
                    <h1 className='text-lg'>Indian Institute of Technology</h1>
                    <h1 className='text-md'>Bombay, India</h1>
                </div>
            </div>
        </>
    )
}

export default Location