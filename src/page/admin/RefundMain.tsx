import React, { useState } from 'react'

import RefundDisplay from '../../components/admin/refund/RefundDisplay'

const RefundMain = () => {
    const [refresh, setRefresh] = useState(false)
    const [bookingId, setBookingId] = useState<string>('')

    const toggleHandle = () => {
        setRefresh(!refresh)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row w-full">
    
                    <RefundDisplay refresh={refresh} setRefresh={setRefresh} />
        
            </div>
        </div>
    )
}

export default RefundMain
