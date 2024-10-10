import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'
import { Facility } from '../../../types/Facility'
import { axiosFetchFacility, axiosDeleteFacility } from '../../../axios'

type SetRefreshType = {
    refresh: boolean
    setFacilityId: (value: string) => void
    setRefresh: (value: boolean) => void
}

const FacilityUnitDisplay = ({ refresh, setFacilityId, setRefresh }: SetRefreshType) => {
    const [facilities, setFacilities] = useState<Facility[]>([])

    // Fetch Facility when component mounts
    useEffect(() => {
        const fetchFacility = async () => {
            try {
                const response = await axiosFetchFacility()
                setFacilityId('')
                setFacilities(response.data)
            } catch (error) {
                console.error('Error fetching facility units:', error)
            }
        }
        fetchFacility()
    }, [refresh])

    // Handle delete facility
    const handleDelete = async (id: string) => {
        try {
            await axiosDeleteFacility(id)
            // Update the UI after deletion
            setFacilities(facilities.filter((unit) => unit._id !== id))
            toast.success('Facility has been deleted!')
        } catch (error) {
            toast.error('Facility can not be deleted.')
        }
    }

    return (
        <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-bold text-center">Facility Details</strong>

            <div className="border-x border-gray-200 rounded-sm mt-3">
                {facilities.length === 0 ? (
                    <p className="text-center text-gray-600">No Facility Available</p>
                ) : (
                    <table className="w-full text-gray-700">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Court</th>
                                <th className="py-2 px-4 border-b">Price</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facilities.map((unit) => (
                                <tr key={unit._id}>
                                    <td className="py-2 px-4 border-b">{firstLetterUpperCase(unit.type)}</td>
                                    <td className="py-2 px-4 border-b">{unit.courtNumber}</td>
                                    <td className="py-2 px-4 border-b">{unit.pricePerHour}</td>
                                    <td className="py-2 px-4 border-b">{unit.isActive ? 'Active': 'Inactive'}</td>
                                    
                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    unit._id && setFacilityId(unit._id)
                                                    setRefresh(true)
                                                }}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => unit._id && handleDelete(unit._id)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                                hidden
                                            >
                                                Delete
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

export default FacilityUnitDisplay
