import React from 'react'

const ErrorComp = ({ message }: { message: string }) => {
  return (
    <div className='text-red-500 text-center mb-4'>{message}</div>
  )
}

export default ErrorComp