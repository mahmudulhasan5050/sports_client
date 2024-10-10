import React from 'react'
import { useNavigate } from 'react-router-dom'

const BookingSuccess = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen w-screen flex justify-center">
            <div className="bg-white flex flex-col w-full px-4 md:w-1/2 text-center mt-48">
                <h2 className="text-2xl font-bold mb-4">Your Booking is confirmed!!!</h2>
                <p>
                    <strong>If necessary, please cancel your booking at least 12 hours in advance.</strong>
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="mt-4 bg-blue-500 text-white font-bold py-2 p-4 rounded hover:bg-blue-700"
                >
                    Home
                </button>
            </div>
        </div>
    )
}

export default BookingSuccess
