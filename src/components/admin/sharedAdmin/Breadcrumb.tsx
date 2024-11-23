import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <div className="p-3 bg-neutral-200 rounded shadow mb-4">
            <nav className="text-sm text-gray-600">
                <Link to="/" className="text-blue-500 hover:underline">
                    Home
                </Link>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    return (
                        <span key={to}>
                            {' / '}
                            <Link to={to} className="text-blue-500 hover:underline">
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </Link>
                        </span>
                    );
                })}
            </nav>
        </div>
    );
};

export default Breadcrumb;
