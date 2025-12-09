import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-l to-[#8ABEB9] from-[#002455] px-6">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center text-white"
      >
        {/* 404 Number */}
        <motion.h1
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-9xl font-extrabold drop-shadow-lg"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <p className="mt-4 text-xl text-gray-300">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Glow Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "180px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-1 bg-white mx-auto mt-4 rounded-full shadow-lg"
        ></motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            to="/"
            className="inline-block mt-8 px-8 py-3 bg-white text-[#002455] font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Error;
