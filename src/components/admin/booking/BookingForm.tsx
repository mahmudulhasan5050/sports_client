import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import { Facility } from '../../../types/Facility'
import { BookingCreateType } from '../../../types/Booking'
import { axiosAdminCreateBooking, axiosFetchFacility } from '../../../axios'


type setRefreshType = {
    bookingId: string
    setBookingId: (value: string) => void
    setRefresh: (value: boolean) => void
}

const BookingForm = ({ bookingId, setBookingId, setRefresh }: setRefreshType) => {
    const [formData, setFormData] = useState<BookingCreateType>({
        email: '',
        facilityName: '',
        facilityId: '',
        date: '',
        startTime: '',
 
        duration: 0
    })
    //this hook are for drop down list in the form
    //const [facilityUnit, setFacilityUnit] = useState<FacilityUnit[]>([]);
    const [facility, setFacility] = useState<Facility[]>([])
    //const [userAllDB, setUserAllDB] = useState<User>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                //   const facilityUnits = await axiosFetchFacilityUnits();
                const facilities = await axiosFetchFacility()
                //   setFacilityUnit(facilityUnits.data);
                setFacility(facilities.data)
                setLoading(false)
            } catch (error) {
                toast.error('Facilities are not available.')
            }
        }
        fetchFacilities()
    }, [])

    // //edit
    // useEffect(() => {
    //   // If editing, fetch the existing facility data
    //   const fetchBooking = async () => {
    //     if (bookingId !== '') {
    //       try {
    //         const response = await axiosFetchBookingById(bookingId);

    //         setFormData({
    //           email: response.data.user.email,
    //           facilityName: response.data.facility.type,
    //           facilityNumber: response.data.facility.courtNumber,
    //           date: response.data.date,
    //           startTime: response.data.startTime,
    //           duration: response.data.duration
    //         }); // Pre-fill the form with the fetched data
    //       } catch (error) {
    //         console.error('Error fetching facility:', error);
    //       }
    //     }
    //     setLoading(false);
    //   };
    //   fetchBooking();
    // }, [bookingId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (bookingId !== '') {
                // Update existing facility
                //await axiosUpdateFacility(facilityId, formData);
                toast.success('Facility has been updated successfully!')
            } else {
                //create facility
                await axiosAdminCreateBooking(formData)
                toast.success('Facility has been created successfully!')
            }

            setRefresh(false)
            setBookingId('') // This is needed for edit in the future
        } catch (err) {
            toast.error('Failed to create Facility. Please try again.')
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-bold text-center">Create Facility</strong>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full">
                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Court Number
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                {/* Facility Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Facility Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={formData.facilityName}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Type</option>
                        {facility.length !== 0 &&
                            facility.map((facilityName) => (
                                <option key={facilityName._id} value={facilityName.type}>
                                    {facilityName.type}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Facility Number */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Court Number
                    </label>
                    <select
                        id="facilityNumber"
                        name="facilityNumber"
                        value={formData.facilityId}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Type</option>
                        {facility.length !== 0 &&
                            facility.map((faci) => (
                                <option key={faci._id} value={faci._id}>
                                    {faci.type}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Date */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Date
                    </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="Enter date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                {/* start time */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Time
                    </label>
                    <input
                        id="startTime"
                        name="startTime"
                        type="text"
                        value={formData.startTime}
                        onChange={handleChange}
                        placeholder="Enter time in 24h format"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                {/* duration */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Game Duration
                    </label>
                    <input
                        id="duration"
                        name="duration"
                        type="number"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Enter duration"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                {/* Submit Button */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        onClick={() => {
                            setRefresh(false)
                        }}
                        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BookingForm
