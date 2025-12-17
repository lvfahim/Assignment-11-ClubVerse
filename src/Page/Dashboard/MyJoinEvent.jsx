import React from 'react';
import useAuth from '../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Error And Loding Page/Loding';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { FaCalendarCheck, FaTag, FaClipboardList, FaRegMoneyBillAlt } from 'react-icons/fa';

const MyJoinEvent = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: event = [], isPending, isError, error } = useQuery({
        queryKey: ['myJoinedEvents', user?.email],
        // Ensure data fetching only happens if user is authenticated and not loading
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            // Based on your backend, this endpoint returns the list of events the user joined/paid for.
            const res = await axiosSecure.get(`/joinPaymentEvent?email=${user.email}`);
            return res.data;
        }
    });

    if (loading || isPending) {
        // Using the corrected component name
        return <Loading />;
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
                <div className="text-center p-10 bg-white shadow-lg rounded-xl">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Events</h2>
                    <p className="text-gray-600">Failed to fetch your joined events: {error.message}</p>
                </div>
            </div>
        );
    }

    const totalEvents = event.length;

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-indigo-700 flex items-center">
                    <FaClipboardList className="mr-3" /> My Joined Events ({totalEvents})
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                    You have successfully registered for **{totalEvents}** {totalEvents === 1 ? 'event' : 'events'}.
                </p>
            </header>
            <title>My join Events</title>
            {totalEvents === 0 ? (
                <div className="text-center p-10 border-4 border-dashed border-gray-300 rounded-xl bg-white">
                    <FaCalendarCheck className="text-6xl text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-600 font-semibold">
                        You haven't joined any events yet.
                    </p>
                    <p className="text-gray-500 mt-2">Find exciting events and register to participate!</p>
                </div>
            ) : (
                <div className="shadow-2xl rounded-xl overflow-hidden bg-white">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            {/* Table Head */}
                            <thead className="bg-indigo-600 text-white">
                                <tr>
                                    <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider">
                                        Event Details
                                    </th>
                                    <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider">
                                        Hosted By
                                    </th>
                                    <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider">
                                        Fee
                                    </th>
                                    <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider">
                                        Transaction ID
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="bg-white divide-y divide-gray-200">
                                {event.map((item, index) => (
                                    <tr key={item.eventId} className="hover:bg-indigo-50 transition duration-150">
                                        {/* Index */}
                                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {index + 1}
                                        </td>

                                        {/* Event Details */}
                                        <td className="py-4 px-6 text-sm text-gray-700">
                                            <div className="font-bold text-indigo-700">{item.EventName || 'N/A'}</div>
                                            <div className="text-xs text-gray-500 flex items-center">
                                                <FaTag className="mr-1" /> ID: {item.eventId}
                                            </div>
                                            <div className="text-xs text-gray-500 flex items-center mt-1">
                                                <FaCalendarCheck className="mr-1" /> Joined On: {item.paidAt ? new Date(item.paidAt).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </td>

                                        {/* Club Name */}
                                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                                            {item.clubName || 'Unknown Club'}
                                        </td>

                                        {/* Amount Paid */}
                                        <td className="py-4 px-6 whitespace-nowrap text-sm font-semibold">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${item.amount > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                <FaRegMoneyBillAlt className="mr-1" />
                                                ${(item.amount || 0).toFixed(2)}
                                            </span>
                                        </td>

                                        {/* Transaction ID */}
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            <span className="block max-w-xs truncate">{item.transactionId || 'N/A'}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyJoinEvent;