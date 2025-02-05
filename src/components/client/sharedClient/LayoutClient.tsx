import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderClient from '../sharedClient/HeaderClient'
import Footer from './Footer'


const LayoutClient = () => {
    return (
        <div className="h-screen w-screen overflow-x-hidden flex flex-row">
            <div className="flex-1">
                <HeaderClient />
                <Outlet />
                <Footer/>
            </div>
        </div>
    )
}

export default LayoutClient
