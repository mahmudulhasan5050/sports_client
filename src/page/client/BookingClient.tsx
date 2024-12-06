import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaArrowLeft } from 'react-icons/fa'
import ReactDatePicker from 'react-datepicker'
import { SlCalender } from 'react-icons/sl'
import 'react-datepicker/dist/react-datepicker.css'

import { todayToString, count15DaysFromToday } from '../../utils/dates'
import { axiosAvailableTime } from '../../axios'
import { Facility } from '../../types/Facility'
import { AxiosRequestForFetchDataType } from '../../types/AxiosRequestForFetchData'
import { useUser } from '../../context/UserContext'

import Loading from '../../components/client/Loading'
import ErrorComp from '../../components/client/ErrorComp'
import TimeSlot from '../../components/client/bookingClient/TimeSlot'
import AvailableFacility from '../../components/client/bookingClient/AvailableFacility'
import Duration from '../../components/client/bookingClient/Duration'
import { allUpperCase } from '../../utils/upperLowerConvert'
import moment from 'moment-timezone'

export interface CreateBookingObjType {
    date: Date
    facilityName: string
    time: string
    duration: number
    facilityId: string
    paymentAmount: number
    isPaid: boolean
    paymentAtCounter: boolean
}


const BookingClient = () => {
    const { userCTX } = useUser()

    const { facilityName } = useParams<{ facilityName: string }>()
    const navigate = useNavigate()

    const availableFacilityRef = useRef<HTMLDivElement>(null)
    const durationRef = useRef<HTMLDivElement>(null)
    const confirmButtonRef = useRef<HTMLDivElement>(null)

    // These hooks are get available data from database
    const [date, setDate] = useState<Date | null>(todayToString)
    const [availableTime, setAvailableTime] = useState<string[]>([])
    const [availableCourts, setAvailableCourts] = useState<Facility[]>([])
    const [availableGameDurations, setAvailableGameDurations] = useState<number[]>([])

    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

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
            selectedDate: moment(date).format('YYYY-MM-DD'),
            facilityName: facilityName!
        } as AxiosRequestForFetchDataType

        const getAvailableTime = async () => {
            try {
                setLoading(true)
                setAvailableTime([])
                //axios parameter: selectedDate:string, facilityName:string
                const res = await axiosAvailableTime(facilityNDateObj)
                setAvailableTime(res.data.availableTime)
                clearState()
            } catch (error) {
                setError('Failed to fetch available times. Please try to refresh your browser.')
            } finally {
                setLoading(false)
            }
        }
        getAvailableTime()
    }, [date, facilityName])

    const handleDateChange = (selectedDate: Date | null) => {
        if (selectedDate) {
            setDate(selectedDate)
            setIsCalendarOpen(false);
        } else {
            setDate(null)
        }
        clearState()
    }

    useEffect(() => {
        if (availableCourts.length > 0) {
            availableFacilityRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [availableCourts])

    useEffect(() => {
        if (availableGameDurations.length > 0) {
            durationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [availableGameDurations])

    useEffect(() => {
        if (duration !== 0) {
            confirmButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [duration])

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

    const CustomButton = React.forwardRef<HTMLButtonElement, any>(
        ({ value, onClick }, ref) => (
            <button
                ref={ref}
                onClick={onClick}
                className="flex items-center justify-between w-full bg-white border border-gray-300 rounded py-2 px-3 shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <span>{value || 'Select Date'}</span>
                <SlCalender className="text-gray-500" />
            </button>
        )
    );

    const handleBackButton = () => {
        clearState()
        navigate(`/`)
    }

    const clearState = () => {
        setAvailableCourts([])
        setAvailableGameDurations([])
        setTime('')
        setFacilityId('')
        setDuration(0)
    }

    return (
        <div className="flex flex-col items-center px-4 mt-20">
            <div className="w-full md:w-1/2 text-center mb-10 flex items-center justify-center">
                <FaArrowLeft
                    className="text-gray-700 text-2xl hover:text-blue-500 transition duration-300 cursor-pointer"
                    onClick={handleBackButton}
                />

                {/* Title with dynamic horizontal line */}
                <h1 className="text-3xl font-bold text-gray-600 text-center w-full">
                    {allUpperCase(facilityName!)}
                    <span className="block h-1 mt-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded"></span>
                </h1>
            </div>
            <div className="w-full md:w-1/2 rounded-lg mb-16">
                <label className="block text-gray-700 text-md font-bold mb-2">Select Date</label>

                <ReactDatePicker
               
                    selected={date}
                    onChange={handleDateChange}
                    minDate={todayToString() as Date}
                    maxDate={count15DaysFromToday() as Date}
                    customInput={<CustomButton />}
                    wrapperClassName="w-full"
                    dateFormat="dd-MM-yyyy"
                    popperPlacement="bottom-start"
                    open={isCalendarOpen}
                    onClickOutside={() => setIsCalendarOpen(false)}
                    onInputClick={() => setIsCalendarOpen(true)}
                />
            </div>
            {error && <ErrorComp message={error} />} {/* Show error message if error */}
            {!loading && !error && availableTime.length === 0 && (
                <p className="text-gray-500">No available time slots.</p>
            )}
            <div className="w-full flex flex-col md:w-1/2 mb-16">
                <span className="block text-gray-700 text-md font-bold mb-2">Select Time</span>
                {loading ? (
                    <div className="w-[90%] flex items-center justify-center h-10 mb-auto">
                        <Loading />
                    </div>
                ) : (
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                        {facilityName &&
                            availableTime.map((timeSlot, index) => (
                                <TimeSlot
                                    key={index}
                                    timeSlot={timeSlot}
                                    date={date!}
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
                <div ref={availableFacilityRef} className="w-full flex flex-col md:w-1/2 mb-16">
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
                                        date={date!}
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
                <div ref={durationRef} className="w-full flex flex-col md:w-1/2 mb-16">
                    <span className="block text-gray-700 text-md font-bold mb-2">Booking Duration</span>
                    {loadingDuration ? (
                        <Loading />
                    ) : (
                        <div className="flex justify-evenly w-full gap-4">
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
                <div ref={confirmButtonRef} className="w-full flex flex-col md:w-1/2 mb-16">
                    <button
                        className="bg-gradient-to-tl font-bold py-2 px-4 rounded shadow-md from-green-200 to-green-500 text-gray-800 hover:from-green-500 hover:to-green-200"
                        onClick={handleBooking}
                    >
                        Confirm (
                        <span className="text-red-500">
                            {' '}
                            {Math.round((costPerHour * duration) / 60).toFixed(2)} EUR{' '}
                        </span>
                        )
                    </button>
                </div>
            )}
        </div>
    )
}

export default BookingClient
