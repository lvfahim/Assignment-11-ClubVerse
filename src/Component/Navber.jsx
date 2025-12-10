import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { motion } from 'framer-motion';
import WebSideLogo from '../WebSideLogo/WebSideLogo';
import { AuthContext } from '../Provider/AuthProvider';
import Img from '../assets/user.png';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Loding from '../Error And Loding Page/Loding';
import {
    FaUserCircle,
    FaSignOutAlt,
    FaTachometerAlt,
    FaHome,         
    FaInfoCircle,   
    FaUsers,       
    FaPenSquare,    
    FaBookOpen      
} from 'react-icons/fa';

const navVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};

const Navber = () => {
    const { user, LogOut, loading } = useContext(AuthContext);

    if (loading) {
        return <Loding />;
    }

    const handleLogOut = () => {
        LogOut()
            .then(() => {
                
            })
            .catch((error) => {
                alert(error.message);
            });
    };


    const navItems = [
        { to: '/', label: 'Home', icon: FaHome },
        { to: '/aboutUs', label: 'About Us', icon: FaInfoCircle },
        { to: '/whyJoin', label: 'Why Join', icon: FaUsers },
        { to: '/creatAClub', label: 'Create A Club', icon: FaPenSquare },
        { to: '/showAllClub', label: 'All Clubs', icon: FaUsers },
        { to: '/blog', label: 'Blog', icon: FaBookOpen },
    ];

    const Linkss = (
        <>
            {navItems.map((link, index) => (
                <motion.li
                    key={index}
                    data-tooltip-id="infoTip"
                    data-tooltip-content={link.label}
                    variants={linkVariants}
                >
                    <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                            `font-medium text-lg px-4 py-2 rounded-lg transition-colors duration-300 
                            ${isActive ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'}
                            flex items-center gap-2` 
                        }
                    >
                        <link.icon className="text-xl" /> 
                        {link.label}
                    </NavLink>
                </motion.li>
            ))}

            {/* Dashboard Link for Logged-in User */}
            {user && (
                <motion.li data-tooltip-id="infoTip" data-tooltip-content="Dashboard" variants={linkVariants}>
                    <NavLink
                        to='/dashboard/myjoinclub'
                        className={({ isActive }) =>
                            `font-medium text-lg px-4 py-2 rounded-lg transition-colors duration-300 
                            ${isActive ? 'text-green-600 bg-green-50 border-b-2 border-green-600' : 'text-gray-700 hover:text-green-600 hover:bg-gray-100'}
                            flex items-center gap-2`
                        }
                    >
                        <FaTachometerAlt className='text-xl' /> My Dashboard
                    </NavLink>
                </motion.li>
            )}
        </>
    );

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className="w-full bg-white shadow-lg sticky top-0 z-50 transition-all duration-300"
        >
            <div className="navbar max-w-7xl mx-auto px-4 py-2">

                {/* --- Navbar Start (Logo and Mobile Dropdown) --- */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-64 p-4 shadow-xl border border-gray-100 space-y-2"
                        >
                            {Linkss}
                        </ul>
                    </div>

                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                        <Link to='/' className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                            <div className='lg:hidden'>
                                <WebSideLogo />
                            </div>
                            <span className='hidden sm:inline'>ClubVerse</span>
                        </Link>
                    </motion.div>
                </div>

                {/* --- Navbar Center (Desktop Links) --- */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">
                        {Linkss}
                    </ul>
                </div>

                {/* --- Navbar End (User & Auth) --- */}
                <div className="navbar-end flex items-center gap-2">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar border-2 border-indigo-400 p-0 m-0"
                                data-tooltip-id="infoTip"
                                data-tooltip-content={user?.displayName || "Profile"}
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt={user?.displayName || "User"}
                                        src={user?.photoURL || Img}
                                        className='object-cover'
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-64 p-3 shadow-xl border border-gray-100 space-y-1"
                            >
                                {/* Profile Info */}
                                <li className='px-3 py-2 text-gray-800 font-bold border-b mb-1'>
                                    <FaUserCircle className='inline-block mr-2 text-xl text-indigo-500' />
                                    {user?.displayName || 'User'}
                                    <p className='text-xs font-normal text-gray-500 truncate mt-1'>{user?.email}</p>
                                </li>
                                {/* Dashboard Link */}
                                <li>
                                    <Link to="/dashboard/myjoinclub" className='hover:bg-indigo-50 text-indigo-600 font-semibold flex items-center gap-2'>
                                        <FaTachometerAlt className='text-lg' /> Dashboard
                                    </Link>
                                </li>
                                {/* Logout Button */}
                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="btn btn-sm btn-block bg-red-500 hover:bg-red-600 text-white border-0 mt-2"
                                    >
                                        <FaSignOutAlt /> Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className='md:mr-4 mr-0'
                        >
                            <Link
                                to="/auth/login"
                                className="btn bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 border-0 transition-colors duration-300 shadow-md"
                            >
                                Login
                            </Link>
                        </motion.div>
                    )}

                    <Tooltip id="infoTip" place="bottom" />
                </div>
            </div>
        </motion.div>
    );
};

export default Navber;