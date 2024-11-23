import React, { useState } from 'react'
import BookingDisplay from '../../components/admin/bookingTable/BookingDisplay'
import BookingForm from '../../components/admin/bookingCalendar/BookingForm'
import CalendarView from '../../components/admin/bookingCalendar/CalendarView'
import BookingCreateModal from '../../components/admin/bookingCalendar/BookingCreateModal'
import { Booking } from '../../types/Booking'
import BookingInfoModal from '../../components/admin/bookingCalendar/BookingInfoModal'

const BookingMain = () => {
    const [refresh, setRefresh] = useState(false)
    const [bookingId, setBookingId] = useState<string>('')
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
    const [isBookingInfoOpen, setIsBookingInfoOpen] = useState<boolean>(false)
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
    const [bookings, setBookings] = useState<Booking[]>([])

    const toggleHandle = () => {
        // setRefresh(!refresh)
        setIsCreateModalOpen(!isCreateModalOpen)
    }

    const updateBookingsStatus = (updatedBooking: Booking) => {
        setBookings((allBooking) =>
            allBooking.map((booking) => (booking._id === updatedBooking._id ? updatedBooking : booking))
        )
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

                    <CalendarView
                        bookings={bookings}
                        setBookings={setBookings}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        setBookingId={setBookingId}
                        setSelectedBooking={setSelectedBooking}
                        setIsBookingInfoOpen={setIsBookingInfoOpen}
                    />
                </div>
            </div>
            {/* <div className="flex flex-row w-full">
                {!refresh ? (
                    <BookingDisplay setBookingId={setBookingId} refresh={refresh} setRefresh={setRefresh} />
                ) : (
                    <BookingForm bookingId={bookingId} setBookingId={setBookingId} setRefresh={setRefresh} />
                )}
            </div> */}
            <BookingCreateModal isCreateModalOpen={isCreateModalOpen} setRefresh={setRefresh} onClose={toggleHandle} />
            {selectedBooking && isBookingInfoOpen && (
                <BookingInfoModal
                    selectedBooking={selectedBooking}
                    setSelectedBooking={setSelectedBooking}
                    setIsBookingInfoOpen={setIsBookingInfoOpen}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    updateBookingsStatus={updateBookingsStatus}
                />
            )}
        </div>
    )
}

export default BookingMain

//onSubmit={handleCreateBooking}
