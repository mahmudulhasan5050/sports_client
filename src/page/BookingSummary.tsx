import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { axiosUserBookingCreate } from '../axios'
import toast from 'react-hot-toast'
import { CreateBookingObjType } from './BookingClient'

const BookingSummary = () => {
    const bookingInfoStr = localStorage.getItem('booking')
    const [bookingInfo, setBookingInfo] = useState<CreateBookingObjType | null>(bookingInfoStr ? JSON.parse(bookingInfoStr) : null)
    const { userCTX } = useUser() // Added setBookingDetailsCTX to update context
    const navigate = useNavigate()

    if (!bookingInfo) {
        navigate('/')
    }
    if (userCTX?.role === 'member' && bookingInfo) {
        bookingInfo.isPaid = true
        bookingInfo.paymentAmount = 0
    }

    const confirmBookingHandle = async () => {
        if (bookingInfo) {
            try {
                const res = await axiosUserBookingCreate(bookingInfo.facilityId, bookingInfo)
                if (res.data) {
                    toast.success('Booking successful')
                    localStorage.clear()
                    navigate('/booking-success')
                }
            } catch (error) {
                toast.error('Booking is not possible!')
            }
        }
    }

    const paymentHandle = async () => {
        if (bookingInfo && userCTX) {
            try {
                // Simulating payment success
                bookingInfo.isPaid = true

                // Update context to trigger UI change
                setBookingInfo({ ...bookingInfo, isPaid: true })

                toast.success('Payment successful')
            } catch (error) {
                toast.error('Payment failed!')
            }
        }
    }

    return (
        <div className="min-h-screen w-screen flex justify-center">
                <div className="bg-white flex flex-col w-full px-4 md:w-1/2 text-center mt-48">
                    <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
                    <p>
                        <strong>Facility:</strong> {bookingInfo?.facilityName}
                    </p>
                    <p>
                        <strong>Date:</strong> {bookingInfo?.date}
                    </p>
                    <p>
                        <strong>Time:</strong>{' '}
                        {bookingInfo?.time.slice(0, 2) + ':' + bookingInfo?.time.slice(2)}
                    </p>
                    <p>
                        <strong>Duration:</strong> {bookingInfo?.duration} hour(s)
                    </p>
                    <p>
                        <strong>Total Cost:</strong> {bookingInfo?.paymentAmount} euro(s)
                    </p>

                    {/* For Members: Show only the "Confirm Booking" button */}
                    {userCTX?.role === 'member' && (
                        <button
                            onClick={confirmBookingHandle}
                            className="mt-4 bg-blue-500 text-white font-bold py-2 p-4 rounded hover:bg-blue-700"
                        >
                            Confirm Booking
                        </button>
                    )}

                    {/* For Non-Members: Show "Pay Now" button first, then "Confirm Booking" after payment */}
                    {userCTX?.role === 'non-member' && !bookingInfo?.isPaid && (
                        <button
                            className="mt-4 bg-green-500 text-white font-bold py-2 p-4 rounded hover:bg-green-700"
                            onClick={paymentHandle}
                        >
                            Pay Now
                        </button>
                    )}
                    {userCTX?.role === 'non-member' && bookingInfo?.isPaid && (
                        <button
                            onClick={confirmBookingHandle}
                            className="mt-4 bg-blue-500 text-white font-bold py-2 p-4 rounded hover:bg-blue-700"
                        >
                            Confirm Booking
                        </button>
                    )}
                </div>
        </div>
    )
}

export default BookingSummary
