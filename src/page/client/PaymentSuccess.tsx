import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { axiosUserBookingCreate, axiosVerifyPayment } from '../../axios'

const PaymentSuccess = () => {
    const { session_id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const verifyPayment = async (session_id: string) => {
            try {
                const res = await axiosVerifyPayment(session_id)
                if (res.data.payment === true) {
                    toast.success('Payment successful! Processing booking...')

                    const bookingInfo = JSON.parse(localStorage.getItem('booking') || '{}')
                    if (bookingInfo) {
                        bookingInfo.isPaid = true
                        const resBooking = await axiosUserBookingCreate(bookingInfo.facilityId, bookingInfo)
                        if (resBooking.data) {
                            toast.success('Booking successful.')
                            localStorage.clear()
                            setTimeout(() => navigate('/booking-success'), 4000)
                        }
                    } else {
                        setTimeout(() => navigate('/'), 4000)
                    }
                } else {
                    toast.error('Payment verification failed.')
                    setTimeout(() => navigate('/'), 4000)
                }
            } catch (error) {
                toast.error('Something went wrong during the payment process.')
                setTimeout(() => navigate('/'), 4000)
            }
        }
        if (session_id) {
            verifyPayment(session_id)
        }
    }, [session_id, navigate])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" 
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" 
                        d="M5 13l4 4L19 7"></path>
                </svg>
                <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
                <p className="text-gray-600 mt-2">Please wait, you will be redirected shortly.</p>
                <div className="flex justify-center mt-4">
                    <div className="w-6 h-6 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess
