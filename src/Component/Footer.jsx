import React from 'react';
import WebSideLogo from '../WebSideLogo/WebSideLogo';
import { Link } from 'react-router';
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
const Footer = () => {
    return (
        <div className='  rounded-2xl bg-base-300 '>
            <footer className="footer w-10/12 mx-auto sm:footer-horizontal bg-base-300  text-base-content p-10">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col items-center gap-4">
                        <a href='https://www.facebook.com/lv.fahim.78750' target="_blank" rel="noopener noreferrer">
                            <FaFacebookSquare className='text-4xl' />
                        </a>
                        <a href='https://www.linkedin.com/in/md-fahim-numan/' target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className='text-4xl' />
                        </a>
                        <a href='https://github.com/lvfahim' target="_blank" rel="noopener noreferrer">
                            <FaSquareGithub className='text-4xl' />
                        </a>
                    </div>
                    <Link to='/'>
                        <div>
                            <WebSideLogo></WebSideLogo>
                        </div>
                    </Link>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;