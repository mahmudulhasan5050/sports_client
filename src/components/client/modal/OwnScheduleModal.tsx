import React, { useState, useEffect } from 'react'
import { useUser } from '../../../context/UserContext'
import Modal from './Modal'
import { axiosCancelBookingByUser, axiosFetchBookingsByUser } from '../../../axios'
import { Facility } from '../../../types/Facility'
import toast from 'react-hot-toast'
import { calculateTimeDifference } from '../../../utils/timeDifference'

interface OwnBooking {
    _id: string
    date: string
    startTime: string
    facility: Facility
    duration: number
}
interface PropsType {
    isOpen: boolean
    onClose: () => void
}

const OwnScheduleModal = ({ isOpen, onClose }: PropsType) => {
    const [bookings, setBookings] = useState<OwnBooking[]>([])
    const { userCTX } = useUser()

    useEffect(() => {
        const fetchUserBookingData = async () => {
            if (isOpen) {
                try {
                    const res = userCTX && (await axiosFetchBookingsByUser())
                    setBookings(res?.data)
                } catch (error) {
                    toast.error('Something went wrong.')
                }
            }
        }

        fetchUserBookingData()
    }, [isOpen, userCTX])

    const handleCancel = async(bookingId: string) => {
        try {
           await axiosCancelBookingByUser(bookingId)

            setBookings(bookings.filter(booking => booking._id !== bookingId))
            toast.success('Your booking is cancelled.')
        
        } catch (error) {
            toast.error('Can not be cancelled. ')
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
            <div className="max-h-96 overflow-y-auto ml-0">
                {bookings.length > 0 ? (
                    <ul className="space-y-4 ml-0">
                        {bookings.map((booking, index) => (
                            <li key={index} className="p-2 border rounded shadow-sm ml-0">
                                <p>
                                    <strong>Facility:</strong> {booking.facility.type} - {booking.facility.courtNumber}
                                </p>
                                <p>
                                    <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Time:</strong> {booking.startTime.slice(0, 2) + ':' + booking.startTime.slice(2)}
                                </p>
                                <p>
                                    <strong>Duration:</strong> {booking.duration} hour(s)
                                </p>
                                <button
                                    onClick={() => handleCancel(booking._id)} // Or another unique identifier
                                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
                     
                                >
                                 {calculateTimeDifference(booking.date, booking.startTime) ? 'Cancellation is not passible' : 'Cancel'}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </Modal>
    )
}

export default OwnScheduleModal
