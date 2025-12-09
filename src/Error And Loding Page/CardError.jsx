import React from 'react';
import { motion } from 'framer-motion';
import { MdErrorOutline } from 'react-icons/md';
import { Link } from 'react-router';

const CardError = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full"
            >
                <MdErrorOutline className="text-red-500 text-7xl mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong</h1>
                <p className="text-gray-600 mb-6">
                    The page you are looking for could not be found, or an error occurred.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
};

export default CardError;
