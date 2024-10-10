import React, { useState } from 'react'
import BookingDisplay from '../../components/admin/booking/BookingDisplay'
import BookingForm from '../../components/admin/booking/BookingForm'
import CalendarView from '../../components/admin/booking/CalendarView'
import BookingCreateModal from '../../components/admin/booking/BookingCreateModal'
import { Booking, BookingCreateType } from '../../types/Booking'
import toast from 'react-hot-toast'
import { axiosAdminCreateBooking } from '../../axios'

const BookingMain = () => {
    const [refresh, setRefresh] = useState(false)
    const [bookingId, setBookingId] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const toggleHandle = () => {
        // setRefresh(!refresh)
        setIsModalOpen(!isModalOpen)
    }

    const handleCreateBooking = async (bookingData: BookingCreateType) => {
        try {
            const res = await axiosAdminCreateBooking(bookingData)
    
            if (res.data) toast.success('Booking is confirmed!')
        } catch (error) {
            toast.error('Booking creation failed')
        }

        setRefresh(true)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full">
                <div className="bg-white p-4 rounded-md shadow-md">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-bold mb-4">Booking Calendar</h2>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={toggleHandle}
                        >
                            Create Booking
                        </button>
                    </div>

                    <CalendarView refresh={refresh} setRefresh={setRefresh} setBookingId={setBookingId} />
                </div>
            </div>
            {/* <div className="flex flex-row w-full">
                {!refresh ? (
                    <BookingDisplay setBookingId={setBookingId} refresh={refresh} setRefresh={setRefresh} />
                ) : (
                    <BookingForm bookingId={bookingId} setBookingId={setBookingId} setRefresh={setRefresh} />
                )}
            </div> */}
            <BookingCreateModal isOpen={isModalOpen} onClose={toggleHandle} onSubmit={handleCreateBooking} />
        </div>
    )
}

export default BookingMain
