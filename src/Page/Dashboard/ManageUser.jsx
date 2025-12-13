import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield, FaUserCheck, FaUserTimes, FaCrown } from 'react-icons/fa'; 
import { FiShieldOff } from "react-icons/fi";
import { motion } from 'framer-motion';
import Loding from '../../Error And Loding Page/Loding';
import Img from '../../assets/user.png'; 
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router';
import useAuth from '../../Hook/useAuth';

// --- Framer Motion Variants ---
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, staggerChildren: 0.05 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

const ManageUser = () => {
    const Axios = useAxiosSecure();
    const Navigate =useNavigate();
    const {LogOut}=useAuth()
    const { refetch, data: users = [], isPending, isError, error } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await Axios.get('/user');
            return res.data;
        }
    });

    // --- Loading & Error States ---
    if (isPending) {
        return <Loding />;
    }

    if (isError) {
        return <div className="p-8 text-center text-red-600">Error fetching users: {error.message}</div>;
    }

    const totalUsers = users.length;

    const getRoleBadge = (role) => {
        switch (role) {
            case 'admin':
                return <span className="badge bg-red-600 text-white font-bold gap-2"><FaCrown /> Administrator</span>; // Changed to FaCrown for high privilege
            case 'manager':
                return <span className="badge bg-blue-500 text-white font-bold gap-2"><FaUserCheck /> Manager</span>;
            default:
                return <span className="badge bg-gray-200 text-gray-700 font-medium gap-2"><FaUserTimes /> Member</span>;
        }
    };

    const userManagementButton = (user, newRole) => {
        const roleInfo = { role: newRole };
        const actionText = newRole === 'member' ? 'Demote' : (newRole === 'admin' ? 'Promote to Admin' : 'Assign Manager');
        const confirmText = `Are you sure you want to change **${user.displayName || user.email}**'s role to **${newRole.toUpperCase()}**?`;

        Swal.fire({
            title: `${actionText}?`,
            html: confirmText,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${actionText}`
        }).then((result) => {
            if (result.isConfirmed) {

                Axios.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch(); 
                            Swal.fire({
                                title: "Success!",
                                text: `The role for ${user.displayName || user.email} has been updated to ${newRole.toUpperCase()}.`,
                                icon: "success"
                            });
                        } else {
                            Swal.fire("Update Failed", "Role was not modified.", "info");
                        }
                    })
                    .catch(err => {
                        console.error("Role update error:", err);
                        Swal.fire("Error", "Failed to update role. Check server logs.", "error")
                        LogOut()
                        .then(()=>{
                            
                        })
                        Navigate('/auth/login')
                    });

            }
        });

    };

    // --- Action Handlers (Simplified) ---
    const handleSetRole = (user, role) => {
        if (user.role !== role) {
            userManagementButton(user, role);
        }
    };


    return (
        <motion.div
            className="p-4 md:p-8 bg-white min-h-full rounded-lg shadow-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2 border-b pb-2">
                👤 Manage All Users ({totalUsers})
            </h1>
            <p className="text-gray-500 mb-8">
                View and manage user roles within the platform.
            </p>

            {totalUsers === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <h2 className="text-xl text-gray-600 font-semibold">No users found.</h2>
                </div>
            ) : (
                <div className="overflow-x-auto border rounded-lg shadow-inner">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                            <tr>
                                <th>#</th>
                                <th>User Info</th>
                                <th>Role</th>
                                <th>Created On</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <motion.tbody variants={containerVariants}>
                            {users.map((user, index) => (
                                <motion.tr
                                    key={user._id}
                                    className="hover:bg-gray-50 transition-colors"
                                    variants={itemVariants}
                                >

                                    {/* 1. Index */}
                                    <th>{index + 1}</th>

                                    {/* 2. User Info (Photo, Name, Email) */}
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img
                                                        src={user.photoURL || Img}
                                                        alt={user.displayName || user.email}
                                                        onError={(e) => { e.target.onerror = null; e.target.src = Img }} // Use local default image Img for fallback
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{user.displayName || 'N/A'}</div>
                                                <div className="text-sm opacity-50">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* 3. Role */}
                                    <td>
                                        {getRoleBadge(user.role)}
                                    </td>

                                    {/* 4. Created At */}
                                    <td className="text-sm text-gray-500">
                                        {user.creatAt ? new Date(user.creatAt).toLocaleDateString() : 'N/A'}
                                    </td>

                                    {/* 5. Actions: Promote/Demote Buttons */}
                                    <td className="space-x-1">

                                        {/* Button to make Admin */}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleSetRole(user, 'admin')}
                                            disabled={user.role === 'admin'}
                                            className={`btn btn-xs ${user.role === 'admin' ? 'bg-red-200 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'}  tooltip tooltip-info`}
                                            data-tip="Make Admin"
                                        >
                                            <FaUserShield />
                                        </motion.button>

                                        {/* Button to make Manager */}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleSetRole(user, 'manager')}
                                            disabled={user.role === 'manager' || user.role === 'admin'} // Disable if already Manager or Admin
                                            className={`btn btn-xs ${user.role === 'manager' || user.role === 'admin' ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white '} tooltip tooltip-info`}
                                            data-tip="Make Manager"
                                        >
                                            <FaUserCheck />
                                        </motion.button>

                                        {/* Button to demote to Member */}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleSetRole(user, 'member')}
                                            disabled={user.role === 'member'}
                                            className={`btn btn-xs ${user.role === 'member' ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600 text-white'} tooltip tooltip-info`}
                                            data-tip="Demote to Member"
                                        >
                                            <FiShieldOff />
                                        </motion.button>

                                    </td>

                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                </div>

            )}
        </motion.div>
    );
};

export default ManageUser;