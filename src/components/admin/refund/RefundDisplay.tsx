import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import classNames from 'classnames'

import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'
import { Booking } from '../../../types/Booking'
import { axiosFetchBookingForRefund, updateBookingAfterRefund_A } from '../../../axios'
import moment from 'moment-timezone'

type SetRefreshType = {
    refresh: boolean
    setRefresh: (value: boolean) => void
}

const refundButtonClasses = 'text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline'

const RefundDisplay = ({ refresh, setRefresh }: SetRefreshType) => {
    const [bookings, setBookings] = useState<Booking[]>([])

    // Fetch booking
    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axiosFetchBookingForRefund()
            
                const sortedBookings = response.data.sort((a: Booking, b: Booking) =>
                    moment(b.date).diff(moment(a.date))
                )

                setBookings(sortedBookings)
            } catch (error) {
                toast.error('Something went wrong!')
            }
        }
        fetchBooking()
    }, [])

    // Handle refund
    const handleRefund = async (id: string) => {
        try {
            const updatedBookingsRes = await updateBookingAfterRefund_A(id)
         
       setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking._id === updatedBookingsRes.data._id
                        ? { ...booking, ...updatedBookingsRes.data }
                        : booking
                )
            );
            toast.success('Booking has been cancelled!')
        } catch (error) {
            toast.error('Booking can not be cancelled.')
        }finally{
            
        }
    }

    return (
        <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Refund Details</strong>

            <div className="border-x border-gray-200 rounded-sm mt-3 overflow-y-auto overflow-x-auto">
                {bookings.length === 0 ? (
                    <p className="text-center text-gray-600">No Refund Available</p>
                ) : (
                    <table className="table-fixed w-full text-gray-700">
                        <thead>
                            <tr>
                                <th className="hidden lg:table-cell">Name</th>
                                <th>Info</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((unit) => (
                                <tr key={unit._id}>
                                    <td className="hidden lg:table-cell">{firstLetterUpperCase(unit.user.name)}</td>
                                    <td>
                                        {firstLetterUpperCase(unit.facility.type)}-{unit.facility.courtNumber}
                                        <br />
                                        {moment(unit.date).format('DD/MM/YY')}
                                        <br />
                                        {moment(unit.startTime, 'HHmm').format('HH:mm')}
                                    </td>
                                    <td>{unit.paymentAmount}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => unit._id && handleRefund(unit._id)}
                                                //className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                                className={classNames(
                                                    unit.isRefunded ? 'bg-green-400' : 'bg-red-500',
                                                    refundButtonClasses
                                                )}
                                            >
                                                {unit.isRefunded ? 'Done' : 'Refund'}
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
