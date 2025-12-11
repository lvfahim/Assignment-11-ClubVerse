import React from 'react';
import { NavLink, Outlet, Link } from 'react-router';
import { MdOutlineLibraryAdd, MdJoinInner, MdHome, MdSettings, MdDashboard, MdOutlineCreate, MdPeopleAlt, MdArticle } from 'react-icons/md';
import { motion } from 'framer-motion';

// --- Framer Motion Animation Variants ---
const sidebarItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ 
        opacity: 1, 
        x: 0, 
        transition: {
            delay: i * 0.1, // Staggered delay
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    }),
};

// Define all dashboard and main links here for clean mapping
const dashboardLinks = [
    { to: '/dashboard/myjoinclub', icon: MdJoinInner, label: 'My Joined Clubs', category: 'Dashboard' },
    { to: '/dashboard/myCreatClub', icon: MdOutlineLibraryAdd, label: 'My Created Clubs', category: 'Dashboard' },
    { to: '/dashboard/settings', icon: MdSettings, label: 'Settings', category: 'Dashboard' }, 
];

const mainLinks = [
    { to: '/', icon: MdHome, label: 'Homepage', category: 'Main' },
    { to: '/showAllClub', icon: MdPeopleAlt, label: 'Show All Clubs', category: 'Main' },
    { to: '/creatAClub', icon: MdOutlineCreate, label: 'Create A Club', category: 'Main' },
    { to: '/blog', icon: MdArticle, label: 'Blog', category: 'Main' },
];

const Dashboard = () => {
    const accentColor = "indigo-600";

    const sidebarContent = (
        <div className="flex min-h-full flex-col items-start bg-gray-900 w-64 text-gray-100 p-4 shadow-2xl">
            
            {/* Logo/Title */}
            <div className="text-2xl font-extrabold text-white my-6 px-3">
                <MdDashboard className="inline-block mr-2 text-3xl text-indigo-400" />
                ClubVerse Dashboard
            </div>

            {/* --- Sidebar content here --- */}
            <ul className="menu w-full grow space-y-2">
                
                {/* Dashboard Header */}
                <li className="menu-title text-indigo-400 font-bold uppercase text-xs pt-4">Your Panel</li>
                
                {dashboardLinks.map((item, index) => (
                    <motion.li
                        key={item.to}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={sidebarItemVariants}
                        whileHover={{ scale: 1.02, backgroundColor: '#374151' }} // Subtle hover on li
                        className="rounded-lg"
                    >
                        {/* Use NavLink for active styling */}
                        <NavLink
                            to={item.to}
                            className={({ isActive }) => 
                                `flex items-center gap-3 p-3 rounded-lg text-lg transition-colors duration-200 
                                ${isActive ? `bg-indigo-700 text-white shadow-md font-semibold` : `text-gray-300 hover:bg-gray-700`}`
                            }
                        >
                            <item.icon className="text-xl" />
                            <span>{item.label}</span>
                        </NavLink>
                    </motion.li>
                ))}

                <div className="divider my-4 border-gray-700"></div>

                {/* Main Navigation Header */}
                <li className="menu-title text-indigo-400 font-bold uppercase text-xs">App Navigation</li>

                {mainLinks.map((item, index) => (
                    <motion.li
                        key={item.to}
                        custom={dashboardLinks.length + index} // Continue staggered delay
                        initial="hidden"
                        animate="visible"
                        variants={sidebarItemVariants}
                        whileHover={{ scale: 1.02, backgroundColor: '#374151' }}
                        className="rounded-lg"
                    >
                        <NavLink
                            to={item.to}
                            className={({ isActive }) => 
                                `flex items-center gap-3 p-3 rounded-lg text-lg transition-colors duration-200 
                                ${isActive ? `bg-indigo-700 text-white shadow-md font-semibold` : `text-gray-300 hover:bg-gray-700`}`
                            }
                        >
                            <item.icon className="text-xl" />
                            <span>{item.label}</span>
                        </NavLink>
                    </motion.li>
                ))}
            </ul>
        </div>
    );


    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            
            {/* --- Drawer Content (Main Page Content) --- */}
            <div className="drawer-content bg-gray-100 min-h-screen">
                
                {/* Navbar (Top Bar) */}
                <nav className="navbar w-full bg-white shadow-md h-16 px-4 lg:hidden">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost text-gray-700">
                        {/* Hamburger icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                    <div className="px-4 text-xl font-bold text-gray-800">ClubVerse</div>
                </nav>
                
                {/* Animated Page Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="p-4 sm:p-8"
                >
                    <Outlet />
                </motion.div>
            </div>

            {/* --- Drawer Side (Sidebar) --- */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                {sidebarContent}
            </div>
        </div>
    );
};

export default Dashboard;