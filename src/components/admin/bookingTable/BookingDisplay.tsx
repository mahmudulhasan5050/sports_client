import React, { useEffect, useState } from 'react'
import { getMemberRoleMark } from '../../../utils/getBookingPaymentStatus'
import ReactDatePicker from 'react-datepicker'
import { SlCalender } from 'react-icons/sl'
import { Booking } from '../../../types/Booking'
import { axiosFetchBookingsLimit30 } from '../../../axios'
import toast from 'react-hot-toast'
import moment from 'moment-timezone'
import 'react-datepicker/dist/react-datepicker.css'

const BookingDisplay = () => {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
    const [month, setMonth] = useState<string>('')
    const [paymentStatus, setPaymentStatus] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [selectedDate, setSelectedDate] = useState<string>('')

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalBookings, setTotalBookings] = useState<number>(0)

    const fetchBookings = async (page: number) => {
        try {
            const res = await axiosFetchBookingsLimit30(page)
            const sortedBookings = res.data.bookings.sort((a: Booking, b: Booking) =>
                moment(b.date).diff(moment(a.date))
            )
            setBookings(sortedBookings)
            setTotalBookings(res.data.totalBookings)
        } catch (error) {
            toast.error('Bookings are not available')
        }
    }

    useEffect(() => {
        fetchBookings(currentPage)
    }, [])
    useEffect(() => {
        fetchBookings(currentPage)
    }, [currentPage])
    useEffect(() => {
        filterBookings()
    }, [bookings, month, paymentStatus, email, selectedDate])


    const filterBookings = () => {
        let updatedBookings = bookings

        // Filter by month
        if (month) {
            updatedBookings = updatedBookings.filter((booking) => moment(booking.date).format('MM') === month)
        }

        // Filter by payment status
        if (paymentStatus) {
            const isPaid = paymentStatus === 'Paid'
            updatedBookings = updatedBookings.filter((booking) => booking.isPaid === isPaid)
        }

        // Filter by email
        if (email) {
            updatedBookings = updatedBookings.filter((booking) =>
                booking.user.email.toLowerCase().includes(email.toLowerCase())
            )
        }

        // Filter by date
        if (selectedDate) {
            updatedBookings = updatedBookings.filter(
                (booking) => moment(booking.date).format('YYYY-MM-DD') === selectedDate
            )
        }

        setFilteredBookings(updatedBookings)
    }

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(moment(date).format('YYYY-MM-DD'))
        } else {
            setSelectedDate('')
        }
    }
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }
    const clearSearch = () => {
        setFilteredBookings([])
        setMonth('')
        setPaymentStatus('')
        setEmail('')
        setSelectedDate('')
    }

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Recent Booking</strong>

            {/* Search Panel */}
            <div className="flex flex-wrap gap-4 my-4 sm:flex-row flex-col">
                <select
                    className="border rounded-md px-3 py-2 w-full sm:w-auto"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                >
                    <option value="">Select Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {moment().month(i).format('MMMM')}
                        </option>
                    ))}
                </select>

                <ReactDatePicker
                    showIcon
                    selected={selectedDate ? moment(selectedDate, 'YYYY-MM-DD').toDate() : null}
                    onChange={handleDateChange}
                    className="border rounded-md px-3 py-2 w-full sm:w-auto"
                    placeholderText="Select a date"
                    dateFormat="dd/MM/yyyy"
                />

                <select
                    className="border rounded-md px-3 py-2 w-full sm:w-auto"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                >
                    <option value="">Payment Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                </select>

                <input
                    type="text"
                    className="border rounded-md px-3 py-2 w-full sm:w-auto"
                    placeholder="Search by Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="bg-red-500 text-white px-4 py-2 rounded-md w-full sm:w-auto" onClick={clearSearch}>
                    Clear Search
                </button>
            </div>

            {/* Bookings Table */}
            <div
                className="border-x border-gray-200 rounded-sm mt-3 overflow-y-auto overflow-x-auto"
                style={{ maxHeight: '500px' }}
            >
                <table className="table-fixed w-full text-gray-700">
                    <thead>
                        <tr>
                            <th className="hidden lg:table-cell">Email</th>
                            <th>Court</th>
                            <th className="hidden lg:table-cell">Date</th>
                            <th>Start At</th>
                            <th>Payment</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="hidden lg:table-cell">{booking.user.email}</td>
                                    <td>
                                        {booking.facility.type}-{booking.facility.courtNumber}
                                    </td>
                                    <td className="hidden lg:table-cell">
                                        {moment(booking.date).format('DD-MM-YYYY')}
                                    </td>
                                    <td>{moment(booking.startTime, 'HH:mm').format('HH:mm')}</td>
                                    <td>{booking.paymentAmount}</td>
                                    <td>
                                        {booking.isPaid ? (
                                            <span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-200">
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="capitalize py-1 px-2 rounded-md text-xs text-red-800 bg-red-200">
                                                Unpaid
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    No bookings found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {isNaN(Math.ceil(totalBookings / 30)) ? 1 : Math.ceil(totalBookings / 30)}
                </span>
                <button
                    disabled={(currentPage === Math.ceil(totalBookings / 30))}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default BookingDisplay
