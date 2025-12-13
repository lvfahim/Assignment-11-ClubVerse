import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loding from '../../Error And Loding Page/Loding';
import { FaCheck, FaTimes, FaHourglassHalf, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

// Framer Motion Variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const ApproveClub = () => {
    const Axiox = useAxiosSecure();
    const queryClient = useQueryClient();


    const { data: clubs = [], isPending, isError, error } = useQuery({
        queryKey: ['adminClubs', 'pending'],
        queryFn: async () => {
            const res = await Axiox.get('/statusClub');
            return res.data;
        }
    });

    // --- Handlers for Admin Actions ---




    const handleAppeoveAndRejectButtoon = (club, status) => {
        const update = { status:status , email:club.managerEmail};
        Swal.fire({
            title: "Approve Club?",
            text: `Are you sure you want to approve "${club.clubName}"? This action will make the club publicly visible.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#22C55E",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, Approve it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Axiox.patch(`/manager/${club._id}`, update)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            queryClient.invalidateQueries(['adminClubs', 'pending']);

                            Swal.fire({
                                title: "Approved!",
                                text: `The club "${club.clubName}" has been successfully approved.`,
                                icon: "success"
                            });
                        } else {
                            Swal.fire("Action Failed", "Club status was not modified.", "info");
                        }
                    })
                    .catch(err => {
                        console.error("Approval error:", err);
                        Swal.fire("Error", "Failed to communicate with the server.", "error");
                    });
            }
        });
    }


    const handleApprove = (club) => {
        handleAppeoveAndRejectButtoon(club, 'approve')
    }
    const handleReject = (club) => {
        handleAppeoveAndRejectButtoon(club, 'reject')
    }

    // --- Loading & Error States ---
    if (isPending) {
        return <Loding />;
    }

    if (isError) {
        return <div className="p-8 text-center text-red-600">Error fetching clubs: {error.message}</div>;
    }

    const pendingClubsCount = clubs.length;

    return (
        <motion.div
            className="p-4 md:p-8 bg-white min-h-full rounded-lg shadow-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <h1 className="text-3xl font-extrabold text-blue-700 mb-2 border-b pb-2">
                🛡️ Club Approval Queue ({pendingClubsCount})
            </h1>
            <p className="text-gray-500 mb-8">
                Review club applications and take action to approve or reject them.
            </p>

            {pendingClubsCount === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <FaCheck className="text-6xl text-green-500 mx-auto mb-4" />
                    <p className="text-xl text-gray-600 font-semibold">
                        No clubs currently pending approval. All caught up!
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto border rounded-lg shadow-inner">
                    <table className="table table-zebra w-full">
                        {/* Table Head */}
                        <thead className="bg-blue-50 text-blue-700 uppercase text-sm">
                            <tr>
                                <th>#</th>
                                <th>Club Name / Category</th>
                                <th>Manager Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {clubs.map((club, index) => (
                                <tr key={club._id} className="hover:bg-gray-50 transition-colors">

                                    {/* 1. Index */}
                                    <th>{index + 1}</th>

                                    {/* 2. Club Name & Category */}
                                    <td>
                                        <div className="font-bold text-gray-800">{club.clubName}</div>
                                        <div className="text-sm opacity-50">{club.category} ({club.location})</div>
                                    </td>

                                    {/* 3. Manager Email */}
                                    <td>
                                        <div className="font-medium text-gray-700">{club.managerEmail}</div>
                                    </td>

                                    {/* 4. Status */}
                                    <td>
                                        {club.status === 'approve' ? (
                                            <span className="badge badge-lg bg-green-100 text-green-700 border-green-300 gap-2">
                                                <FaCheck /> Approved
                                            </span>
                                        ) : club.status === 'reject' ? (
                                            <span className="badge badge-lg bg-red-100 text-red-700 border-red-300 gap-2">
                                                <FaTimes /> Rejected
                                            </span>
                                        ) : (
                                            <span className="badge badge-lg bg-yellow-100 text-yellow-700 border-yellow-300 gap-2">
                                                <FaHourglassHalf /> Pending
                                            </span>
                                        )}
                                    </td>

                                    {/* 5. Actions (Updated to pass clubName) */}
                                    <td className="space-x-2">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            // Call handleApprove with both ID and Name
                                            onClick={() => handleApprove(club)}
                                            className="btn btn-sm bg-green-500 hover:bg-green-600 text-white tooltip"
                                            data-tip="Approve Club"
                                        >
                                            <FaCheck />
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            // Call handleReject with both ID and Name
                                            onClick={() => handleReject(club)}
                                            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white tooltip"
                                            data-tip="Reject Club"
                                        >
                                            <FaTimes />
                                        </motion.button>

                                        {/* Optional: View Details Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            // Implement view logic, perhaps open a modal with the full description
                                            className="btn btn-sm btn-outline btn-info tooltip"
                                            data-tip="View Details"
                                        >
                                            <FaInfoCircle />
                                        </motion.button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}
            <ToastContainer />
        </motion.div>
    );
};

export default ApproveClub;