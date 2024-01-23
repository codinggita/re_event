import React from 'react'

const HostProfile = () => {
    return (
        <>
            <div className="flex w-full flex-col bg-zinc-800 rounded-xl gap-2 border border-zinc-700/60 px-8 py-4 items-start m-2">
                <p className='text-lg'>Host:</p>
                <div className="flex items-center gap-2">
                    <span className='p-4 rounded-full bg-red-200'></span>
                    <div className="flex items-center gap-2">
                        <p className='text-md'>Raiden Shogun</p>
                        <p className='text-xs'>raidenshogun@gmail.com</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HostProfile