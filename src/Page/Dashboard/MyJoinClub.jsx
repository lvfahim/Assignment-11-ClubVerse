import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hook/useAuth';
import { FaCheckCircle, FaHourglassHalf, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import Loding from '../../Error And Loding Page/Loding';
import { Link } from "react-router";


const MyJoinedClubs = () => {
    const { user, loading } = useAuth(); 
    const axiosSecure = useAxiosSecure();

    const { data: clubs = [], isPending, isError, error } = useQuery({
        queryKey: ['myJoinedClubs', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/joinMember?email=${user.email}`);
            return res.data;
        }
    });


    if (loading || isPending) {
        return <Loding></Loding>
    }

    if (isError) {
        return <div className="p-8 text-center text-red-600">Error loading joined clubs: {error.message}</div>;
    }

    const totalClubs = clubs.length;

    return (
        <div className="p-4 md:p-8 bg-white min-h-full rounded-lg shadow-xl">
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 border-b pb-2">
             My Joined Clubs ({totalClubs})
            </h1>
            <p className="text-gray-500 mb-8">
                Manage your memberships and track the status of your club applications.
            </p>

            {totalClubs === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <FaUsers className="text-6xl text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-600 font-semibold">
                        You haven't joined any clubs yet.
                    </p>
                    <Link to="/showAllClub" className="btn btn-primary mt-4 bg-indigo-600 hover:bg-indigo-700 text-white border-0">
                        Explore Clubs Now
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto border rounded-lg shadow-inner">
                    <table className="table table-zebra w-full">
                        {/* Table Head */}
                        <thead className="bg-indigo-50 text-indigo-700 uppercase text-sm">
                            <tr>
                                <th>#</th>
                                <th>Club Name</th>
                                <th>Category</th>
                                <th>Location</th>
                                <th>Membership Status</th>
                                <th>Fee</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {clubs.map((club, index) => (
                                <tr key={club._id} className="hover:bg-gray-50 transition-colors">
                                    {/* 1. Index */}
                                    <th>{index + 1}</th>

                                    {/* 2. Club Name */}
                                    <td>
                                        <div className="font-bold text-gray-800">{club.clubName}</div>
                                        <div className="text-sm opacity-50">{club.managerEmail} (Manager)</div>
                                    </td>

                                    {/* 3. Category */}
                                    <td>{club.category}</td>

                                    {/* 4. Location */}
                                    <td><FaMapMarkerAlt className="inline mr-1 text-red-500" /> {club.location}</td>

                                    {/* 5. Status */}
                                    <td>
                                        {club.status === 'approved' ? (
                                            <span className="badge badge-lg bg-green-100 text-green-700 border-green-300 gap-2">
                                                <FaCheckCircle /> Approved
                                            </span>
                                        ) : (
                                            <span className="badge badge-lg bg-yellow-100 text-yellow-700 border-yellow-300 gap-2">
                                                <FaHourglassHalf /> Pending
                                            </span>
                                        )}
                                    </td>

                                    {/* 6. Membership Fee */}
                                    <td className="font-mono text-gray-700">${club.membershipFee}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyJoinedClubs;