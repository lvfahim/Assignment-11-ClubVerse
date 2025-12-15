import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Img from '../../assets/Gemini_Generated_Image_hlhhcwhlhhcwhlhh-modified.png'

const Hero = () => {
  return (
    <div className="w-full bg-linear-to-r from-[#002455] to-[#8ABEB9] py-32 relative overflow-hidden">
      <div className="lg:max-w-6xl lg:mx-auto w-full px-6 grid lg:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Discover, Join & Manage <span className="text-yellow-400">Local Clubs</span>
          </h1>
          <p className="text-white text-lg mb-8">
            Connect with passionate people, attend exciting events, and be part of thriving communities. Your next adventure starts here!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/aboutUs"
              className="px-6 py-3 bg-yellow-400 text-[#002455] font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition duration-300"
            >
              Explore Clubs
            </Link>
            <Link
              to="/showAllClub"
              className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-[#002455] transition duration-300"
            >
              Join Now
            </Link>
          </div>
        </motion.div>

        {/* Right Content — Animated Circle Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full flex justify-center"
        >
          <div className="w-80 h-80 rounded-3xl bg-linear-to-l from-[#8ABEB9] to-[#002455] shadow-2xl flex items-center justify-center text-white text-3xl font-bold relative overflow-hidden">
            
            {/* Moving Shine */}
            <motion.div
              initial={{ x: "-150%" }}
              animate={{ x: "150%" }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
              }}
              className="absolute top-0 h-full w-20 bg-white/20 blur-2xl rotate-12"
            ></motion.div>

            <img src={Img} alt="" />
          </div>
        </motion.div>

      </div>

      {/* Decorative Circles */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white/10 blur-3xl animate-pulse"></div>
    </div>
  );
};

export default Hero;
