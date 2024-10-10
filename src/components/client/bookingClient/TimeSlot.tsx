import { useEffect } from 'react'
import classNames from 'classnames'

import { axiosAvailableCourt } from '../../../axios'
import { Facility } from '../../../types/Facility'
import { AxiosRequestForFetchDataType } from '../../../types/AxiosRequestForFetchData'

type TimeSlotProps = {
    timeSlot: string
    date: string
    facilityName: string
    time: string
    setFacilityId: (facilityId: string) => void
    setDuration: (duration: number) => void
    setTime: (time: string) => void
    setAvailableCourts: (availableCourt: Facility[]) => void
    setLoadingFacility: (loading: boolean) => void
    setError: (error: string | null) => void
}

const TimeSlot = ({
    timeSlot,
    date,
    facilityName,
    time,
    setFacilityId,
    setDuration,
    setTime,
    setAvailableCourts,
    setLoadingFacility,
    setError
}: TimeSlotProps) => {
    //select time and get available facility
    useEffect(() => {
        setFacilityId('')
        setDuration(0)
    }, [time])
    const handleTimeSlotClick = async (selectedTime: string) => {
        try {
            setLoadingFacility(true)
            const facilityNDateObj = {
                selectedDate: date,
                facilityName: facilityName!,
                selectedTime: selectedTime
            } as AxiosRequestForFetchDataType
            // This response is giving available facilities based on select time
            const res = await axiosAvailableCourt(facilityNDateObj)
            setAvailableCourts(res.data.availableCourts)
            setTime(selectedTime)
        } catch (error) {
            setError('Failed to fetch available courts')
        } finally {
            setLoadingFacility(false)
        }
    }

    return (
        <button
            className={classNames(
                'bg-gradient-to-tl font-bold py-2 px-4 rounded shadow-md',
                time !== timeSlot ? 'from-slate-400 to-white text-zinc-700' : 'from-green-300 to-green-500 text-white'
            )}
            onClick={() => handleTimeSlotClick(timeSlot)} // Future functionality
        >
            {timeSlot.slice(0, 2) + ':' + timeSlot.slice(2)}
        </button>
    )
}

export default TimeSlot
