import React, { useEffect, useState } from 'react'
import { User } from '../../../types/User'
import { axiosFetchUsers } from '../../../axios'
import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'
import { FaEdit } from 'react-icons/fa'

type SetRefreshType = {
    refresh: boolean
    setUserId: (value: string) => void
    setRefresh: (value: boolean) => void
}

const UserDisplay = ({ refresh, setUserId, setRefresh }: SetRefreshType) => {
    const [users, setUsers] = useState<User[]>([])

    // Fetch Facility when component mounts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosFetchUsers()
                setUserId('')
                setUsers(response.data)
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }
        fetchUser()
    }, [refresh])

    return (
        <div className="bg-white p-2 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-bold text-center">User Details</strong>

            <div className="border-x border-gray-200 rounded-sm mt-3 overflow-y-auto overflow-x-auto">
                {users.length === 0 ? (
                    <p className="text-center text-gray-600">No User Available</p>
                ) : (
                    <table className="w-full text-gray-700">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b hidden lg:table-cell">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((unit) => (
                                <tr key={unit._id}>
                                    <td className="py-2 px-4 border-b hidden lg:table-cell">{firstLetterUpperCase(unit.name)}</td>
                                    <td className="py-2 px-4 border-b">{unit.email}</td>
                                   <td>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    unit._id && setUserId(unit._id)
                                                    setRefresh(true)
                                                }}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                <FaEdit />
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

export default UserDisplay
