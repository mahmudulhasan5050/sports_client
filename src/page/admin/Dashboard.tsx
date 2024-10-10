import React from 'react'
import DashboardStartGrid from '../../components/admin/dashboard/DashboardStartGrid'
import TransactionChart from '../../components/admin/dashboard/TransactionChart'
import BookingDisplay from '../../components/admin/booking/BookingDisplay'

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-4">
            <DashboardStartGrid />
            <div className="flex flex-row w-full">
                <TransactionChart />
                {/* <BuyerProfileChart/> */}
            </div>
            <div className="flex flex-row gap-4 w-full">
                {/* <BookingDisplay /> */}
            </div>
        </div>
    )
}

export default Dashboard
