import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAuth from '../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineEvent, MdOutlineLocationOn, MdOutlineAttachMoney } from 'react-icons/md';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion'; // <-- IMPORTED motion
import Loding from '../../Error And Loding Page/Loding';

// Framer Motion variants for the main container
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

// Framer Motion variants for the individual table rows (Staggering effect)
const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

const MyCreatedEvent = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    // Fetch events created by the user
    const { data: createdEvents = [], isPending, isError, error } = useQuery({
        queryKey: ['createdEvents', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myCreatEvent?email=${user.email}`);
            return res.data;
        }
    });

    if (loading || isPending) return <Loding></Loding>;

    if (isError) return (
        <div className="p-8 text-center text-red-600">
            Error loading events: {error.message}
        </div>
    );

    const totalEvents = createdEvents.length;

    return (
        <motion.div // <-- motion.div added here
            className="p-4 md:p-8 bg-white min-h-full rounded-lg shadow-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 border-b pb-2 flex items-center">
                <FaRegCalendarAlt className="mr-3" /> My Created Events ({totalEvents})
            </h1>
            <p className="text-gray-500 mb-8">
                View and manage the events you have scheduled for your clubs.
            </p>

            {totalEvents === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <MdOutlineEvent className="text-6xl text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-600 font-semibold">
                        You haven't created any events yet.
                    </p>
                    <p className="text-md text-gray-500 mt-2">
                        Create events from your **My Created Clubs** page.
                    </p>
                </div>
            ) : (
                <motion.div // <-- motion.div added here for table container
                    className="overflow-x-auto border rounded-lg shadow-inner"
                    // Optional: Add staggering for table rows
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.05 }}
                >
                    <table className="table table-zebra w-full">
                        <thead className="bg-indigo-50 text-indigo-700 uppercase text-sm">
                            <tr>
                                <th>#</th>
                                <th>Event Title / Club</th>
                                <th>Date & Time</th>
                                <th>Location</th>
                                <th>Fee</th>
                                <th>ManagerEmail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {createdEvents.map((event, index) => (
                                <motion.tr // <-- motion.tr added here
                                    key={event._id}
                                    className="hover:bg-gray-50 transition-colors"
                                    variants={itemVariants} // Applies the stagger effect
                                >
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="font-bold text-gray-800">{event.title}</div>
                                        <div className="text-sm opacity-50">Club Name: {event.clubName}</div>
                                    </td>
                                    <td className="text-gray-700">
                                        {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : "N/A"}
                                    </td>
                                    <td className="text-gray-700 flex items-center gap-1">
                                        <MdOutlineLocationOn className="text-lg text-red-500" />
                                        {event.location}
                                    </td>
                                    <td className="text-green-600 font-bold">
                                        <div className="flex items-center gap-1">
                                            <MdOutlineAttachMoney />
                                            {(event.eventFee > 0 ? event.eventFee.toFixed(2) : 'Free')}
                                        </div>
                                    </td>
                                    <td className="space-x-2">
                                        {event.managerEmail}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </motion.div>
    );
};

export default MyCreatedEvent;