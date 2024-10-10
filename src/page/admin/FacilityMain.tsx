import React, { useState } from 'react'

import FacilityDisplay from '../../components/admin/facility/FacilityDisplay'
import FacilityForm from '../../components/admin/facility/FacilityForm'

const FacilityMain = () => {
    const [refresh, setRefresh] = useState(false)
    const [facilityId, setFacilityId] = useState<string>('')

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
                    Create Facility Details
                </button>
            </div>

            <div className="flex flex-row w-full">
                {!refresh ? (
                    <FacilityDisplay setFacilityId={setFacilityId} refresh={refresh} setRefresh={setRefresh} />
                ) : (
                    <FacilityForm facilityId={facilityId} setFacilityId={setFacilityId} setRefresh={setRefresh} />
                )}
            </div>
        </div>
    )
}

export default FacilityMain
