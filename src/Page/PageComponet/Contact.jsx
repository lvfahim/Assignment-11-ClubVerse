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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden"
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

                        <div className="flex items-start space-x-4">
                            <FaMapMarkerAlt className="text-xl mt-1 text-indigo-400 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Visit Us</h4>
                                <p className="text-gray-400">123 Club Street, Suite 456, Rajshahi, Bangladesh</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <FaPhoneAlt className="text-xl mt-1 text-indigo-400 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Call Us</h4>
                                <p className="text-gray-400">+880 1345345166</p>
                            </div>
                        </div>

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
                            
                            {/* Submit Button */}
                            <motion.div variants={itemVariants}>
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 gap-2"
                                >
                                    <FaPaperPlane className="text-lg" />
                                    Send Message
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;