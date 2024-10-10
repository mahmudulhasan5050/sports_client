import React, { useEffect } from 'react'
import { Facility } from '../../../types/Facility'
import { axiosAvailableDuration } from '../../../axios'
import { AxiosRequestForFetchDataType } from '../../../types/AxiosRequestForFetchData'
import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'
import classNames from 'classnames'

type AvailableFacilityProps = {
    facility: Facility
    date: string
    facilityName: string
    time: string
    facilityId: string
    setCostPerHour: (costPerHour: number) => void
    setFacilityId: (time: string) => void
    setAvailableGameDurations: (availableCourt: number[]) => void
    setLoadingDuration: (loading: boolean) => void
    setError: (error: string | null) => void
}

const AvailableFacility = ({
    facility,
    facilityName,
    date,
    time,
    facilityId,
    setCostPerHour,
    setFacilityId,
    setAvailableGameDurations,
    setLoadingDuration,
    setError
}: AvailableFacilityProps) => {
    // handle court to get facilityId. In database, it is called 'facility'----------------------------------------------------------------------------
    useEffect(() => {
        setAvailableGameDurations([])
    }, [time])

    const courtHandle = async (facilityId: string) => {
        if (facilityId !== '') {
            setFacilityId(facilityId)
            try {
                setLoadingDuration(true)
                const facilityNDateObj = {
                    selectedDate: date,
                    facilityName: facilityName!,
                    selectedTime: time,
                    selectedFacilityId: facilityId
                } as AxiosRequestForFetchDataType

                const res = await axiosAvailableDuration(facilityNDateObj)
                setAvailableGameDurations(res.data.validDurations)
                setCostPerHour(facility.pricePerHour)
            } catch (error) {
                setError('Failed to fetch duration')
            } finally {
                setLoadingDuration(false)
            }
        }
    }

    return (
        <>
            {facility.isActive && (
                <div className="flex justify-between w-full items-center">
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold text-gray-800">
                            {firstLetterUpperCase(facility.type)}-{facility.courtNumber}
                        </h3>
                        <p className="text-md text-gray-600">{facility.pricePerHour} euros/h</p>
                    </div>
                    <div className="flex justify-center items-center ">
                        <button
                            onClick={() => facility._id && courtHandle(facility._id)}
                            // className="bg-gradient-to-tl from-green-300 to-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                            className={classNames(
                                'bg-gradient-to-tl font-bold py-2 px-4 rounded shadow-md',
                                facilityId !== facility._id
                                    ? 'from-slate-400 to-white text-zinc-700'
                                    : 'from-green-300 to-green-500 text-white'
                            )}
                        >
                            Select
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AvailableFacility
