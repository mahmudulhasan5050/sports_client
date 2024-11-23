import React, { useEffect, useState } from 'react'
import { axiosFetchFacility, axiosGetBookingByDate } from '../../../axios'
import toast from 'react-hot-toast'
import { Booking } from '../../../types/Booking'
import moment from 'moment-timezone'
import { Facility } from '../../../types/Facility'
import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'
import { generateTimeSlots } from '../../../utils/generateTimeSlot'

type CalendarViewProps = {
    bookings: Booking[] 
    setBookings: (booking: Booking[])=> void
    refresh: boolean
    setBookingId: (value: string) => void
    setRefresh: (value: boolean) => void
    setSelectedBooking: (value: Booking) => void
    setIsBookingInfoOpen: (value: boolean) => void
}

const CalendarView = ({
    bookings,
    setBookings,
    refresh,
    setBookingId,
    setRefresh,
    setSelectedBooking,
    setIsBookingInfoOpen
}: CalendarViewProps) => {
    const [allFacility, setAllFacility] = useState<Facility[]>([])
    const [selectedDate, setSelectedDate] = useState(moment())

    const timeSlots = generateTimeSlots()

    const fetchBookings = async (date: moment.Moment) => {
        try {
            const formattedDate = date.format('YYYY-MM-DD')
            //API
            const fetchedBookingsByDate = await axiosGetBookingByDate(formattedDate)
            setBookings(fetchedBookingsByDate.data)
            setBookings(fetchedBookingsByDate.data)
            const fetchedFacilities = await axiosFetchFacility()
            // Sort by facility type and court number
            const sortedFacilities = fetchedFacilities.data.sort((a: Facility, b: Facility) => {
                if (a.type < b.type) return -1
                if (a.type > b.type) return 1
                return a.courtNumber - b.courtNumber
            })
            setAllFacility(sortedFacilities)
            setBookingId('')
        } catch (error) {
            toast.error('Bookings are not available')
        }
    }

    useEffect(() => {
        fetchBookings(selectedDate)
    }, [selectedDate])

    // Function to handle date change
    const handleDateChange = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            setSelectedDate((prev) => prev.clone().subtract(1, 'days')) // Go back one day
        } else if (direction === 'next') {
            setSelectedDate((prev) => prev.clone().add(1, 'days')) // Move forward one day
        }
    }
    // check if a booking overlaps with a time slot
    const isBookingWithinTimeSlot = (booking: Booking, time: string) => {
        const bookingStart = moment(booking.startTime, 'HHmm')
        const bookingEnd = moment(booking.endTime, 'HHmm')
        const slotTime = moment(time, 'HH:mm')
        return slotTime.isBetween(bookingStart, bookingEnd, 'minute', '[)')
    }

    //When admin wants to see specific booking
    const handleBookingClick = (booking: Booking) => {
        setSelectedBooking(booking)
        setIsBookingInfoOpen(true)
    }
    // Function to render bookings based on time slot and court
    const renderBooking = (court: Facility, time: string) => {
        const timeWithoutColon = time.replace(':', '')
        const booking = bookings.find(
            (b) =>
                b.facility.type === court.type &&
                b.facility.courtNumber === court.courtNumber &&
                b.startTime === timeWithoutColon
        )

        // If there's no booking that starts at this exact time, return null
        if (!booking) return null

        // Calculate the duration and determine how many slots the booking spans
        const startMoment = moment(booking.startTime, 'HHmm')
        const endMoment = moment(booking.endTime, 'HHmm')
        const durationInMinutes = endMoment.diff(startMoment, 'minutes')
        const slotsToSpan = Math.ceil(durationInMinutes / 30) // Calculate how many 30-minute slots to span

        return (
            <td
                key={`${court._id}-${time}`}
                className="border-4 border-sky-300 bg-green-200 h-[35px] w-[35px]"
                rowSpan={slotsToSpan}
                onClick={() => handleBookingClick(booking)}
            >
                <div className="rounded">
                    <p className="text-xs">{firstLetterUpperCase(booking.user.name)}</p>

                    <p>{booking.isPaid ? 'Paid' : 'Unpaid'}</p>
                </div>
            </td>
        )
    }


    return (
        <>
            {/* Date Display with Left and Right Arrows */}
            <div className="flex items-center justify-center mb-4">
                <button
                    className="bg-gradient-to-tl to-green-400 from-slate-100 p-2 rounded-l hover:to-slate-100 hover:from-green-400"
                    onClick={() => handleDateChange('prev')}
                >
                    &lt;
                </button>
                <div className="px-4 py-2 bg-gray-100 rounded">{selectedDate.format('dddd, MMMM Do YYYY')}</div>
                <button
                    className="bg-gradient-to-tl to-green-400 from-slate-100 p-2 rounded-r hover:to-slate-100 hover:from-green-400"
                    onClick={() => handleDateChange('next')}
                >
                    &gt;
                </button>
            </div>
            <div className="overflow-x-auto" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2">Time</th>
                            {allFacility.map((court) => (
                                <th key={court._id} className="border p-2">
                                    {firstLetterUpperCase(court.type)}-{court.courtNumber}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((timeSlot, rowIndex) => (
                            <tr key={rowIndex} className="relative ">
                                <td className="border p-2 text-center h-[35px] w-[35px]">{timeSlot}</td>
                                {allFacility.map((court, index) => {
                                    const booking = bookings.find(
                                        (b) =>
                                            b.facility.type === court.type &&
                                            b.facility.courtNumber === court.courtNumber &&
                                            isBookingWithinTimeSlot(b, timeSlot)
                                    )

                                    return (
                                        <React.Fragment key={index}>
                                            {booking ? (
                                                renderBooking(court, timeSlot)
                                            ) : (
                                                <td className="border p-2 h-[35px] w-[35px]"></td>
                                            )}
                                        </React.Fragment>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CalendarView
