import React from "react";
import { motion } from "framer-motion";

const Loding = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      
      <div className="flex flex-col items-center">

        {/* Animated Spinner Circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="w-20 h-20 border-4 border-[#002455] border-t-transparent rounded-full"
        ></motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-5 text-lg text-[#002455] font-semibold tracking-wide"
        >
          Loading...
        </motion.p>

      </div>
    </div>
  );
};

export default Loding;
