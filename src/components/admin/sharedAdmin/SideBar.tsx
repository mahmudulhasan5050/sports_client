import React, { useState } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FcBullish } from 'react-icons/fc';
import { HiOutlineMenuAlt3, HiOutlineX, HiOutlineLogout } from 'react-icons/hi';
import { DASHBOARD_SIDEBAR_LINKS } from '../../../lib/constants';
import { removeToken } from '../../../utils/cookiesFunc';
import { useUser } from '../../../context/UserContext';

const linkClasses =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

    const SideBarLink = ({ item, closeSidebar }: { item: any; closeSidebar: () => void }) => {
        const { pathname } = useLocation();
        return (
            <Link
                to={item.path}
                className={classNames(
                    pathname === item.path ? ' bg-neutral-700 text-white' : 'text-neutral-400',
                    linkClasses
                )}
                onClick={closeSidebar}
            >
                <span className="text-xl">{item.icon}</span>
                {item.label}
            </Link>
        );
    };
    

    const SideBar = () => {
        const { setUserCTX } = useUser();
        const navigate = useNavigate();
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
        const handleLogout = () => {
            removeToken();
            setUserCTX(null);
            navigate('/signin');
        };
    
        const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
        const closeSidebar = () => setIsSidebarOpen(false); // Close function
    
        return (
            <div className="flex flex-col bg-neutral-900 h-full lg:w-60 lg:flex-shrink-0">
                {/* Top Section */}
                <div className="flex items-center justify-between p-3 lg:justify-center">
                    <div className="flex items-center gap-2">
                        <FcBullish fontSize={24} />
                        <span className="text-neutral-200 text-lg">Tennis Center</span>
                    </div>
                    {/* Hamburger Menu for Mobile */}
                    <button
                        className="text-white lg:hidden"
                        onClick={toggleSidebar}
                    >
                        {isSidebarOpen ? <HiOutlineX fontSize={26} color="red" strokeWidth={5} /> : <HiOutlineMenuAlt3 fontSize={24} />}
                    </button>
                </div>
    
                {/* Sidebar Links */}
                <div
                    className={classNames(
                        'absolute lg:relative lg:flex flex-col bg-neutral-900 transition-all duration-300 h-full',
                        isSidebarOpen
                            ? 'w-60 h-full top-0 left-0 z-40'
                            : 'w-0 overflow-hidden lg:w-auto'
                    )}
                >
                    <div className="py-4 lg:py-8">
                        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                            <SideBarLink key={item.key} item={item} closeSidebar={closeSidebar} />
                        ))}
                    </div>
                    <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                        <div
                            className={classNames('text-red-500 cursor-pointer', linkClasses)}
                            onClick={() => {
                                handleLogout();
                                closeSidebar(); // Close the sidebar after logout
                            }}
                        >
                            <span className="text-xl">
                                <HiOutlineLogout />
                            </span>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    export default SideBar;
    


