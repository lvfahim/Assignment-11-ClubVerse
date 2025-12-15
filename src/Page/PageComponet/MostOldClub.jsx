import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { SiClubforce } from 'react-icons/si';
import Loding from '../../Error And Loding Page/Loding';
import { Link } from 'react-router';

const MostOldClub = () => {
    const axiosSecure = useAxiosSecure();

    const { data: clubs = [], isLoading, isError } = useQuery({
        queryKey: ['mostOldClubs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/someClubs'); 
            return res.data;
        }
    });

    if (isLoading) return <Loding />;
    if (isError) return <div className="text-center py-20 text-2xl text-red-600">Error fetching club data.</div>;
    if (clubs.length === 0) return <div className="text-center py-20 text-2xl text-gray-500">No clubs found.</div>;

    return (
        <div className="w-full py-16 bg-gray-50">
            <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-800">
                Oldest Clubs 📜
            </h2>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {clubs.map((club, index) => (
                    <motion.div
                        key={club._id || index}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ scale: 1.05, y: -2, boxShadow: "0 15px 25px rgba(0,0,0,0.15)" }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-100 flex flex-col"
                    >
                        {/* Club Image */}
                        <div className="relative overflow-hidden">
                            <motion.img
                                src={club.photoUrl}
                                alt={club.clubName}
                                className="w-full h-48 object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        {/* Club Details */}
                        <div className="p-5 flex flex-col flex-grow">
                            <div className="flex gap-2 items-center">
                                <SiClubforce className='text-xl' />
                                <h3 className="text-xl font-bold mb-1 text-gray-900">{club.clubName}</h3>
                            </div>

                            <div className="flex gap-2 items-center">
                                <MdCategory className='text-xl text-blue-500' />
                                <h2 className="text-xl font-bold mb-1 text-gray-900">{club.category}</h2>
                            </div>

                            <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                                <span className="flex items-center gap-1 font-medium">
                                    <FaMapMarkerAlt className="w-3 h-3 text-red-500" /> {club.location}
                                </span>
                                <span className="flex items-center gap-1 font-medium">
                                    <FaMoneyBillWave className="w-3 h-3 text-green-600" /> {club.membershipFee || '0'} BDT
                                </span>
                            </div>
                            <Link
                                to={`/showAllClub/${club._id}`}
                                className="mt-auto w-full text-center rounded-2xl py-2 bg-linear-to-l to-[#8ABEB9] from-[#002455] text-xl text-white transition-colors duration-200"
                            >
                                View Details
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MostOldClub;
