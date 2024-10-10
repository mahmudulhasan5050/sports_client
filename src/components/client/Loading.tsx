import React from 'react'

const Loading = () => {
    return (
        <div className="w-[90%] flex items-center justify-center h-10 mb-auto">
            <div style={{ width: `60px`, height: `60px` }} className="animate-spin mt-10">
                <div
                    className="h-full w-full border-4 border-t-green-500
       border-b-purple-500 rounded-[50%] "
                ></div>
            </div>
        </div>
    )
}



export default Loading
