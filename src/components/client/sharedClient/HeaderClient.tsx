import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaArrowRightToBracket } from 'react-icons/fa6'

import { getToken, removeToken } from '../../../utils/cookiesFunc'
import AvatarDropdown from '../AvatarDropdown'
import { useUser } from '../../../context/UserContext'

export const HeaderClient = () => {
    const { userCTX, setUserCTX } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        const token = getToken()
        if (token) {
            setUserCTX({ name: token.name, role: token.role })
        }
    }, [setUserCTX])

    const handleLogout = () => {
        removeToken()
        setUserCTX(null)
        localStorage.clear()
        navigate('/') // Optionally, navigate back to home after logging out
    }

    return (
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between p-4 bg-white ">
            {/* Tennis Center Title */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
                    <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
                        Tennis Center
                    </span>
                </h1>
            </Link>
            {/* User Section (Avatar or Login Button) */}
            <div className="flex items-center space-x-4">
                {userCTX ? (
                    <AvatarDropdown userCTX={userCTX} handleLogout={handleLogout} />
                ) : (
                    <button
                        onClick={() => navigate('/signin')}
                        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition duration-300"
                    >
                        <span className="font-bold">SignIn</span>
                        <FaArrowRightToBracket color="green" fontSize={20} />
                    </button>
                )}
            </div>
        </header>
    )
}

export default HeaderClient
