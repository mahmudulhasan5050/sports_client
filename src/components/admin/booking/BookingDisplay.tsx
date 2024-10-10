import React, { useEffect, useState } from 'react'
import { getMemberRoleMark } from '../../../utils/getBookingPaymentStatus'
import { Booking } from '../../../types/Booking'
import { axiosFetchBookings } from '../../../axios'
import toast from 'react-hot-toast'
//import { format } from 'date-fns'

type setRefreshType = {
    refresh: boolean
    setBookingId: (value: string) => void
    setRefresh: (value: boolean) => void
}

const BookingDisplay = ({ refresh, setBookingId, setRefresh }: setRefreshType) => {
    const [bookings, setBookings] = useState<Booking[]>([])

    
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axiosFetchBookings()
                setBookings(res.data)
                setBookingId('')
            } catch (error) {
                toast.error('Bookings are not available')
            }
        }
        fetchBookings()
    }, [refresh])

    // const handleDelete = async (id: string) => {
    //     try {
    //         await axiosDeleteBooking(id)
    //         setBookings(bookings.filter((unit) => unit._id !== id))
    //         toast.success('Booking has been deleted.')
    //     } catch (error) {
    //         toast.error('Booking can not be deleted.')
    //     }
    // }
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Recent Booking</strong>
            <div className="border-x border-gray-200 rounded-sm mt-3" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Court</th>
                            <th>Date</th>
                            <th>Start At</th>
                            <th>Payment</th>
                            <th>Payment Status</th>
                            <th>Customer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>
                                    {/* <Link to={`/order/${order.id}`}>#{order.id}</Link> */}
                                    {booking.user.email}
                                </td>
                                <td>{booking.facility.type}-{booking.facility.courtNumber}</td>
                                <td>{booking.date}</td>
                                {/* <td>{format(new Date(order.order_date), 'dd MMM yyyy')}</td> */}
                                <td>{booking.startTime}</td>
                                <td>{booking.paymentAmount}</td>
                                <td>{booking.isPaid ? 'Paid' : 'Unpaid'}</td>
                                <td>{getMemberRoleMark(booking.user?.role)}</td>
                                {/* <td>
                                    <button
                                        onClick={() => booking._id && handleDelete(booking._id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Delete
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BookingDisplay
