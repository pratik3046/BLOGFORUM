import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { initialBlogPosts } from '../data/mockData';

const HomePage = ({ onNavClick }) => {
    const [climberVisible, setClimberVisible] = useState(false);
    useEffect(() => { const timer = setTimeout(() => setClimberVisible(true), 100); return () => clearTimeout(timer); }, []);

    return (
        <div className="font-sans">
            <section className="relative h-[100vh] min-h-[600px] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative text-center px-4">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>EXPLORER'S HUB</h1>
                </div>

            </section>

            <section className="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-left">Latest Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {initialBlogPosts.slice(0, 3).map(post => (
                            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
                                <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 hover:text-pink-500 transition-colors cursor-pointer" onClick={() => onNavClick({ page: 'blog', postId: post.id })}>{post.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 flex-grow mb-4">{post.excerpt}</p>
                                    <button onClick={() => onNavClick({ page: 'blog', postId: post.id })} className="mt-auto self-start bg-pink-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-600 transition-colors">Read More</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 dark:bg-gray-800 py-16 md:py-20 transition-colors duration-300">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Learn More About Us</h2>
                    <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-8">We are passionate storytellers, adventurers, and creators dedicated to bringing you the best content from around the globe. Discover our mission and the team behind the stories.</p>
                    <button onClick={() => onNavClick({ page: 'about' })} className="bg-gray-800 dark:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors text-lg">Let's Meet</button>
                </div>
            </section>

           
        </div>
    );
};

export default HomePage;
