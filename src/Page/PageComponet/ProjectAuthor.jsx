import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import Img from '../../assets/a.jpg'; // Imported Profile Image

// --- Framer Motion Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, 
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
        },
    },
};

const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -15 },
    visible: {
        scale: 1,
        opacity: 1,
        rotate: 0,
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 120,
            damping: 10,
        },
    },
};

const ProjectAuthor = () => {
    // --- Your Personal Data ---
    const author = {
        name: "Md Fahim Numan",
        title: "Full Stack Developer (MERN)",
        resumeLink: "https://drive.google.com/file/d/1btbbhiUunPFcrpJnrxBZb2ayxcV_6lK_/view?usp=sharing",
        links: [
            { icon: FaGithub, url: "https://github.com/lvfahim", label: "GitHub", color: "bg-gray-800 hover:bg-gray-700" },
            { icon: FaLinkedin, url: "https://www.linkedin.com/in/md-fahim-numan/", label: "LinkedIn", color: "bg-blue-600 hover:bg-blue-700" },
            { icon: FaFacebook, url: "https://www.facebook.com/lv.fahim.78750", label: "Facebook", color: "bg-blue-800 hover:bg-blue-900" },
        ]
    };

    return (
        <motion.div
            className="p-8 md:p-12 bg-white rounded-xl shadow-2xl max-w-4xl mx-auto my-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                
                {/* Profile Image with Animation */}
                <motion.div 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-indigo-400 ring-offset-4 ring-offset-white"
                    variants={imageVariants}
                >
                    <img 
                        src={Img} 
                        alt={author.name} 
                        className="w-full h-full object-cover" 
                    />
                </motion.div>

                {/* Text Content */}
                <div className="text-center md:text-left">
                    <motion.h2 
                        className="text-4xl font-extrabold text-indigo-700 mb-1"
                        variants={itemVariants}
                    >
                        {author.name}
                    </motion.h2>
                    <motion.p 
                        className="text-xl text-gray-600 mb-4"
                        variants={itemVariants}
                    >
                        {author.title}
                    </motion.p>
                </div>
            </div>

            <div className="space-y-6">
                
                {/* Social Links Section */}
                <motion.div 
                    className="flex flex-wrap gap-4 justify-center md:justify-start pt-4 border-t"
                    variants={containerVariants}
                >
                    {author.links.map((link, index) => (
                        <motion.a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-all duration-300 transform shadow-md ${link.color}`}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <link.icon className="text-xl" />
                            <span className="font-semibold">{link.label}</span>
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div 
                    className="divider my-8 text-gray-400"
                    variants={itemVariants}
                >
                    <span className='text-sm uppercase font-semibold'>Professional Documentation</span>
                </motion.div>
                
                {/* Resume Link (Primary Call to Action) */}
                <motion.a
                    href={author.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition-colors duration-300 transform shadow-xl mx-auto"
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <MdOutlineFileDownload className="text-2xl" />
                    <span>View Full Resume</span>
                </motion.a>

            </div>

        </motion.div>
    );
};

export default ProjectAuthor;