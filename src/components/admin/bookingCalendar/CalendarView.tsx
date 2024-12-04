// import React, { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
// import ReactDatePicker from 'react-datepicker'
// import { axiosFetchFacility, axiosGetBookingByDate } from '../../../axios'
// import { Booking } from '../../../types/Booking'
// import moment, { Moment } from 'moment-timezone'
// import { Facility } from '../../../types/Facility'
// import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'
// import { generateTimeSlots } from '../../../utils/generateTimeSlot'

// type CalendarViewProps = {
//     bookings: Booking[]
//     setBookings: (booking: Booking[]) => void
//     refresh: boolean
//     setRefresh: (value: boolean) => void
//     setSelectedBooking: (value: Booking) => void
//     setIsBookingInfoOpen: (value: boolean) => void
// }

// const CalendarView = ({
//     bookings,
//     setBookings,
//     refresh,
//     setRefresh,
//     setSelectedBooking,
//     setIsBookingInfoOpen
// }: CalendarViewProps) => {
//     const [allFacility, setAllFacility] = useState<Facility[]>([])
//     const [selectedDate, setSelectedDate] = useState<Moment>(moment())

//     const timeSlots = generateTimeSlots()

//     const fetchBookings = async (date: moment.Moment) => {
//         try {
//             const formattedDate = date.format('YYYY-MM-DD')
//             //API
//             const fetchedBookingsByDate = await axiosGetBookingByDate(formattedDate)
//             setBookings(fetchedBookingsByDate.data)
//             setBookings(fetchedBookingsByDate.data)
//             const fetchedFacilities = await axiosFetchFacility()
//             // Sort by facility type and court number
//             const sortedFacilities = fetchedFacilities.data.sort((a: Facility, b: Facility) => {
//                 if (a.type < b.type) return -1
//                 if (a.type > b.type) return 1
//                 return a.courtNumber - b.courtNumber
//             })
//             setAllFacility(sortedFacilities)
//         } catch (error) {
//             toast.error('Bookings are not available')
//         }
//     }

//     useEffect(() => {
//         fetchBookings(selectedDate)
//     }, [selectedDate])

//     // Function to handle date change
//     const handleDateChange = (direction: 'prev' | 'next' | Moment) => {
//         if (direction === 'prev') {
//             setSelectedDate((prev) => prev.clone().subtract(1, 'days'))
//         } else if (direction === 'next') {
//             setSelectedDate((prev) => prev.clone().add(1, 'days'))
//         } else {
//             setSelectedDate(moment(direction))
//         }
//     }
//     // check if a booking overlaps with a time slot
//     const isBookingWithinTimeSlot = (booking: Booking, time: string) => {
//         const bookingStart = moment(booking.startTime, 'HHmm')
//         const bookingEnd = moment(booking.endTime, 'HHmm')
//         const slotTime = moment(time, 'HH:mm')
//         return slotTime.isBetween(bookingStart, bookingEnd, 'minute', '[)')
//     }

//     //When admin wants to see specific booking
//     const handleBookingClick = (booking: Booking) => {
//         setSelectedBooking(booking)
//         setIsBookingInfoOpen(true)
//     }
//     // Function to render bookings based on time slot and court
//     const renderBooking = (court: Facility, time: string) => {
//         const timeWithoutColon = time.replace(':', '')
//         const booking = bookings.find(
//             (b) =>
//                 b.facility.type === court.type &&
//                 b.facility.courtNumber === court.courtNumber &&
//                 b.startTime === timeWithoutColon
//         )

//         // If there's no booking that starts at this exact time, return null
//         if (!booking) return null

//         // Calculate the duration and determine how many slots the booking spans
//         const startMoment = moment(booking.startTime, 'HHmm')
//         const endMoment = moment(booking.endTime, 'HHmm')
//         const durationInMinutes = endMoment.diff(startMoment, 'minutes')
//         const slotsToSpan = Math.ceil(durationInMinutes / 30) // Calculate how many 30-minute slots to span

//         return (
//             <td
//                 key={`${court._id}-${time}`}
//                 className="border-4 border-sky-300 bg-green-200 h-[35px] w-[35px]"
//                 rowSpan={slotsToSpan}
//                 onClick={() => handleBookingClick(booking)}
//             >
//                 <div className="rounded">
//                     <p className="text-xs">{firstLetterUpperCase(booking.user.name)}</p>

//                     <p>{booking.isPaid ? 'Paid' : 'Unpaid'}</p>
//                 </div>
//             </td>
//         )
//     }

//     return (
//         <>
//             {/* Date Display with Left and Right Arrows */}
//             <div className="flex items-center justify-center mb-4 mt-4 md:mt-0">
//                 <button
//                     className="bg-gradient-to-tl to-green-400 from-slate-100 p-2 rounded-l hover:to-slate-100 hover:from-green-400"
//                     onClick={() => handleDateChange('prev')}
//                 >
//                     &lt;
//                 </button>
//                 <ReactDatePicker
//                     selected={selectedDate.toDate()}
//                     onChange={(date: Date | null) => {
//                         if (date) {
//                             handleDateChange(moment(date))
//                         }
//                     }}
//                     dateFormat="dd-MM-YYYY"
//                     className="px-4 py-2 bg-gray-100 rounded text-center"
//                     calendarClassName="rounded-lg shadow-md"
//                     wrapperClassName="mx-2"
//                     withPortal
//                     shouldCloseOnSelect={false}
//                 />
//                 {/* <div className="px-4 py-2 bg-gray-100 rounded">{selectedDate.format('dddd, MMMM Do YYYY')}</div> */}
//                 <button
//                     className="bg-gradient-to-tl to-green-400 from-slate-100 p-2 rounded-r hover:to-slate-100 hover:from-green-400"
//                     onClick={() => handleDateChange('next')}
//                 >
//                     &gt;
//                 </button>
//             </div>
//             <div className="overflow-x-auto" style={{ maxHeight: '600px', overflowY: 'auto' }}>
//                 <table className="table-auto w-full border-collapse">
//                     <thead>
//                         <tr>
//                             <th className="border p-2">Time</th>
//                             {allFacility.map((court) => (
//                                 <th key={court._id} className="border p-2">
//                                     {firstLetterUpperCase(court.type)}-{court.courtNumber}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {timeSlots.map((timeSlot, rowIndex) => (
//                             <tr key={rowIndex} className="relative ">
//                                 <td className="border p-2 text-center h-[35px] w-[35px]">{timeSlot}</td>
//                                 {allFacility.map((court, index) => {
//                                     const booking = bookings.find(
//                                         (b) =>
//                                             b.facility.type === court.type &&
//                                             b.facility.courtNumber === court.courtNumber &&
//                                             isBookingWithinTimeSlot(b, timeSlot)
//                                     )

//                                     return (
//                                         <React.Fragment key={index}>
//                                             {booking ? (
//                                                 renderBooking(court, timeSlot)
//                                             ) : (
//                                                 <td className="border p-2 h-[35px] w-[35px]"></td>
//                                             )}
//                                         </React.Fragment>
//                                     )
//                                 })}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     )
// }

// export default CalendarView
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ReactDatePicker from 'react-datepicker'
import { axiosFetchFacility, axiosGetBookingByDate } from '../../../axios'
import { Booking } from '../../../types/Booking'
import moment, { Moment } from 'moment-timezone'
import { Facility } from '../../../types/Facility'
import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'
import { generateTimeSlots } from '../../../utils/generateTimeSlot'

type CalendarViewProps = {
    bookings: Booking[]
    setBookings: (booking: Booking[]) => void
    refresh: boolean
    setRefresh: (value: boolean) => void
    setSelectedBooking: (value: Booking) => void
    setIsBookingInfoOpen: (value: boolean) => void
}

const CalendarView = ({
    bookings,
    setBookings,
    refresh,
    setRefresh,
    setSelectedBooking,
    setIsBookingInfoOpen
}: CalendarViewProps) => {
    const [allFacility, setAllFacility] = useState<Facility[]>([])
    const [visibleColumns, setVisibleColumns] = useState<number>(0) // Starting column index
    const [selectedDate, setSelectedDate] = useState<Moment>(moment())
    const timeSlots = generateTimeSlots()

    const fetchBookings = async (date: moment.Moment) => {
        try {
            const formattedDate = date.format('YYYY-MM-DD')
            const fetchedBookingsByDate = await axiosGetBookingByDate(formattedDate)
            setBookings(fetchedBookingsByDate.data)
            const fetchedFacilities = await axiosFetchFacility()
            const sortedFacilities = fetchedFacilities.data.sort((a: Facility, b: Facility) => {
                if (a.type < b.type) return -1
                if (a.type > b.type) return 1
                return a.courtNumber - b.courtNumber
            })
            setAllFacility(sortedFacilities)
        } catch (error) {
            toast.error('Bookings are not available')
        }
    }

    useEffect(() => {
        fetchBookings(selectedDate)
    }, [selectedDate])

    const handleDateChange = (direction: 'prev' | 'next' | Moment) => {
        if (direction === 'prev') {
            setSelectedDate((prev) => prev.clone().subtract(1, 'days'))
        } else if (direction === 'next') {
            setSelectedDate((prev) => prev.clone().add(1, 'days'))
        } else {
            setSelectedDate(moment(direction))
        }
    }

    const handleBookingClick = (booking: Booking) => {
        setSelectedBooking(booking)
        setIsBookingInfoOpen(true)
    }

    const handleNextColumns = () => {
        if (visibleColumns + 2 < allFacility.length) {
            setVisibleColumns(visibleColumns + 2)
        }
    }

    const handlePreviousColumns = () => {
        if (visibleColumns > 0) {
            setVisibleColumns(visibleColumns - 2)
        }
    }

    const renderBooking = (court: Facility, time: string) => {
        const booking = bookings.find(
            (b) =>
                b.facility.type === court.type &&
                b.facility.courtNumber === court.courtNumber &&
                moment(time, 'HH:mm').isBetween(
                    moment(b.startTime, 'HHmm'),
                    moment(b.endTime, 'HHmm'),
                    'minute',
                    '[)'
                )
        )

        if (!booking) return null

        const slotsToSpan = Math.ceil(
            moment(booking.endTime, 'HHmm').diff(moment(booking.startTime, 'HHmm'), 'minutes') / 30
        )

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
            <div className="flex items-center justify-center mb-4 mt-4 md:mt-0">
                <button
                    className="bg-gradient-to-tl to-green-400 from-slate-100 p-2 rounded-l hover:to-slate-100 hover:from-green-400"
                    onClick={() => handleDateChange('prev')}
                >
                    &lt;
                </button>
                <ReactDatePicker
                    selected={selectedDate.toDate()}
                    onChange={(date: Date | null) => {
                        if (date) {
                            handleDateChange(moment(date))
                        }
                    }}
                    dateFormat="dd-MM-yyyy"
                    className="px-4 py-2 bg-gray-100 rounded text-center"
                    withPortal
                    shouldCloseOnSelect={false}
                    onFocus={(e) => e.preventDefault()}
                />
                <button
                    className="bg-gradient-to-tl to-green-400 from-slate-100 p-2 rounded-r hover:to-slate-100 hover:from-green-400"
                    onClick={() => handleDateChange('next')}
                >
                    &gt;
                </button>
            </div>
            <div className="flex items-center justify-between mb-4">
                <button
                    className="bg-blue-500 text-white py-1 px-4 rounded disabled:opacity-50"
                    disabled={visibleColumns === 0}
                    onClick={handlePreviousColumns}
                >
                    Previous
                </button>
                <button
                    className="bg-blue-500 text-white py-1 px-4 rounded disabled:opacity-50"
                    disabled={visibleColumns + 2 >= allFacility.length}
                    onClick={handleNextColumns}
                >
                    Next
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2">Time</th>
                            {allFacility.slice(visibleColumns, visibleColumns + 2).map((court) => (
                                <th key={court._id} className="border p-2">
                                    {firstLetterUpperCase(court.type)} {court.courtNumber}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((timeSlot, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="border p-2 text-center h-[35px] w-[35px]">{timeSlot}</td>
                                {allFacility.slice(visibleColumns, visibleColumns + 2).map((court) => (
                                    <td
                                        key={`${court._id}-${rowIndex}`}
                                        className="border p-2 h-[35px] w-[35px]"
                                    >
                                        {renderBooking(court, timeSlot)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CalendarView
