import React, { useContext } from 'react';
import { Link } from 'react-router';
import WebSideLogo from '../WebSideLogo/WebSideLogo';
import { AuthContext } from '../Provider/AuthProvider';
import Img from '../assets/user.png';

const Navber = () => {
    const { user, LogOut } = useContext(AuthContext);

    const handleLogOut = () => {
        LogOut()
            .then(() => {
                // Sign-out successful
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="navbar w-10/12 mx-auto mt-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li><a>Item 1</a></li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl">
                    <WebSideLogo />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>

            <div className="navbar-end flex gap-2 items-center">
                {/* User Photo */}
                <div>
                    <img
                        className='w-12 rounded-full mx-2'
                        src={user?.photoURL || Img} 
                        alt={user?.displayName || "User"}
                    />
                </div>

                {/* Login / Logout Button */}
                <div className='md:mr-8 mr-0'>
                    {user ? (
                        <button
                            onClick={handleLogOut}
                            className="btn bg-gradient-to-l to-[#8ABEB9] from-[#002455] text-xl text-white py-2 px-3"
                        >
                            LogOut
                        </button>
                    ) : (
                        <Link
                            to="/auth/login"
                            className="btn bg-gradient-to-l to-[#8ABEB9] from-[#002455] text-xl text-white py-2 px-3"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navber;
