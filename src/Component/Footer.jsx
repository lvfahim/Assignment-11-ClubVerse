import React from 'react';
import WebSideLogo from '../WebSideLogo/WebSideLogo';
import { Link } from 'react-router';
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

const Footer = () => {
    // Define the author/social links centrally for clean mapping
    const socialLinks = [
        { icon: FaFacebookSquare, url: 'https://www.facebook.com/lv.fahim.78750', label: 'Facebook' },
        { icon: FaLinkedin, url: 'https://www.linkedin.com/in/md-fahim-numan/', label: 'LinkedIn' },
        { icon: FaSquareGithub, url: 'https://github.com/lvfahim', label: 'GitHub' },
    ];

    return (
        <div className='rounded-2xl bg-base-300 mt-16 shadow-lg'>
            <footer className="footer w-10/12 mx-auto p-10 bg-base-300 text-base-content flex flex-col sm:flex-row justify-between">

                {/* 1. Logo/Brand Section (Moved to be the first element, typical layout) */}
                <div className="flex flex-col items-center sm:items-start mb-8 sm:mb-0">
                    <Link to='/' className="mb-4">
                        <WebSideLogo />
                    </Link>
                    <p className="text-sm text-gray-500">
                        ClubVerse, built for communities. <br />
                        &copy; {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>

                {/* 2. Services Navigation */}
                <nav className="mb-6 sm:mb-0">
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>

                {/* 3. Company Navigation */}
                <nav className="mb-6 sm:mb-0">
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>

                {/* 4. Social Links */}
                <nav>
                    <h6 className="footer-title">Connect with Author</h6>
                    <div className="grid grid-flow-col gap-4">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.label}
                                className="text-gray-700 hover:text-indigo-600 transition-colors"
                            >
                                <link.icon className='text-3xl' />
                            </a>
                        ))}
                    </div>
                </nav>

            </footer>
        </div>
    );
};

export default Footer;