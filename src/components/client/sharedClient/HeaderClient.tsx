import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaArrowRightToBracket } from 'react-icons/fa6'

import { getToken, removeToken, tokenDecodeFunc } from '../../../utils/cookiesFunc'
import AvatarDropdown from '../AvatarDropdown'
import { useUser } from '../../../context/UserContext'
import sportslot from '../../../assets/sportslot1.png'

export const HeaderClient = () => {
    const { userCTX, setUserCTX } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        const getTokenFromCookies = getToken()
        const token = getTokenFromCookies && tokenDecodeFunc(getTokenFromCookies)
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
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between md:mt-4 p-4 md:p-0 bg-white ">
            {/* Tennis Center Title */}
            <Link to="/" style={{ textDecoration: 'none' }}>
         
               
                        <img alt='logo' src={sportslot}  className="h-16 md:h-24"/>
                 
           
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
        //     <header className="fixed top-0 left-0 w-full bg-transparent z-50 p-4">
        //     <div className="max-w-7xl mx-auto flex justify-between items-center">
        //         <Link to="/" style={{ textDecoration: 'none' }}>
        //             <h1 className="text-2xl md:text-4xl font-extrabold text-gray-100 tracking-tight">
        //                 {/* <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
        //                     Tennis Center
        //                 </span> */}
        //                 <span className="bg-blue-700 text-slate-100 px-2 mt-3 border-2 text-lg md:text-3xl">
        //                     TENNIS CENTER
        //                 </span>
        //             </h1>
        //         </Link>
        //         <div className="flex items-center space-x-4">
        //             {userCTX ? (
        //                 <AvatarDropdown userCTX={userCTX} handleLogout={handleLogout} />
        //             ) : (
        //                 <button
        //                     onClick={() => navigate('/signin')}
        //                     className="flex items-center space-x-2 text-white hover:text-gray-300 transition duration-300"
        //                 >
        //                     <span className="font-bold">SignIn</span>
        //                     <FaArrowRightToBracket color="white" fontSize={20} />
        //                 </button>
        //             )}
        //         </div>
        //     </div>
        // </header>
    )
}

export default HeaderClient
