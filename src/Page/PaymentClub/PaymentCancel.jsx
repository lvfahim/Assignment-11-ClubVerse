import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { MdCancel, MdArrowBack, MdSupportAgent } from 'react-icons/md';

// Framer Motion Variants
const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.7,
            type: "spring",
            stiffness: 100,
            delay: 0.1
        },
    },
};

const iconVariants = {
    initial: { rotate: 0 },
    animate: {
        rotate: [0, -10, 10, -5, 5, 0], // Subtle shaking effect
        transition: {
            duration: 1.5,
            ease: "easeInOut",
            delay: 0.5
        },
    },
};

const PaymentCancel = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <motion.div
                className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full text-center border-t-8 border-red-500"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-red-100 mb-6"
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                >
                    <MdCancel className="text-6xl text-red-600" />
                </motion.div>

                <h1 className="text-4xl font-extrabold text-red-600 mb-4">
                    Payment Cancelled
                </h1>

                <p className="text-gray-700 mb-6 text-lg">
                    Your payment was not completed, or you cancelled the transaction. No changes have been made to your account.
                </p>

                <div className="space-y-4">

                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                        {/* Go Back Button */}
                        <Link
                            to="/showAllClub"
                            className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                        >
                            <MdArrowBack className="text-xl" /> Go Back to Clubs
                        </Link>

                        {/* Support Button */}
                        <Link
                            to="/contact"
                            className="btn bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                        >
                            <MdSupportAgent className="text-xl" /> Contact Support
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentCancel;