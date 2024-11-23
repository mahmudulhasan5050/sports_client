import React, { useState, useEffect } from 'react'
import { axiosAdminCreateBooking, axiosFetchFacility, axiosFetchUsers } from '../../../axios'
import toast from 'react-hot-toast'
import { User } from '../../../types/User'
import { AdminBookingCreateType, BookingCreateType } from '../../../types/Booking'
import { Facility } from '../../../types/Facility'

type BookingCreateModalPropsType = {
    isCreateModalOpen: boolean
    onClose: () => void
    setRefresh: (refresh:boolean)=>void
    //onSubmit: (bookingData: BookingCreateType) => void
}

const BookingCreateModal = ({ isCreateModalOpen, onClose, setRefresh }: BookingCreateModalPropsType) => {
    const [formData, setFormData] = useState<AdminBookingCreateType>({
        email: '',
        facilityId: '',
        dates: [],
        startTime: '',
        duration: 0
    })

    const [searchTerm, setSearchTerm] = useState('')
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const [allFacility, setAllFacility] = useState<Facility[]>([])

    useEffect(() => {
        fetchUser()
    }, [isCreateModalOpen])

    const fetchUser = async () => {
        if (isCreateModalOpen) {
            try {
                const resUser = await axiosFetchUsers()
                resUser && setUsers(resUser.data)
                setFilteredUsers(resUser.data)
                const resFacility = await axiosFetchFacility()
                resFacility && setAllFacility(resFacility.data)
            } catch (error) {
             
                toast.error('User info is not available')
            }
        }
        clearState()
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value
        setSearchTerm(searchValue)
        setFilteredUsers(users.filter((user) => user.name.toLowerCase().includes(searchValue.toLowerCase())))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.email !== '' && formData.facilityId && formData.dates.length > 0) {
            // Create a booking for each selected date
            formData.dates.forEach(async(date) => {
                const bookingData = { ...formData, date };
               // onSubmit(bookingData); // Submit each booking
                try {
                    const res = await axiosAdminCreateBooking(bookingData)
    
                    if (res.data) toast.success('Booking is confirmed!')
                } catch (error) {
                    toast.error('Booking creation failed')
                }
            });
            setRefresh(true)
            onClose();
        } else {
            toast.error("Please select all required fields and at least one date");
        }
    }
    
    const clearState = () =>{
        setFormData({
            email: '',
            facilityId: '',
            dates: [],
            startTime: '',
            duration: 0 
        })
    }

    return (
        <div className={`fixed inset-0 z-50 ${isCreateModalOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="absolute right-0 w-full sm:w-1/3 h-full bg-white p-4 shadow-lg overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Create Booking</h2>
                    <button onClick={onClose} className="text-red-300 hover:text-red-500">
                        Close
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dates</label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            onChange={(e) => {
                                const selectedDate = e.target.value
                                if (!formData.dates.includes(selectedDate)) {
                                    setFormData({ ...formData, dates: [...formData.dates, selectedDate] })
                                }
                            }}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        <ul className="mt-2">
                            {formData.dates.map((date, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span>{date}</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({
                                                ...formData,
                                                dates: formData.dates.filter((d) => d !== date)
                                            })
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input
                            id="startTime"
                            name="startTime"
                            type="text"
                            value={formData.startTime}
                            onChange={handleFormChange}
                            placeholder="e.g., 1800"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <input
                            id="duration"
                            name="duration"
                            type="number"
                            value={formData.duration}
                            onChange={handleFormChange}
                            placeholder="e.g., 1900"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Facility</label>
                        <select
                            id="facilityId"
                            name="facilityId"
                            value={formData.facilityId}
                            onChange={handleFormChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option>Select Facility</option>
                            {allFacility.length > 0 &&
                                allFacility.map((facility, index) => (
                                    <option key={index} value={facility._id}>
                                        {facility.type}-{facility.courtNumber}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Search User</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search user by name"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        <ul className="max-h-40 mt-2 overflow-y-auto border border-gray-300 rounded-md">
                            {filteredUsers.map((user) => (
                                <li
                                    key={user._id}
                                    onClick={() => setFormData({ ...formData, email: user.email })}
                                    className="cursor-pointer p-2 hover:bg-gray-200"
                                >
                                    <strong>{user.name}</strong>
                                    <p>{user.email}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                        Create Booking
                    </button>
                </form>
            </div>
        </div>
    )
}

export default BookingCreateModal
