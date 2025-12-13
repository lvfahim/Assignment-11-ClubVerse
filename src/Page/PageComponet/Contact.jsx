import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

// --- Framer Motion Variants ---
const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.2
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Contact = () => {
    // Handler for form submission (for demonstration)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send form data to your backend (e.g., using axiosSecure)
        alert('Message Sent! (Demo functionality)');
        e.target.reset(); 
    };

    return (
        // FIX: Adjusted width here for better responsiveness and large screen coverage.
        // Used 'w-11/12' for slightly wider appearance on large screens, max-w-7xl ensures it doesn't get too wide.
        <div className="min-h-screen w-11/12 max-w-7xl mx-auto bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="mx-auto bg-white shadow-2xl rounded-xl overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header Section */}
                <div className="text-center p-8 bg-indigo-600 text-white">
                    <motion.h2 
                        className="text-4xl font-extrabold mb-2"
                        variants={itemVariants}
                    >
                        Get In Touch
                    </motion.h2>
                    <motion.p 
                        className="text-indigo-200 text-lg"
                        variants={itemVariants}
                    >
                        We'd love to hear from you. Send us a message!
                    </motion.p>
                </div>

                <div className="lg:grid lg:grid-cols-3 gap-0">
                    
                    {/* --- 1. Contact Info Section (Left/Sidebar) --- */}
                    <motion.div 
                        className="bg-gray-800 p-8 text-white lg:col-span-1 space-y-8"
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl font-bold border-b border-indigo-500 pb-2">Our Details</h3>

                        {/* Location */}
                        <div className="flex items-start space-x-4">
                            <FaMapMarkerAlt className="text-xl mt-1 text-indigo-400 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Visit Us</h4>
                                <p className="text-gray-400">123 Club Street, Suite 456, Rajshahi, Bangladesh</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start space-x-4">
                            <FaPhoneAlt className="text-xl mt-1 text-indigo-400 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Call Us</h4>
                                <p className="text-gray-400">+880 1345345166</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-4">
                            <FaEnvelope className="text-xl mt-1 text-indigo-400 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Email Us</h4>
                                <p className="text-gray-400">mdfahim26320@gmail.com</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- 2. Contact Form Section (Right/Main) --- */}
                    <motion.div 
                        className="p-8 lg:p-12 lg:col-span-2"
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Name Input */}
                            <motion.div variants={itemVariants}>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                                    placeholder="Your full name"
                                />
                            </motion.div>

                            {/* Email Input */}
                            <motion.div variants={itemVariants}>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                                    placeholder="you@example.com"
                                />
                            </motion.div>

                            {/* Message Textarea */}
                            <motion.div variants={itemVariants}>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </motion.div>
                            
                            {/* Submit Button with Hover Animation */}
                            <motion.div variants={itemVariants}>
                                <motion.button
                                    type="submit"
                                    // Added Framer Motion interaction props
                                    whileHover={{ scale: 1.01, boxShadow: "0 10px 20px rgba(99, 102, 241, 0.4)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 gap-2"
                                >
                                    <FaPaperPlane className="text-lg" />
                                    Send Message
                                </motion.button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;