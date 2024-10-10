import React, { useState } from 'react'

import FacilityUnitDisplay from '../../components/admin/facilityUnit/FacilityUnitDisplay'
import FacilityUnitForm from '../../components/admin/facilityUnit/FacilityUnitForm'

const FacilityUnitMain = () => {
    const [refresh, setRefresh] = useState(false)

    const toggleHandle = () => {
        setRefresh(!refresh)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end w-full">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={toggleHandle}
                >
                    Create New Facility Unit
                </button>
            </div>

            <div className="flex flex-row w-full">
                {!refresh ? (
                    <FacilityUnitDisplay refresh={refresh} setRefresh={setRefresh} />
                ) : (
                    <FacilityUnitForm setRefresh={setRefresh} />
                )}
            </div>
        </div>
    )
}

export default FacilityUnitMain
