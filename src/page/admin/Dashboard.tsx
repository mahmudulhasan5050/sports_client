import React, { useEffect, useState } from 'react'
import DashboardStartGrid from '../../components/admin/dashboard/DashboardStartGrid'
import TransactionChart from '../../components/admin/dashboard/TransactionChart'
import { axiosFetchDashboardInfo } from '../../axios'

export type AllInfoType = {
    currentMonthCount: number
    lastMonthCount: number
    totalUser: number
    totalCancelledThisMonth: number
    totalNotRefunded: number
}

const Dashboard = () => {
    const [allInfo, setAllInfo] = useState<AllInfoType>()
    useEffect(() => {
        const fetchAllInfo = async () => {
            const response = await axiosFetchDashboardInfo()
            setAllInfo(response.data)
        }
        fetchAllInfo()
    }, [])
    return (
        <div className="flex flex-col gap-4">
            <DashboardStartGrid allInfo={allInfo} />
            <div className="flex flex-row w-full">
                <TransactionChart />
            </div>
        </div>
    )
}

export default Dashboard
