// import React, { useEffect } from 'react'
// import { useUser } from '../../../context/UserContext'
// import { useNavigate } from 'react-router-dom'
// import { Outlet } from 'react-router-dom'

// import SideBar from './SideBar'
// //import HeaderAdmin from './HeaderAdmin'

// const LayoutAdmin = () => {

//     return (
//         <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
//             <SideBar />
//             <div className="flex-1">
            
//                 <div className="p-4">{<Outlet />}</div>
//             </div>
//         </div>
//     )
// }

// export default LayoutAdmin

import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Breadcrumb from './Breadcrumb';

const LayoutAdmin = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:h-screen bg-neutral-100 overflow-hidden">
            <SideBar />
            <div className="flex-1 flex flex-col overflow-auto">
                {/* Breadcrumb */}
                <div className="p-4">
                    <Breadcrumb />
                </div>
                {/* Main Content */}
                <div className="p-4 flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default LayoutAdmin;

