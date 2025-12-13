import React, { useState } from 'react';
import useAuth from '../../Hook/useAuth';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loding from '../../Error And Loding Page/Loding';
import { FaEdit, FaUsers, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
// Framer Motion variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const MyCreatClub = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset } = useForm();

    const [selectedClubId, setSelectedClubId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch clubs created by the user
    const { data: clubs = [], isPending, isError, error } = useQuery({
        queryKey: ['myCreatedClubs', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/joinCreatedClub?email=${user.email}`);
            return res.data;
        }
    });

    // --- Functions ---
    const handleViewMembers = (clubId) => {
        console.log(`Viewing members for club ID: ${clubId}`);
        toast("It's being worked on, please try again later.")

    };

    const handleEditClub = (club) => {
        setSelectedClubId(club._id);
        reset(club);
        setIsModalOpen(true);
    };

    const handleUpdateSubmit = async (data) => {
        try {
            const res = await axiosSecure.patch(`/joinCreatedClub/${selectedClubId}`, data);

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Club updated successfully!",
                    icon: "success",
                    draggable: true
                });
                queryClient.invalidateQueries(['myCreatedClubs']);
                setIsModalOpen(false);
            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    // --- Loading & Error States ---
    if (loading || isPending) return <Loding />;

    if (isError) return (
        <div className="p-8 text-center text-red-600">
            Error loading created clubs: {error.message}
        </div>
    );

    const totalClubs = clubs.length;

    return (
        <motion.div
            className="p-4 md:p-8 bg-white min-h-full rounded-lg shadow-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 border-b pb-2">
                🏆 My Created Clubs ({totalClubs})
            </h1>
            <p className="text-gray-500 mb-8">
                Manage your club settings, view applications, and monitor membership.
            </p>

            {totalClubs === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <FaUsers className="text-6xl text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-600 font-semibold">
                        You haven't created any clubs yet.
                    </p>
                    <Link
                        to="/creatAClub"
                        className="btn btn-primary mt-4 bg-indigo-600 hover:bg-indigo-700 text-white border-0"
                    >
                        Start A New Club
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto border rounded-lg shadow-inner">
                    <table className="table table-zebra w-full">
                        <thead className="bg-indigo-50 text-indigo-700 uppercase text-sm">
                            <tr>
                                <th>#</th>
                                <th>Club Name / Category</th>
                                <th>Fee </th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clubs.map((club, index) => (
                                <tr key={club._id} className="hover:bg-gray-50 transition-colors">
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="font-bold text-gray-800">{club.clubName}</div>
                                        <div className="text-sm opacity-50">{club.category}</div>
                                    </td>
                                    <td>
                                        <div className="font-mono text-gray-700">${club.membershipFee || '0'}</div>
                                    </td>
                                    <td className="text-gray-700 font-medium">
                                        {club.createdAt ? new Date(club.createdAt).toLocaleString() : "N/A"}
                                    </td>
                                    <td className="space-x-2">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleViewMembers(club._id)}
                                            className="btn btn-sm btn-info text-white tooltip"
                                            data-tip="View Members"
                                        >
                                            <FaUsers />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleEditClub(club)}
                                            className="btn btn-sm btn-warning text-white tooltip"
                                            data-tip="Edit Club"
                                        >
                                            <FaEdit />
                                        </motion.button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Modal */}
            {isModalOpen && (
                <dialog open className="modal">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="modal-box bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200 rounded-xl"
                    >
                        <h3 className="font-bold text-2xl text-indigo-600 mb-4 text-center">✨ Edit Club</h3>
                        <form onSubmit={handleSubmit(handleUpdateSubmit)} className="space-y-5">
                            <div>
                                <label className="font-semibold text-gray-700">Club Name</label>
                                <input
                                    type="text"
                                    {...register('clubName', { required: true })}
                                    className="input input-bordered w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter Club Name"
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-gray-700">Category</label>
                                <input
                                    type="text"
                                    {...register('category', { required: true })}
                                    className="input input-bordered w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter Category"
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-gray-700">Membership Fee</label>
                                <input
                                    type="number"
                                    {...register('membershipFee', { required: true })}
                                    className="input input-bordered w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter Fee"
                                />
                            </div>
                            <div className="modal-action flex justify-between items-center mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn bg-gray-200 text-gray-700 border-0 hover:bg-gray-300 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-0 rounded-lg shadow-md"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </dialog>
            )}
            <ToastContainer />
        </motion.div>
    );
};

export default MyCreatClub;
