import React from 'react'

const FeedbackListItem = (props) => {
    const { num } = props;
    return (
        <div className="flex items-center bg-zinc-800 border border-zinc-300/30 px-4 py-2 rounded-lg">
            <span className="text-sm text-zinc-300 pr-4">{num}.</span>
            <span className="p-3 rounded-full bg-emerald-300 mr-2"></span>
            <span className="text-sm text-zinc-300 pr-4">Espada</span>
            <span className="text-sm text-zinc-300 px-6">Great Event</span>
        </div>
    )
}

export default FeedbackListItem