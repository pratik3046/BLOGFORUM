import React from 'react';

const AboutPage = () => (
    <div className="font-sans">
        <section className="relative h-[100vh] bg-cover bg-center flex items-center justify-center text-white" style={{backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative text-center z-10">
                <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>About Us</h1>
            </div>
        </section>
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Nice to meet you!</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">EXPLORER'S HUB, a collective of writers, photographers, and adventurers united by a single passion: to explore the world and share its stories. Our mission is to inspire curiosity and empower fellow travelers to embark on their own journeys, armed with knowledge, respect for local cultures, and a spirit of adventure.</p>
                        <p className="text-gray-600 dark:text-gray-300">From the highest peaks to the most remote villages, we believe that every corner of the globe has a story to tell. Join us as we chart new territories and build a community dedicated to the art of travel.</p>
                    </div>
                    <div className="order-1 lg:order-2">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Team" className="rounded-2xl shadow-lg w-full h-auto object-cover"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

export default AboutPage;
