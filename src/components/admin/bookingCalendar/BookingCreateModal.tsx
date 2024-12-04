import React, { useState, useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import { axiosAdminCreateBooking, axiosFetchFacility, axiosFetchUsers } from '../../../axios'
import toast from 'react-hot-toast'
import { User } from '../../../types/User'
import { AdminBookingCreateType } from '../../../types/Booking'
import { Facility } from '../../../types/Facility'
import TimePicker from './TimePicker'
import moment from 'moment-timezone'
import { timeDifferenceBetweenStartEnd } from '../../../utils/timeDifference'

type BookingCreateModalPropsType = {
    isCreateModalOpen: boolean
    createBookingButtonHandle: () => void
    setRefresh: (refresh: boolean) => void
}

const BookingCreateModal = ({
    isCreateModalOpen,
    createBookingButtonHandle,
    setRefresh
}: BookingCreateModalPropsType) => {
    const [formData, setFormData] = useState<AdminBookingCreateType>({
        email: '',
        facilityId: '',
        dates: [],
        startTime: '',
        endTime: ''
    })

    const [searchTerm, setSearchTerm] = useState('')
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const [allFacility, setAllFacility] = useState<Facility[]>([])
    const [selectedDate, setSelectedDate] = useState<Date | null>(null) //-----------

    useEffect(() => {
        if (isCreateModalOpen) fetchUser()
    }, [isCreateModalOpen])

    const fetchUser = async () => {
        try {
            const resUser = await axiosFetchUsers()
            resUser && setUsers(resUser.data)
            setFilteredUsers(resUser.data)
            const resFacility = await axiosFetchFacility()
            resFacility && setAllFacility(resFacility.data)
        } catch (error) {
            toast.error('User info is not available')
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
    const handleDateAdd = (date: Date | null) => {
        if (date) {
            const dateString = moment(date).format('YYYY-MM-DD')
            if (!formData.dates.includes(dateString)) {
                setFormData({ ...formData, dates: [...formData.dates, dateString] })
            }
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formData.email !== '' && formData.facilityId && formData.dates.length > 0) {
            formData.startTime = formData.startTime.replace(':', '')
            formData.endTime = formData.endTime.replace(':', '')
            const timeDifference = timeDifferenceBetweenStartEnd(formData.startTime, formData.endTime)

            if (timeDifference) {
                formData.dates.forEach(async (date) => {
                    const bookingData = { ...formData, date }
                    try {
                        const res = await axiosAdminCreateBooking(bookingData)
                        if (res.data) toast.success('Booking is confirmed!')
                    } catch (error) {
                        toast.error('Booking creation failed')
                    }
                })
                setRefresh(true)
                createBookingButtonHandle()
                clearState()
            } else {
                toast.error('Time inputs are not currect.')
            }
        } else {
            toast.error('Please select all required fields and at least one date')
        }
    }

    const clearState = () => {
        setFormData({
            email: '',
            facilityId: '',
            dates: [],
            startTime: '',
            endTime: ''
        })
        setSearchTerm('')
        setSelectedDate(null) ///--------------
    }

    return (
        // <div className={`fixed inset-0 z-50 ${isCreateModalOpen ? 'block' : 'hidden'}`}>
        //     <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        //     <div className="absolute right-0 w-full sm:w-1/3 h-full bg-white p-4 shadow-lg overflow-y-auto">
        //         <div className="flex justify-between items-center mb-4">
        //             <h2 className="text-xl font-semibold">Create Booking</h2>
        //             <button onClick={onClose} className="text-red-300 hover:text-red-500">
        //                 Close
        //             </button>
        //         </div>
        //         <form onSubmit={handleSubmit} className="space-y-4">
        //             <div>
        //                 <label className="block text-sm font-medium text-gray-700">Dates</label>
        //                 <input
        //                     id="date"
        //                     name="date"
        //                     type="date"
        //                     onChange={(e) => {
        //                         const selectedDate = e.target.value
        //                         if (!formData.dates.includes(selectedDate)) {
        //                             setFormData({ ...formData, dates: [...formData.dates, selectedDate] })
        //                         }
        //                     }}
        //                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        //                 />
        //                 <ul className="mt-2">
        //                     {formData.dates.map((date, index) => (
        //                         <li key={index} className="flex justify-between items-center">
        //                             <span>{date}</span>
        //                             <button
        //                                 type="button"
        //                                 onClick={() => {
        //                                     setFormData({
        //                                         ...formData,
        //                                         dates: formData.dates.filter((d) => d !== date)
        //                                     })
        //                                 }}
        //                                 className="text-red-500 hover:text-red-700"
        //                             >
        //                                 Remove
        //                             </button>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>

        //             <div>
        //                 <TimePicker
        //                     label="Start Time"
        //                     idAndName="startTime"
        //                     value={formData.startTime}
        //                     handleFormChange={handleFormChange}
        //                 />
        //             </div>
        //             <div>
        //                 <TimePicker
        //                     label="End Time"
        //                     idAndName="endTime"
        //                     value={formData.endTime}
        //                     handleFormChange={handleFormChange}
        //                 />
        //             </div>
        //             <div>
        //                 <label className="block text-sm font-medium text-gray-700">Facility</label>
        //                 <select
        //                     id="facilityId"
        //                     name="facilityId"
        //                     value={formData.facilityId}
        //                     onChange={handleFormChange}
        //                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //                 >
        //                     <option>Select Facility</option>
        //                     {allFacility.length > 0 &&
        //                         allFacility.map((facility, index) => (
        //                             <option key={index} value={facility._id}>
        //                                 {facility.type}-{facility.courtNumber}
        //                             </option>
        //                         ))}
        //                 </select>
        //             </div>
        //             <div>
        //                 <label className="block text-sm font-medium text-gray-700">Search User</label>
        //                 <input
        //                     id="email"
        //                     name="email"
        //                     type="email"
        //                     value={searchTerm}
        //                     onChange={handleSearchChange}
        //                     placeholder="Search user by name"
        //                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        //                 />
        //                 <ul className="max-h-40 mt-2 overflow-y-auto border border-gray-300 rounded-md">
        //                     {filteredUsers.map((user) => (
        //                         <li
        //                             key={user._id}
        //                             onClick={() => setFormData({ ...formData, email: user.email })}
        //                             className="cursor-pointer p-2 hover:bg-gray-200"
        //                         >
        //                             <strong>{user.name}</strong>
        //                             <p>{user.email}</p>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        //                 Create Booking
        //             </button>
        //         </form>
        //     </div>
        // </div>
        <div className={`fixed inset-0 z-50 ${isCreateModalOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="absolute right-0 w-full sm:w-1/3 h-full bg-white p-6 shadow-lg overflow-y-auto rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Create Booking</h2>
                    <button
                        onClick={createBookingButtonHandle}
                        className="text-red-500 hover:text-red-700 font-bold text-xl"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dates */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dates</label>
                        <ReactDatePicker
                            selected={selectedDate} // Changed: Allow selection of a single date
                            onChange={(date) => {
                                setSelectedDate(date)
                                handleDateAdd(date) // Call to add the selected date
                            }}
                            inline
                            className="border border-gray-300 rounded-md"
                        />
                        <ul className="mt-2 space-y-1">
                            {formData.dates.map((date, index) => (
                                <li key={index} className="text-sm text-gray-800 flex justify-between">
                                    <span className="text-lg">{moment(date).format('DD-MM-YYYY')}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                dates: formData.dates.filter((d) => d !== date)
                                            })
                                        }
                                        className="text-red-500 hover:text-red-700 text-lg"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Start Time */}
                    <TimePicker
                        label="Start Time"
                        idAndName="startTime"
                        value={formData.startTime}
                        handleFormChange={handleFormChange}
                    />

                    {/* End Time */}
                    <TimePicker
                        label="End Time"
                        idAndName="endTime"
                        value={formData.endTime}
                        handleFormChange={handleFormChange}
                    />

                    {/* Facility */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Facility</label>
                        <select
                            id="facilityId"
                            name="facilityId"
                            value={formData.facilityId}
                            onChange={handleFormChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Facility</option>
                            {allFacility.map((facility) => (
                                <option key={facility._id} value={facility._id}>
                                    {facility.type} - {facility.courtNumber}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* User Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Search by Name</label>
                        <div className="relative">
                            {/* Input Field */}
                            <input
                                id="email"
                                name="email"
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search user by name"
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />

                            {/* Dropdown */}
                            {searchTerm &&
                                filteredUsers.length > 0 && (
                                    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                                        {filteredUsers.map((user) => (
                                            <li
                                                key={user._id}
                                                onClick={() => {
                                                    setSearchTerm(user.name) 
                                                    setFormData({ ...formData, email: user.email }) 
                                                    setFilteredUsers([]) 
                                                }}
                                                className="cursor-pointer p-2 hover:bg-gray-200"
                                            >
                                                <strong>{user.name}</strong>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                        </div>
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
