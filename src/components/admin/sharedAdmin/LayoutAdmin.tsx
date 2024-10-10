import React, { useEffect } from 'react'
import { useUser } from '../../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import SideBar from './SideBar'
import HeaderAdmin from './HeaderAdmin'

const LayoutAdmin = () => {

    return (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
            <SideBar />
            <div className="flex-1">
                <HeaderAdmin />
                <div className="p-4">{<Outlet />}</div>
            </div>
        </div>
    )
}

export default LayoutAdmin
