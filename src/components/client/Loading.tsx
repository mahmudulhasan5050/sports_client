import React from 'react'

type LoadingProps = {
    size?: number
}

const Loading = ({ size = 60 }: LoadingProps) => {
    return (
    
            <div style={{ width: `${size}px`, height: `${size}px` }}>
                <div className="h-full w-full border-4 border-t-green-500 border-b-purple-500 rounded-[50%] animate-spin mt-10"></div>
            </div>
     
    )
}

export default Loading
