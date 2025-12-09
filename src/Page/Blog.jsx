import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaTag, FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

const ButtonToast = ()=>{
 toast("It's not found")
}

// --- Blog Data (Image URL removed) ---
const blogs = [
    {
        title: "Top 5 Photography Clubs in Town",
        desc: "Discover the best local photography clubs and learn how to join them.",
        date: "Dec 1, 2025",
        author: "John Doe",
        category: "Photography",
    },
    {
        title: "How Joining a Club Improves Your Skills",
        desc: "Learn the benefits of joining local clubs for networking and skill development.",
        date: "Dec 5, 2025",
        author: "Jane Smith",
        category: "Self-Development",
    },
    {
        title: "Upcoming Tech Workshops This Month",
        desc: "Check out the tech workshops hosted by local clubs and how to register.",
        date: "Dec 8, 2025",
        author: "Alex Johnson",
        category: "Tech",
    },
];

const Blog = () => {
    // Define a primary accent color for consistency
    const primaryColor = "indigo-600";
    const primaryLight = "indigo-50";

    return (
        <div className="w-full py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 text-center">

                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`text-4xl font-extrabold text-${primaryColor} mb-4`}
                >
                    📰 Club Insights & News
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-gray-600 mb-12 text-lg"
                >
                    Stay updated with the latest news, tips, and events from our community.
                </motion.p>

                {/* --- Blog Cards Grid (Content-Focused) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: index * 0.2 }}
                            viewport={{ once: true, amount: 0.1 }}
                            // Enhanced card styling and hover effect
                            className={`bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden flex flex-col h-full`}
                        >

                            {/* Card Content */}
                            <div className="p-6 flex-grow flex flex-col">
                                {/* Category Tag */}
                                <div className={`text-left mb-3 inline-block bg-${primaryLight} text-${primaryColor} px-3 py-1 rounded-full text-xs font-semibold uppercase flex items-center gap-1 w-fit`}>
                                    <FaTag className="h-3 w-3" /> {blog.category}
                                </div>

                                <h3 className={`text-2xl font-bold mb-3 text-gray-900 text-left hover:text-${primaryColor} transition-colors cursor-pointer`}>
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 mb-5 text-left flex-grow">{blog.desc}</p>

                                {/* Metadata */}
                                <div className="flex items-center justify-between text-gray-500 text-sm border-t border-gray-100 pt-4 mt-auto">
                                    <div className="flex space-x-4">
                                        <span className="flex items-center gap-1"><FaUser className="h-3 w-3" /> {blog.author}</span>
                                        <span className="flex items-center gap-1"><FaCalendarAlt className="h-3 w-3" /> {blog.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Read More Link Footer */}
                            <button onClick={ButtonToast}>
                                <div className={`p-4 bg-gray-50 flex justify-end text-${primaryColor} font-semibold transition-colors hover:bg-${primaryLight} cursor-pointer`}>
                                    Read Article <FaArrowRight className="ml-2 w-3 h-3 self-center" />
                                </div>
                            </button>

                        </motion.div>
                    ))}
                </div>
                  <ToastContainer />
            </div>
        </div>
    );
};

export default Blog;