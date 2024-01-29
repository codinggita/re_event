import React from 'react'

const Otpmail = () => {
    return (
        <>
            <div className="w-full flex">
                <div className='px-20 w-[70%] m-[50px] flex flex-col gap-3 items-center'>
                    <div>
                        <a href="/"
                            className="text-8xl flex items-center  group font-semibold">
                            {/* <RiBox3Fill className="text-2xl transform mr-2 group-hover:rotate-180 transition-all " /> */}
                            Re:
                            <h1 className="bg-gradient-to-r from-white/50 to-pink-500 text-transparent bg-clip-text">
                                Event
                            </h1>
                        </a>
                    </div>
                    <p className='text-xl'>Hi, Welcome to re:Event</p>
                    <p>Thank you for logging in re:Event. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                    <h2 className='bg-white text-black text-2xl rounded-xl px-4 py-2'>324457</h2>
                    <p className='text-sm'>Regards,<br />re:Event</p>
                    <hr className='w-full' />
                    <div>
                        <p>Host your events with re:Event</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Otpmail