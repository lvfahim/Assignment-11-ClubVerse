import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarDay, FaTag } from 'react-icons/fa';
import { MdOutlineLocationOn, MdOutlineAttachMoney, MdOutlineDescription } from 'react-icons/md';
import { FaRegCalendarAlt } from "react-icons/fa";
import Loding from '../../Error And Loding Page/Loding';
import { FaSortAmountDown } from "react-icons/fa";
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const MostChipEvent = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: events = [],
        isLoading,
        isError
    } = useQuery({
        queryKey: ['mostChepeEvent'],
        queryFn: async () => {
            // Fetch data from the assumed endpoint
            const res = await axiosSecure.get('/someEvent');
            return res.data;
        }
    });

    const sortedEvents = [...events].sort((a, b) => (b.eventFee || 0) - (a.eventFee || 0));

    // --- Loading State ---
    if (isLoading) {
        return <Loding />;
    }

    // --- Error State ---
    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
                <div className="text-center p-10 bg-white shadow-lg rounded-xl">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Events</h2>
                    <p className="text-gray-600">Failed to fetch event data. Please try again later.</p>
                </div>
            </div>
        );
    }

    // --- Empty State ---
    if (events.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
                <div className="text-center p-10 bg-white shadow-lg rounded-xl">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">No Events Found</h2>
                    <p className="text-gray-600">There are currently no events listed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='w-10/12 mx-auto'>
            <div className="p-4 sm:p-8 bg-gray-50">
                <header className="mb-12 text-center pb-4">
                    <h1 className="lg:text-3xl text-2xl font-extrabold text-blue-700 flex items-center">
                        <FaTag className="mr-3" /> Most Affordable Events
                    </h1>
                    <p className="mt-2 text-gray-600 flex  items-center md:items-start">
                        <FaSortAmountDown className='mr-1' /> Events sorted by price, cheapest first.
                    </p>
                </header>

                {/* --- Event Cards Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sortedEvents.map((event) => (
                        <motion.div
                            key={event._id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
                        // variants={itemVariants}
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
                            <div className="p-6  pt-0 mt-auto">
                                <Link
                                    to={`/showAllEvent/${event._id}`}
                                    className="w-full py-8 btn bg-linear-to-l to-[#8ABEB9] from-[#002455] text-xl  hover:bg-indigo-700 text-white border-0 lg:py-3 rounded-lg font-semibold transition duration-150">
                                    View Details & Register
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MostChipEvent;