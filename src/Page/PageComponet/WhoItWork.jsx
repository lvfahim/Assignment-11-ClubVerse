import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUsers, FaCalendarCheck } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch className="text-4xl text-blue-500" />,
    title: "Discover Clubs",
    desc: "Browse local clubs and events based on your interests and location.",
  },
  {
    icon: <FaUsers className="text-4xl text-yellow-500" />,
    title: "Join & Connect",
    desc: "Become a member, interact with other members, and participate in activities.",
  },
  {
    icon: <FaCalendarCheck className="text-4xl text-purple-500" />,
    title: "Attend Events",
    desc: "Register for events, attend workshops, and gain real-world experience.",
  },
];

const WhoItWork = () => {
  return (
    <div className="w-full py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 mb-4"
        >
          How ClubSphere Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 mb-12"
        >
          A simple 3-step process to explore, join, and participate in your favorite clubs.
        </motion.p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoItWork;
