import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaStar, FaBolt, FaHeart } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers className="text-4xl text-blue-500" />,
    title: "Strong Community",
    desc: "Connect with passionate people who share your vision.",
  },
  {
    icon: <FaBolt className="text-4xl text-yellow-500" />,
    title: "Skill Development",
    desc: "Improve leadership, teamwork, and technical abilities.",
  },
  {
    icon: <FaStar className="text-4xl text-purple-500" />,
    title: "Exclusive Opportunities",
    desc: "Get access to events, workshops, and special sessions.",
  },
  {
    icon: <FaHeart className="text-4xl text-red-500" />,
    title: "Make Real Impact",
    desc: "Work on meaningful projects that help the community.",
  },
];

const WhyJoin = () => {
  return (
    <div className="w-full  pt-32 pb-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 mb-4"
        >
          Why Join Our Club?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Explore the benefits of being part of an inspiring and active community.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyJoin;
