import React from 'react';
import { LogoIcon } from './Icon.jsx';

const Footer = ({ onNavClick }) => (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white transition-colors duration-300">
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6 uppercase tracking-wider text-sm">
                    <a href="#" onClick={() => onNavClick({ page: 'home' })} className="hover:text-pink-400 transition-colors">Home</a>
                    <a href="#" onClick={() => onNavClick({ page: 'blog' })} className="hover:text-pink-400 transition-colors">Blog</a>
                    <a href="#" onClick={() => onNavClick({ page: 'forum' })} className="hover:text-pink-400 transition-colors">Forum</a>
                    <a href="#" onClick={() => onNavClick({ page: 'about' })} className="hover:text-pink-400 transition-colors">About</a>
                    <a href="#" onClick={() => onNavClick({ page: 'contact' })} className="hover:text-pink-400 transition-colors">Contact</a>
                </div>
                <div className="flex justify-center my-6 md:my-0"><a href="#" onClick={() => onNavClick({ page: 'home' })}><LogoIcon className="h-12 w-12" /></a></div>
                <div className="text-center  text-gray-400 dark:text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} EXPLORER'S HUB.</p>
                    <p className="flex items-center text-center justify-center  ">
                        All Rights Reserved By PRATIK 
                        <svg className="w-4 h-4 ml-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg> .
                    </p>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
