import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAuth from '../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';

const MyPaymentEvent = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: paidClubs = [], isPending, isError, error } = useQuery({
        queryKey: ['paidEvent', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/joinPaymentEvent?email=${user.email}`);
            return res.data;
        }
    });

    if (isPending || loading) {
        return (
            <div className="text-center mt-10">
                <p className="text-xl font-semibold">Loading paid Event list...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center mt-10 text-red-600">
                <p className="text-xl font-semibold">Error fetching data: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold mb-6">💳 My Paid Events ({paidClubs.length})</h2>

            {paidClubs.length === 0 ? (
                <p className="text-lg text-gray-500">You haven't paid for any Event yet.</p>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-50 text-indigo-700 uppercase text-sm">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Tittle</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid On</th>
                                {/* Add more headers if your API returns transaction ID, etc. */}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paidClubs.map((club, index) => (
                                <tr key={club._id || index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-indigo-600">{club.EventName}</div>
                                        <div className="text-xs text-gray-500">{club.customerEmail || 'N/A'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{club.transactionId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{club.clubName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${(club.amount || 0).toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(club.paidAt || club.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyPaymentEvent;