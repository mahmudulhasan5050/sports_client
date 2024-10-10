import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'
import { Booking } from '../../../types/Booking'
import { axiosFetchBookingForRefund, updateBookingAfterRefund_A } from '../../../axios'

type SetRefreshType = {
    refresh: boolean
    setRefresh: (value: boolean) => void
}

const RefundDisplay = ({ refresh, setRefresh }: SetRefreshType) => {
    const [bookings, setBookings] = useState<Booking[]>([])

    // Fetch booking
    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axiosFetchBookingForRefund()
                setBookings(response.data)
            } catch (error) {
                console.error('Error fetching facility units:', error)
            }
        }
        fetchBooking()
    }, [])

    // Handle refund
    const handleRefund = async (id: string) => {
        try {
            await updateBookingAfterRefund_A(id)
            // Update the UI after deletion
            setBookings(bookings.filter((unit) => unit._id !== id))
            toast.success('Booking has been cancelled!')
        } catch (error) {
            toast.error('Booking can not be cancelled.')
        }
    }

    return (
        <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-bold text-center">Refund Details</strong>

            <div className="border-x border-gray-200 rounded-sm mt-3">
                {bookings.length === 0 ? (
                    <p className="text-center text-gray-600">No Refund Available</p>
                ) : (
                    <table className="w-full text-gray-700">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Court</th>
                                <th className="py-2 px-4 border-b">Payment Amount</th>
                                <th className="py-2 px-4 border-b">Refund Status</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((unit) => (
                                <tr key={unit._id}>
                                    <td className="py-2 px-4 border-b">{firstLetterUpperCase(unit.user.name)}</td>
                                    <td className="py-2 px-4 border-b">{unit.facility.type}-{unit.facility.courtNumber}</td>
                                    <td className="py-2 px-4 border-b">{unit.paymentAmount}</td>
                                    <td className="py-2 px-4 border-b">{unit.isRefunded ? 'Done': 'Undone'}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            {/* <button
                                                onClick={() => {
                                                    unit._id && setBookingId(unit._id)
                                                    setRefresh(true)
                                                }}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Refund
                                            </button> */}
                                            <button
                                                onClick={() => unit._id && handleRefund(unit._id)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                       
                                            >
                                                Refund
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default RefundDisplay
