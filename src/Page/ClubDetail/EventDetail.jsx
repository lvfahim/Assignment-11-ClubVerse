import React from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAuth from '../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineLocationOn, MdOutlineAttachMoney, MdOutlineDescription, MdEventNote, MdEventAvailable } from 'react-icons/md';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { FaCheckCircle } from "react-icons/fa";
import { motion } from 'framer-motion';
import Loding from '../../Error And Loding Page/Loding';
import Swal from 'sweetalert2';


const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const EventDetail = () => {
    const { Id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const { data: event, isLoading: eventLoading, isError: eventError, error: eventErrorObj, } = useQuery({
        queryKey: ['EventDetail', Id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/event/${Id}`);
            return res.data;
        },
        enabled: !!Id,
    });

    const { data: joinedEvent = [], isLoading: joinedLoading, } = useQuery({
        queryKey: ['joinedEvent', user?.email],
        queryFn: async () => {
            // *** CHANGE THIS LINE ***
            // Use the endpoint that retrieves events the user paid for/joined: /joinPaymentEvent
            const res = await axiosSecure.get(`/joinPaymentEvent?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
        retry: false,
    });

    // The rest of your logic remains correct based on your backend data structure:
    const alreadyEvent = Boolean(
        event?._id &&
        joinedEvent &&
        Array.isArray(joinedEvent) &&
        joinedEvent.some(j => {
            // j.eventId comes from the documents inserted into PaymentEventCollection/joinEventCollection
            return String(j.eventId) === String(event._id);
        })
    );
    if (authLoading || eventLoading || joinedLoading) {
        return <Loding></Loding>;
    }

    if (eventError) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
                <div className="text-center p-10 bg-white shadow-lg rounded-xl">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Event</h2>
                    <p className="text-gray-600">The event could not be found or an error occurred: {eventErrorObj?.message || 'Unknown Error'}</p>
                </div>
            </div>
        );
    }

    // Check if event data is empty (e.g., if the ID was valid but no event matched)
    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
                <div className="text-center p-10 bg-white shadow-lg rounded-xl">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Event Not Found</h2>
                    <p className="text-gray-500">The requested event with ID: {Id} does not exist.</p>
                </div>
            </div>
        );
    }

    // --- Data Destructuring (based on typical event structure) ---
    const { title, description, eventDate, location, eventFee, clubName, managerEmail } = event;

    // --- Handler for Registration (Placeholder) ---
    const handleRegister = async () => {
        if (!user?.email) {
            Swal.fire({
                title: 'Please login first',
                text: 'You must be logged in to join a club.',
                icon: 'warning'
            });
            navigate('/auth/login');
            return;
        }
        try {
            const paymentInfo = {
                money: event.eventFee,
                eventId: event._id,
                userEmail: user.email,
                EventName: event.title,
                managerEmail: event.managerEmail,
                location: event.location,
                eventFee: event.eventFee,
                status: event.status,
                clubName: event.clubName,
            };

            const res = await axiosSecure.post('/create-checkout-session-event', paymentInfo);
            // redirect to Stripe Checkout
            if (res.data?.url) {
                window.location.href = res.data.url;
            } else {
                throw new Error('No checkout URL returned from server.');
            }
        } catch (err) {
            console.error('Checkout create error:', err);
            Swal.fire({
                title: 'Payment session failed',
                text: 'Unable to start payment. Please try again later.',
                icon: 'error'
            });
        }
    };


    return (
        <motion.div
            className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">

                {/* === Event Header & Title === */}
                <div className="p-8 bg-indigo-600 text-white">
                    <motion.p className="text-sm font-semibold uppercase opacity-80" variants={fadeIn}>
                        <MdEventNote className="inline mr-2 text-lg" /> Event Details
                    </motion.p>
                    <motion.h1
                        className="text-4xl sm:text-5xl font-extrabold mt-1"
                        variants={fadeIn}
                    >
                        {title}
                    </motion.h1>
                    <motion.p className="mt-2 text-indigo-200 text-lg" variants={fadeIn}>
                        Hosted by: <span className="font-bold text-white">{clubName || 'N/A'}</span>
                    </motion.p>
                </div>

                <div className="p-8 md:flex md:gap-8">

                    {/* === Details Column === */}
                    <div className="md:w-2/3">
                        <motion.h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2" variants={fadeIn}>
                            <MdOutlineDescription className="inline mr-2 text-indigo-500" /> Event Description
                        </motion.h2>
                        <motion.p className="text-gray-700 mb-8 leading-relaxed" variants={fadeIn}>
                            {description || "No detailed description provided for this event."}
                        </motion.p>

                        <motion.div className="space-y-4" variants={fadeIn}>

                            <motion.h3 className="text-xl font-bold text-gray-800 pt-4 border-t" variants={fadeIn}>
                                Key Information
                            </motion.h3>

                            {/* Date */}
                            <div className="flex items-center text-gray-700">
                                <FaCalendarAlt className="text-xl mr-4 text-indigo-500 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold">Date & Time</p>
                                    <p>{eventDate ? new Date(eventDate).toLocaleString() : "TBD"}</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center text-gray-700">
                                <MdOutlineLocationOn className="text-2xl mr-4 text-red-500 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold">Location</p>
                                    <p>{location || 'Online/Virtual Event'}</p>
                                </div>
                            </div>

                            {/* Organizer */}
                            <div className="flex items-center text-gray-700">
                                <FaUsers className="text-xl mr-4 text-gray-500 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold">Organizer Email</p>
                                    <p className="text-sm">{managerEmail || 'N/A'}</p>
                                </div>
                            </div>
                            <Link to='/showAllEvent'
                                className='btn bg-linear-to-l to-[#8ABEB9] from-[#002455] text-xl text-white' >
                                Go Back
                            </Link>
                        </motion.div>
                    </div>

                    {/* === Action/Fee Column === */}
                    <motion.div
                        className="md:w-1/3 mt-8 md:mt-0 p-6 bg-indigo-50 rounded-lg shadow-inner flex flex-col items-center justify-center space-y-6"
                        variants={fadeIn}
                    >
                        <div className="text-center">
                            <MdOutlineAttachMoney className="text-6xl text-green-700 mx-auto mb-2" />
                            <p className="text-2xl text-gray-800 font-semibold">Event Fee</p>
                            <p className="text-4xl font-extrabold text-green-600">
                                {eventFee > 0 ? `$${eventFee.toFixed(2)}` : 'FREE'}
                            </p>
                            {eventFee > 0 && (
                                <p className="text-sm text-gray-500 mt-1">Payment required upon registration.</p>
                            )}
                        </div>


                        {alreadyEvent ? (
                            <button
                                className="btn w-full bg-gray-500 text-white flex items-center justify-center gap-2 px-1 py-3 font-bold text-lg rounded-lg cursor-not-allowed"
                                disabled
                            >
                                <FaCheckCircle className="text-2xl" />
                                Already Registered
                            </button>
                        ) : (
                            <button
                                onClick={handleRegister}
                                className={`btn w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 px-1 py-3 font-bold text-lg rounded-lg transition-colors duration-300 transform shadow-lg `}
                            >
                                <MdEventAvailable className="text-2xl" />
                                {eventFee > 0 ? 'Register and Pay' : 'Register Now (Free)'}
                            </button>
                        )}



                        {/* <button
                            onClick={handleRegister}
                            className={`btn w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 px-1 py-3 font-bold text-lg rounded-lg transition-colors duration-300 transform shadow-lg `}
                        >
                            <MdEventAvailable className="text-2xl" />
                            {eventFee > 0 ? 'Register and Pay' : 'Register Now (Free)'}
                        </button> */}

                        <p className="text-xs text-gray-500">
                            {user ? `Logged in as ${user.email}` : 'Log in to register.'}
                        </p>

                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default EventDetail;