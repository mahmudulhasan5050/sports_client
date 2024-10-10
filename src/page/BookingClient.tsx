import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { todayToString, count15DaysFromToday } from '../utils/dates'
import { axiosAvailableTime } from '../axios'
import { Facility } from '../types/Facility'
import { AxiosRequestForFetchDataType } from '../types/AxiosRequestForFetchData'
import { useUser } from '../context/UserContext'

import Loading from '../components/client/Loading'
import ErrorComp from '../components/client/ErrorComp'
import TimeSlot from '../components/client/bookingClient/TimeSlot'
import AvailableFacility from '../components/client/bookingClient/AvailableFacility'
import Duration from '../components/client/bookingClient/Duration'
import { allUpperCase } from '../utils/upperLowerConvert'

export interface CreateBookingObjType {
    date: string
    facilityName: string
    time: string
    duration: number
    facilityId: string
    paymentAmount: number
    isPaid: boolean
}

const BookingClient = () => {
    const { userCTX } = useUser()

    const { facilityName } = useParams<{ facilityName: string }>()
    const navigate = useNavigate()

    // These hooks are get available data from database
    const [date, setDate] = useState<string>(todayToString)
    const [availableTime, setAvailableTime] = useState<string[]>([])
    const [availableCourts, setAvailableCourts] = useState<Facility[]>([])
    const [availableGameDurations, setAvailableGameDurations] = useState<number[]>([])

    //These hooks are for final selection from user
    const [time, setTime] = useState<string>('')
    const [facilityId, setFacilityId] = useState<string>('')
    const [duration, setDuration] = useState<number>(0)
    const [costPerHour, setCostPerHour] = useState<number>(0)

    const [loading, setLoading] = useState<boolean>(false)
    const [loadingFacility, setLoadingFacility] = useState<boolean>(false)
    const [loadingDuration, setLoadingDuration] = useState<boolean>(false)
    // Loading state
    const [error, setError] = useState<string | null>(null) // Error state

    useEffect(() => {
        const facilityNDateObj = {
            selectedDate: date,
            facilityName: facilityName!
        } as AxiosRequestForFetchDataType

        try {
            const getAvailableTime = async () => {
                try {
                    setLoading(true)
                    setAvailableTime([])
                    //axios parameter: selectedDate:string, facilityName:string
                    const res = await axiosAvailableTime(facilityNDateObj)
                    setAvailableTime(res.data.availableTime)
                    clearState()
                } catch (error) {
                    setError('Failed to fetch available times')
                } finally {
                    setLoading(false)
                }
            }
            getAvailableTime()
        } catch (error) {}
    }, [date, facilityName])

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
        clearState()
    }

    const handleBooking = () => {
        if (time !== '' && duration !== 0 && facilityId !== '') {
            const totalCost = (costPerHour * duration) / 60
            const bookingObjCTX = {
                date,
                time,
                duration,
                facilityId,
                facilityName: facilityName!,
                paymentAmount: totalCost,
                isPaid: false
            } as CreateBookingObjType

            localStorage.setItem('booking', JSON.stringify(bookingObjCTX))
            // When is logged In
            if (userCTX && userCTX.name) {
                navigate('/booking-summary')
            } else {
                //When user is not loggedIn
                navigate('/signin')
            }
        } else {
            toast('Please check your selection to book.')
        }
    }

    const clearState = () => {
        setAvailableCourts([])
        setAvailableGameDurations([])
        setTime('')
        setFacilityId('')
        setDuration(0)
    }

    return (
        <div className="min-h-screen flex flex-col items-center px-4 mt-10">
            <div className="w-full md:w-1/2 text-center mb-10 flex items-center justify-center">
                {/* Left arrow for redirect */}
                <Link to="/" className="mr-4 flex items-center">
                    <FaArrowLeft className="text-gray-700 text-2xl hover:text-blue-500 transition duration-300" />
                </Link>

                {/* Title with dynamic horizontal line */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2 inline-block relative">
                    {allUpperCase(facilityName!)}
                    <span className="block h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mt-2 rounded-md"></span>
                </h1>
            </div>
            <div className="w-full md:w-1/2 rounded-lg mb-16">
                <label className="block text-gray-700 text-md font-bold mb-2">Select Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    min={todayToString()} // Disable past dates
                    max={count15DaysFromToday()} // Disable dates after 15 days
                    className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            {error && <ErrorComp message={error} />} {/* Show error message if error */}
            {!loading && !error && availableTime.length === 0 && (
                <p className="text-gray-500">No available time slots.</p>
            )}
            <div className="w-full flex flex-col md:w-1/2 mb-16">
                <span className="block text-gray-700 text-md font-bold mb-2">Select Time</span>
                {loading ? (
                    <Loading />
                ) : (
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                        {facilityName &&
                            availableTime.map((timeSlot, index) => (
                                <TimeSlot
                                    key={index}
                                    timeSlot={timeSlot}
                                    date={date}
                                    time={time}
                                    facilityName={facilityName}
                                    setFacilityId={setFacilityId}
                                    setDuration={setDuration}
                                    setTime={setTime}
                                    setAvailableCourts={setAvailableCourts}
                                    setLoadingFacility={setLoadingFacility}
                                    setError={setError}
                                />
                            ))}
                    </div>
                )}
            </div>
            {availableCourts.length > 0 && (
                <div className="w-full flex flex-col md:w-1/2 mb-16">
                    <span className="block text-gray-700 text-md font-bold mb-2">Select Court</span>
                    {loadingFacility ? (
                        <Loading />
                    ) : (
                        <div className="flex flex-col w-full gap-4">
                            {facilityName &&
                                availableCourts.map((court, index) => (
                                    <AvailableFacility
                                        key={index}
                                        facility={court}
                                        date={date}
                                        time={time}
                                        facilityName={facilityName}
                                        facilityId={facilityId}
                                        setCostPerHour={setCostPerHour}
                                        setFacilityId={setFacilityId}
                                        setAvailableGameDurations={setAvailableGameDurations}
                                        setLoadingDuration={setLoadingDuration}
                                        setError={setError}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            )}
            {availableGameDurations.length > 0 && (
                <div className="w-full flex flex-col md:w-1/2 mb-16">
                    <span className="block text-gray-700 text-md font-bold mb-2">How long you want to play</span>
                    {loadingDuration ? (
                        <Loading />
                    ) : (
                        <div className="flex justify-between w-full gap-4">
                            {availableGameDurations.map((availableGameDuration) => (
                                <Duration
                                    key={availableGameDuration}
                                    duration={duration}
                                    availableGameDuration={availableGameDuration}
                                    setDuration={setDuration}
                                    setLoadingDuration={setLoadingDuration}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
            {time !== '' && facilityId !== '' && duration !== 0 && (
                <div className="w-full flex flex-col md:w-1/2 mb-16">
                    <button
                        className="bg-gradient-to-tl font-bold py-2 px-4 rounded shadow-md from-green-200 to-green-500 text-gray-800 hover:from-green-500 hover:to-green-200"
                        onClick={handleBooking}
                    >
                        Confirm (<span className="text-red-500"> {(costPerHour * duration) / 60} </span> euros)
                    </button>
                </div>
            )}
        </div>
    )
}

export default BookingClient
