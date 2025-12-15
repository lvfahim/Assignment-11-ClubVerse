import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAuth from '../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FaMoneyBillWave, FaChartLine, FaClipboardList, FaUsers, FaDollarSign } from 'react-icons/fa'; 
import { MdOutlineDateRange, MdOutlinePriceCheck } from 'react-icons/md';
import Loding from '../../Error And Loding Page/Loding';

// --- 1. NEW: Club Revenue Chart Component (Uses Live Payment Data) ---
const ClubRevenueChart = ({ payments }) => {
    // 1. Group payments by clubName and sum the amounts
    const revenueByClub = payments.reduce((acc, payment) => {
        const clubName = payment.clubName || 'Unassigned Club';
        const amount = payment.amount || 0;
        acc[clubName] = (acc[clubName] || 0) + amount;
        return acc;
    }, {});

    // 2. Convert the map into an array of objects for mapping and sorting
    let chartData = Object.keys(revenueByClub).map(clubName => ({
        club: clubName,
        revenue: revenueByClub[clubName],
    }));

    // Sort by revenue descending (highest earner on top/bottom)
    chartData.sort((a, b) => b.revenue - a.revenue);

    // 3. Determine the maximum revenue for scaling the bars
    const maxRevenue = chartData.length > 0 ? chartData[0].revenue : 1;
    // Set a minimum scale max to prevent dividing by zero if data is empty or zero.
    const chartScaleMax = maxRevenue > 0 ? maxRevenue : 1000;


    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaDollarSign className="text-green-500 mr-2" />
                Club Revenue Distribution (Live)
            </h2>
            {chartData.length === 0 ? (
                <p className="text-gray-500">No revenue data to display.</p>
            ) : (
                <div className="space-y-4">
                    {chartData.map((item, index) => {
                        // Calculate percentage of the maximum revenue club
                        const percentage = (item.revenue / chartScaleMax) * 100;

                        return (
                            <div key={index} className="flex items-center">
                                {/* Club Name Label */}
                                <div className="w-24 text-sm text-gray-700 font-semibold truncate" title={item.club}>
                                    {item.club}
                                </div>

                                {/* Bar Container */}
                                <div className="flex-1 h-6 ml-4 bg-gray-200 rounded-full relative overflow-hidden">
                                    {/* Bar */}
                                    <div
                                        style={{ width: `${percentage}%` }}
                                        className="h-full bg-teal-500 transition-all duration-500 ease-out flex items-center justify-end pr-2"
                                    >
                                        {/* Revenue Label (placed inside the bar if large enough, or outside) */}
                                        <span className="text-xs font-bold text-white whitespace-nowrap">
                                            ${item.revenue.toFixed(2)}
                                        </span>
                                    </div>
                                    {/* Fallback label for small bars */}
                                    {percentage < 20 && (
                                        <span className="absolute top-0 left-full ml-2 text-xs font-semibold text-gray-700 whitespace-nowrap">
                                            ${item.revenue.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Legend/Scale Hint */}
            <div className="flex justify-end text-xs text-gray-400 mt-4 border-t pt-2">
                <span>Max Revenue: ${chartScaleMax.toFixed(2)}</span>
            </div>
        </div>
    );
};


// --- 2. MAIN COMPONENT (AllPaymentForClubs) ---
const AllPaymentForClubs = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: allPayment = [], isPending, isError, error } = useQuery({
        queryKey: ['paymentClubs', user?.email],
        queryFn: async () => {
            // Ensure club payments are fetched
            const res = await axiosSecure.get('/allPaymentClub');
            return res.data;
        },
        enabled: !loading && !!user?.email,
    });

    // Calculate Total Payment
    const totalPayment = allPayment.reduce((sum, payment) => sum + (payment.amount || 0), 0);

    // --- Loading and Error States ---
    if (loading || isPending) {
        return <Loding />;
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
                <div className="text-center p-10 bg-white shadow-lg rounded-xl">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Payment Data</h2>
                    <p className="text-gray-600">Failed to fetch club payment data: {error.message}</p>
                </div>
            </div>
        );
    }

    const totalTransactions = allPayment.length;

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-teal-700 flex items-center">
                    <FaChartLine className="mr-3" /> All Club Payment Transactions
                </h1>
                <p className="mt-2 text-gray-600">
                    Overview of all membership and club-related financial activities.
                </p>
            </header>

            {/* --- Summary Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Total Revenue */}
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between border-b-4 border-teal-500">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                        <p className="text-3xl font-bold text-teal-600 mt-1 flex items-center">
                            <FaMoneyBillWave className="mr-2 text-2xl" />
                            ${totalPayment.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Total Transactions */}
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between border-b-4 border-indigo-500">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Transactions</p>
                        <p className="text-3xl font-bold text-indigo-600 mt-1 flex items-center">
                            <FaClipboardList className="mr-2 text-2xl" />
                            {totalTransactions}
                        </p>
                    </div>
                </div>

                {/* Average Payment per Transaction (Simple Calculation) */}
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between border-b-4 border-yellow-500">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Average Payment</p>
                        <p className="text-3xl font-bold text-yellow-600 mt-1 flex items-center">
                            <MdOutlinePriceCheck className="mr-2 text-2xl" />
                            ${totalTransactions > 0 ? (totalPayment / totalTransactions).toFixed(2) : '0.00'}
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Club Revenue Chart Section (New Live Chart) --- */}
            {/* This component now uses the actual fetched payment data */}
            <ClubRevenueChart payments={allPayment} />

            {/* --- Data Table --- */}
            <h2 className="text-2xl font-bold text-teal-700 mb-4 mt-8 flex items-center">
                Transaction Details
            </h2>
            {totalTransactions === 0 ? (
                <div className="text-center p-10 border-4 border-dashed border-gray-300 rounded-xl bg-white">
                    <FaUsers className="text-6xl text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-600 font-semibold">
                        No payment transactions recorded yet.
                    </p>
                </div>
            ) : (
                <div className="shadow-2xl rounded-xl overflow-hidden bg-white">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            {/* Table Head */}
                            <thead className="bg-teal-600 text-white">
                                <tr>
                                    <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider">
                                        Club Name
                                    </th>
                                    <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider">
                                        Customer Email
                                    </th>
                                    <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider">
                                        Transaction ID
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="bg-white divide-y divide-gray-200">
                                {allPayment.map((payment, index) => (
                                    <tr key={payment._id || index} className="hover:bg-teal-50 transition duration-150">
                                        {/* Index */}
                                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {index + 1}
                                        </td>

                                        {/* Club Name */}
                                        <td className="py-4 px-6 text-sm font-semibold text-teal-700">
                                            {payment.clubName || 'N/A'}
                                        </td>

                                        {/* Customer Email */}
                                        <td className="py-4 px-6 text-sm text-gray-700">
                                            {payment.customerEmail || 'Unknown User'}
                                        </td>

                                        {/* Amount */}
                                        <td className="py-4 px-6 whitespace-nowrap text-sm font-bold">
                                            <span className="text-green-600">
                                                ${(payment.amount || 0).toFixed(2)}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 flex items-center">
                                            <MdOutlineDateRange className="mr-1" />
                                            {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : 'N/A'}
                                        </td>

                                        {/* Transaction ID */}
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            <span className="block max-w-xs truncate font-mono text-xs">
                                                {payment.transactionId || 'N/A'}
                                            </span>
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

export default AllPaymentForClubs;