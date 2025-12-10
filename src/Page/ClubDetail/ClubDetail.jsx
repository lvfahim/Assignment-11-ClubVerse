import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaMoneyBillWave, FaEnvelope } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { SiClubforce } from 'react-icons/si';
import Loding from '../../Error And Loding Page/Loding';
import CardError from '../../Error And Loding Page/CardError';
import Swal from 'sweetalert2';
import useAuth from '../../Hook/useAuth';

const ClubDetail = () => {
    const { Id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate()
    const { data: club, isLoading, isError } = useQuery({
        queryKey: ['clubDetail', Id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs/${Id}`);
            return res.data;
        }
    });

    if (isLoading) return <Loding />;
    if (isError) return <CardError></CardError>;
    if (!club) return <div className="text-center py-20 text-2xl text-gray-500">Club not found.</div>;


    const handleJoin = () => {
        const joinInfo = {
            ...club,
            clubId: club?._id,
            userEmail: user?.email,
            userName: user?.displayName
        };

        axiosSecure.post('/joinMember', joinInfo)
            .then(res => {
                if (res.data.insertedId) {
                    navigate('/dashboard/myjoinclub');
                    Swal.fire({
                        title: "You joined the club successfully!",
                        icon: "success",
                        draggable: true,
                    });
                }
            })
            .catch(error => {
                if (error.response?.status === 409) {
                    // already joined
                    Swal.fire({
                        title: "You already joined this club!",
                        icon: "warning",
                        draggable: true,
                    });
                } else {
                    Swal.fire({
                        title: "Something went wrong!",
                        icon: "error",
                        draggable: true,
                    });
                }
            });
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl mx-auto py-16 px-6"
        >
            {/* Banner */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg mb-8">
                <img
                    src={club.photoUrl}
                    alt={club.clubName}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Club Info */}
            <motion.div
                className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Basic Info */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <SiClubforce className="text-2xl" />
                            <h2 className="text-2xl font-bold">{club.clubName}</h2>
                        </div>

                        <div className="flex items-center gap-2">
                            <MdCategory className="text-xl text-purple-600" />
                            <p className="text-lg font-medium">{club.category}</p>
                        </div>

                        <div className="">
                            <div className='flex items-center gap-4 mt-2 text-gray-700 mb-2'>
                                <span className="flex items-center gap-1">
                                    <FaMapMarkerAlt className="text-red-500" /> {club.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaMoneyBillWave className="text-green-500" /> {club.membershipFee || 0} BDT
                                </span>
                            </div>
                            <div>
                                <span className="flex items-center gap-1">
                                    <FaEnvelope className="text-blue-500" /> {club.managerEmail}
                                </span>
                            </div>
                        </div>

                        <div>
                            <p className="text-xl ">Created At: {new Date(club.createdAt).toLocaleString()}</p>
                            <p className="text-xl ">Status: <span className={`${club.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}`}>{club.status}</span></p>
                        </div>

                        <div className='mt-4'>
                            <button onClick={handleJoin} className='btn bg-linear-to-l to-[#8ABEB9] from-[#002455] text-xl text-white rounded-xl px-6 py-2'>Join Now</button>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1">
                        <h3 className="text-3xl font-semibold mb-2">About this club:</h3>
                        <p className="text-gray-900 text-xl">{club.description || 'No description available.'}</p>
                    </div>
                </div>

                {/* Footer Button */}
                <div className="flex justify-end mt-4">
                    <Link
                        to='/showAllClub'
                        className='btn bg-linear-to-l to-[#8ABEB9] from-[#002455] text-xl text-white rounded-xl px-6 py-2'
                    >
                        Go Back
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ClubDetail;
