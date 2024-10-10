import React from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { FcBullish } from 'react-icons/fc'
import { DASHBOARD_SIDEBAR_LINKS } from '../../../lib/constants'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { removeToken } from '../../../utils/cookiesFunc'
import { useUser } from '../../../context/UserContext'

const linkClasses =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

const SideBarLink = ({ item }: any) => {
    const { pathname } = useLocation()
    return (
        <Link
            to={item.path}
            className={classNames(
                pathname === item.path ? ' bg-neutral-700 text-white' : 'text-neutral-400',
                linkClasses
            )}
        >
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}

const SideBar = () => {
    const { setUserCTX } = useUser();
    const navigate = useNavigate()

    const handleLogout = () => {
        removeToken();
        setUserCTX(null);
        navigate('/signin')
      };

    return (
        <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
            <div className="flex items-center gap-2 px-1 py-3">
                <FcBullish fontSize={24} />
                <span className="text-neutral-200 text-lg">Sports</span>
            </div>
            <div className="flex-1 py-8 flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SideBarLink key={item.key} item={item} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                <div 
                className={classNames('text-red-500 cursor-pointer', linkClasses)}
                onClick={handleLogout}
                >
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default SideBar
