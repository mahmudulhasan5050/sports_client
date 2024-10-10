import React from 'react'
import './index.css'
import { Routes, Route,useLocation  } from 'react-router-dom'

import { UserProvider } from './context/UserContext'
import Home from './page/Home'
import HeaderClient from './components/client/sharedClient/HeaderClient'
import BookingClient from './page/BookingClient'
import FacilityUnitMain from './page/admin/FacilityUnitMain'
import FacilityMain from './page/admin/FacilityMain'
import OpeningHourMain from './page/admin/OpeningHourMain'
import UserMain from './page/admin/UserMain'
import SignUp from './page/SighUp'
import ConfirmEmail from './page/client/ConfirmEmail'
import SignIn from './page/SignIn'
import CheckYourEmail from './components/client/CheckYourEmail'
import BookingMain from './page/admin/BookingMain'
//import BookingConfirm from './page/BookingSummary'
import BookingSummary from './page/BookingSummary'
import LayoutAdmin from './components/admin/sharedAdmin/LayoutAdmin'
import Dashboard from './page/admin/Dashboard'
import LayoutClient from './components/client/sharedClient/LayoutClient'
import BookingSuccess from './components/client/BookingSuccess'
import ForgotPassword from './page/ForgotPassword'
import ResetPassword from './page/ResetPassword'
import RefundMain from './page/admin/RefundMain'

function App() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    return (
        <UserProvider>
         {!isAdminRoute && <HeaderClient />}

            <Routes>
                {/* Booking operation pages */}
                <Route path="/" element={<Home />} />
                <Route path="/booking-client/:facilityName" element={<BookingClient />} />
                <Route path="/booking-summary" element={<BookingSummary />} />
                <Route path="/booking-success" element={<BookingSuccess />} />
                {/* Authentication pages */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/auth/confirm/:token" element={<ConfirmEmail />} />
                <Route path="/check-your-email" element={<CheckYourEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />

                {/* <Route path="/" element={<LayoutClient />}>
                    <Route path="booking-client/:facilityName" element={<BookingClient />} />
                    <Route path="booking-summary" element={<BookingSummary />} />
                    <Route path='booking-success' element={<BookingSuccess/>}/>
                </Route> */}

                {/* Admin */}
                <Route path="/admin" element={<LayoutAdmin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="facilityunit" element={<FacilityUnitMain />} />
                    <Route path="facility" element={<FacilityMain />} />
                    <Route path="openinghour" element={<OpeningHourMain />} />
                    <Route path="booking" element={<BookingMain />} />
                    <Route path="user" element={<UserMain />} />
                    <Route path='refund' element={<RefundMain/>}/>
                </Route>
            </Routes>
        </UserProvider>
    )
}

export default App
