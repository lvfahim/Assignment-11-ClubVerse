import React from 'react';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineLocationOn, MdOutlineAttachMoney, MdOutlineDescription } from 'react-icons/md';
import { FaRegCalendarAlt, FaCalendarCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Loding from '../Error And Loding Page/Loding';
import { Link } from 'react-router';

// Framer Motion variants for card staggering and fade-in
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            when: "beforeChildren",
            staggerChildren: 0.1
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            duration: 0.4
        }
    },
};

const ShowAllEvent = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all events (aliased as 'allEvents' for readability, though your query uses 'clubs')
    const { data: allEvents = [], isLoading, isError, error } = useQuery({
        // Note: I've updated the alias and query key for clarity in the final component
        queryKey: ['allEvents'],
        queryFn: async () => {
            const res = await axiosSecure.get('/event');
            return res.data;
        }
    });

    if (isLoading) return <Loding />;

    if (isError) return (
        <div className="container mx-auto p-8 text-center text-red-600 bg-white rounded-lg shadow-md">
            Error loading events: {error?.message || "Could not connect to the server."}
        </div>
    );

    const totalEvents = allEvents.length;

    return (
        <div className="w-full py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">

                {/* === Page Header === */}
                <h1 className="text-4xl font-extrabold  mb-2 border-b-4  pb-3 flex items-center">
                    <FaCalendarCheck className="mr-3 " /> Discover All Events ({totalEvents})
                </h1>
                <p className="text-gray-600 mb-12">
                    Check out all the public events scheduled by various clubs across the platform.
                </p>

                {/* === Content Area === */}
                {totalEvents === 0 ? (
                    <motion.div
                        className="text-center py-20 bg-white rounded-xl shadow-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <FaRegCalendarAlt className="text-7xl text-gray-400 mx-auto mb-4" />
                        <p className="text-2xl text-gray-700 font-semibold">
                            No public events are scheduled yet.
                        </p>
                        <p className="text-md text-gray-500 mt-2">
                            Check back soon for new club activities!
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {allEvents.map((event) => (
                            <motion.div
                                key={event._id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
                                variants={itemVariants}
                            >
                                <div className="p-6 flex-grow">
                                    <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full mb-3 inline-block">
                                        {event.clubName || 'N/A Club'}
                                    </span>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {event.title}
                                    </h2>
                                    <div className="flex items-start text-sm text-gray-600 mb-4 h-12 overflow-hidden">
                                        <MdOutlineDescription className="mt-1 mr-2 text-indigo-500 flex-shrink-0" />
                                        <p className="line-clamp-2">{event.description || 'No detailed description available.'}</p>
                                    </div>

                                    <div className="space-y-3 mt-4 border-t pt-4">
                                        {/* Date */}
                                        <div className="flex items-center text-gray-700 text-sm">
                                            <FaRegCalendarAlt className="mr-3 text-indigo-500 flex-shrink-0" />
                                            <span className="font-medium">
                                                {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : "TBD"}
                                            </span>
                                        </div>

                                        {/* Location */}
                                        <div className="flex items-center text-gray-700 text-sm">
                                            <MdOutlineLocationOn className="mr-3 text-red-500 flex-shrink-0" />
                                            <span className="truncate">{event.location || 'Online/Virtual'}</span>
                                        </div>

                                        {/* Fee */}
                                        <div className="flex items-center text-gray-700 text-sm">
                                            <MdOutlineAttachMoney className="mr-3 text-green-600 flex-shrink-0" />
                                            <span className="font-bold text-green-700">
                                                {(event.eventFee > 0 ? `$${event.eventFee.toFixed(2)}` : 'Free')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="p-6 pt-0 mt-auto">
                                    <Link
                                        to={`/showAllEvent/${event._id}`}
                                     className="w-full btn bg-linear-to-l to-[#8ABEB9] from-[#002455] text-xl  hover:bg-indigo-700 text-white border-0 py-3 rounded-lg font-semibold transition duration-150">
                                     View Details & Register  
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ShowAllEvent;