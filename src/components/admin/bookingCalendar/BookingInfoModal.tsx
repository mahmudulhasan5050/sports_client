import React from 'react'
import { Booking } from '../../../types/Booking'
import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'
import toast from 'react-hot-toast'
import { axiosUpdateBookingStatus } from '../../../axios'

type BookingInfoModalPropsType = {
    selectedBooking: Booking
    setSelectedBooking: (booking: Booking) => void
    refresh: boolean
    setRefresh: (refresh: boolean) => void
    setIsBookingInfoOpen: (isBookingInfoOpen: boolean) => void
    updateBookingsStatus: (booking: Booking) => void
}

const BookingInfoModal = ({
    selectedBooking,
    setSelectedBooking,
    setIsBookingInfoOpen,
    refresh,
    setRefresh,
    updateBookingsStatus
}: BookingInfoModalPropsType) => {
    const togglePaymentStatus = async () => {
        if (selectedBooking) {
            try {
                const updatedBooking = {
                    ...selectedBooking,
                    isPaid: !selectedBooking.isPaid
                }
                await axiosUpdateBookingStatus(updatedBooking._id!, updatedBooking)
                setSelectedBooking(updatedBooking)
                updateBookingsStatus(updatedBooking)
                setRefresh(!refresh)
                toast.success('Payment status updated successfully')
            } catch (error) {
                toast.error('Failed to update payment status')
            }
        }
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
                <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
                <p>
                    <strong>Name:</strong> {firstLetterUpperCase(selectedBooking.user.name)}
                </p>
                <p>
                    <strong>Time:</strong> {`${selectedBooking.startTime} - ${selectedBooking.endTime}`}
                </p>
                <p>
                    <strong>Facility:</strong>{' '}
                    {`${selectedBooking.facility.type} - ${selectedBooking.facility.courtNumber}`}
                </p>
                <p>
                    <strong>Status:</strong> {selectedBooking.isPaid ? 'Paid' : 'Unpaid'}
                </p>
                <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={togglePaymentStatus}>
                    Change Payment Status
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2"
                    onClick={() => setIsBookingInfoOpen(false)}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default BookingInfoModal
