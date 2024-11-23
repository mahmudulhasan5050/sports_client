import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { saveToken, tokenDecodeFunc } from '../../utils/cookiesFunc'
import { useUser } from '../../context/UserContext'
import Loading from '../../components/client/Loading'

const GoogleAuthSuccess = () => {
    const { token } = useParams()
    const { userCTX, setUserCTX } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            const decodedURIToken = decodeURIComponent(token)
            saveToken(decodedURIToken)
            const userFromToken = tokenDecodeFunc(decodedURIToken)
            setUserCTX({
                name: userFromToken.name,
                role: userFromToken.role
            })
            const localStorageBooking = localStorage.getItem('booking')

            // When user is signin during booking process or user login other situation
            if (localStorageBooking) {
                navigate('/booking-summary')
            } else {
                navigate('/')
            }
        }
    }, [navigate])

    return (
        <div>
            <Loading />
        </div>
    )
}

export default GoogleAuthSuccess
