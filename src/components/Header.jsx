import React, { useState, useEffect } from 'react';
import { LogoIcon, SearchIcon, MenuIcon, XIcon, ProfileIcon } from './Icon.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const Header = ({ onNavClick, pageContext = { page: 'home' }, isAuthenticated, currentUser, onLogout, time, greeting }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const isTransparent = (pageContext.page === 'home' || pageContext.page === 'login') && !isScrolled && !isMenuOpen;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [{ name: 'HOME', page: 'home' }, { name: 'BLOG', page: 'blog' }, { name: 'FORUM', page: 'forum' }, { name: 'ABOUT', page: 'about' }, { name: 'CONTACT', page: 'contact' }];

    const handleLinkClick = (page) => {
        onNavClick({ page });
        setIsMenuOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent' : 'bg-white dark:bg-gray-900 shadow-md'}`}>
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 z-50 relative">
                        <a href="#" onClick={() => handleLinkClick('home')} className="cursor-pointer">
                            <LogoIcon className="h-10 w-10" color={isMenuOpen ? '#fb2056' : (isTransparent ? 'rgba(255, 255, 255, 0.9)' : '#fb2056')} />
                        </a>
                        <div className={`hidden lg:block text-xs transition-colors duration-300 ${isTransparent ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                            <div>{greeting}</div><div className="font-semibold">{time}</div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map(link => (<a key={link.page} href="#" onClick={() => handleLinkClick(link.page)} className={`uppercase font-semibold tracking-wider transition-colors duration-300 ${isTransparent ? 'text-white hover:text-gray-200' : 'text-gray-700 dark:text-gray-300 hover:text-pink-500'}`}>{link.name}</a>))}

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center gap-2">
                                    <ProfileIcon className={`h-6 w-6 ${isTransparent ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`} />
                                    <span className={`font-semibold ${isTransparent ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>{currentUser}</span>
                                </div>
                                <ThemeToggle isTransparent={isTransparent} />
                                <button onClick={onLogout} className="uppercase font-semibold tracking-wider text-red-500 hover:text-red-700 transition-colors">Sign Out</button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <ThemeToggle isTransparent={isTransparent} />
                                <button onClick={() => onNavClick({ page: 'login' })} className={`uppercase font-semibold tracking-wider px-4 py-2 rounded-md border-2 transition-colors duration-300 ${isTransparent ? 'text-white border-white hover:bg-white hover:text-gray-800' : 'text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-white'}`}>Sign In</button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center space-x-2 z-50 relative">
                        <ThemeToggle isTransparent={isTransparent} />
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-full transition-colors duration-300 ${isMenuOpen ? 'text-gray-800' : (isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800')}`}>
                            {isMenuOpen ? <XIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Full Screen Menu */}
            <div className={`fixed inset-0 bg-white/80 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className="flex flex-col items-center space-y-8">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.page}
                            href="#"
                            onClick={() => handleLinkClick(link.page)}
                            className={`text-2xl font-bold uppercase tracking-widest text-gray-800 hover:text-pink-500 transition-all duration-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {link.name}
                        </a>
                    ))}

                    <div className={`w-16 h-1 bg-gray-200 rounded-full my-4 transition-all duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '500ms' }}></div>

                    {isAuthenticated ? (
                        <div className={`flex flex-col items-center space-y-6 transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                            <div className="flex items-center gap-3 px-6 py-3 bg-white/50 rounded-full shadow-sm">
                                <ProfileIcon className="h-8 w-8 text-gray-700" />
                                <span className="text-xl font-semibold text-gray-800">{currentUser}</span>
                            </div>
                            <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="text-lg font-bold uppercase tracking-wider text-red-500 hover:text-red-600 transition-colors">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => handleLinkClick('login')}
                            className={`px-8 py-3 rounded-full bg-pink-500 text-white text-lg font-bold uppercase tracking-wider shadow-lg hover:bg-pink-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '600ms' }}
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
