import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

const ContactFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters long." })
});

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState(null);
    const [status, setStatus] = useState({ loading: false, success: false, error: false, message: '' });

    useEffect(() => {
        if (status.message) {
            const timer = setTimeout(() => setStatus({ loading: false, success: false, error: false, message: '' }), 5000);
            return () => clearTimeout(timer);
        }
    }, [status.message]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(null);
        setStatus({ loading: true, success: false, error: false, message: '' });

        const result = ContactFormSchema.safeParse(formData);
        if (!result.success) {
            setErrors(result.error.format());
            setStatus({ loading: false, success: false, error: true, message: 'Please correct the errors below.' });
            return;
        }

        setTimeout(() => {
            console.log('Simulating email send with data:', formData);
            setStatus({ loading: false, success: true, error: false, message: 'Thank you! Your message has been sent.' });
            setFormData({ name: '', email: '', message: '' });
            setErrors(null);
        }, 1000);
    };

    return (
        <div className="font-sans">
            <section className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white" style={{backgroundImage: "url('https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute bottom-6 right-6 text-right z-10" style={{ fontFamily: 'cursive' }}>
                    <p className="text-white/90 text-sm md:text-base">pratikkumarbehera30@gmail.com</p>
                    <p className="text-white/90 text-sm md:text-base">+91 9348858401</p>
                </div>
                <div className="relative text-center z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Get In Touch</h1>
                </div>
            </section>
            <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Send Us a Message</h2>
                            <div className="h-10">
                                <AnimatePresence>
                                    {status.message && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className={`p-3 rounded-lg text-center font-semibold ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                        >
                                            {status.message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input type="text" id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:ring-pink-500 focus:border-pink-500"/>
                                {errors?.name && <p className="mt-2 text-xs text-red-600">{errors.name._errors[0]}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input type="email" id="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:ring-pink-500 focus:border-pink-500"/>
                                 {errors?.email && <p className="mt-2 text-xs text-red-600">{errors.email._errors[0]}</p>}
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea id="message" rows="5" placeholder="Your Message" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:ring-pink-500 focus:border-pink-500"></textarea>
                                 {errors?.message && <p className="mt-2 text-xs text-red-600">{errors.message._errors[0]}</p>}
                            </div>
                            <div className="text-center">
                                <button type="submit" disabled={status.loading} className="bg-pink-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-600 transition-colors disabled:bg-pink-300 disabled:cursor-not-allowed">
                                    {status.loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
