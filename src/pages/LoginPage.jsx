import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

const UserSchema = z.object({
    identifier: z.string().min(3, { message: "Please enter a valid username or email." }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." }),
});

const formContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const formItemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };
const leftPanelVariants = { hidden: { x: '-100%', opacity: 0 }, visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 50, damping: 15, staggerChildren: 0.2 } } };

const LoginPage = ({ onLoginSuccess, today, greeting }) => {
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [errors, setErrors] = useState(null);
    const [flashMessage, setFlashMessage] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        if (flashMessage.message) {
            const timer = setTimeout(() => setFlashMessage({ type: '', message: '' }), 5000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(null);
        setIsLoading(true);
        setTimeout(() => {
            const result = UserSchema.safeParse(formData);
            if (!result.success) {
                setErrors(result.error.format());
                setFlashMessage({ type: 'error', message: 'Login failed. Please check your details.' });
            } else {
                let username = result.data.identifier;
                if (username.includes('@')) {
                    username = username.split('@')[0];
                }
                setFlashMessage({ type: 'success', message: `Welcome back, ${username}!` });
                onLoginSuccess(username);
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 md:p-0 font-sans transition-colors duration-300">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden md:max-w-none md:w-full md:min-h-screen md:rounded-none md:shadow-none md:grid md:grid-cols-2 transition-colors duration-300">
                <motion.div
                    className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-pink-500 to-pink-600 text-white"
                    variants={leftPanelVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h2 variants={formItemVariants} className="text-4xl font-bold mb-4 leading-tight">Start Your Day with New Ideas</motion.h2>
                    <motion.p variants={formItemVariants} className="mb-8 opacity-90">Log in to connect with the community, share your thoughts, and discover what's new.</motion.p>
                    <motion.div variants={formItemVariants} className="w-48 h-48 self-center opacity-80">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                    </motion.div>
                </motion.div>
                <div className="flex flex-col justify-center">
                    <motion.div
                        className="md:hidden p-8 text-center text-white bg-gradient-to-br from-pink-500 to-pink-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold">Welcome Back!</h2>
                        <p className="mt-2 text-sm opacity-90">Sign in to continue.</p>
                    </motion.div>
                    <div className="p-8 bg-white dark:bg-gray-800 transition-colors duration-300">
                        <motion.div
                            className="w-full max-w-md mx-auto space-y-6"
                            variants={formContainerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={formItemVariants} className="text-center">
                                <p className="text-gray-600 dark:text-gray-400 text-sm hidden md:block">{today}</p>
                                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 hidden md:block">{greeting}!</h1>
                                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Join the Conversation</h2>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to share your daily updates.</p>
                            </motion.div>
                            <div className="h-16">
                                <AnimatePresence>
                                    {flashMessage.message && (
                                        <motion.div
                                            key="flash-message"
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                                            className={`p-4 rounded-lg text-sm flex items-center space-x-3 ${flashMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                        >
                                            {flashMessage.type === 'success' ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>)}
                                            <span>{flashMessage.message}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <motion.div variants={formItemVariants}>
                                    <label htmlFor="identifier" className="sr-only">Username or Email</label>
                                    <input type="text" id="identifier" name="identifier" value={formData.identifier} onChange={handleChange} placeholder="Username or Email" className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200" />
                                    {errors?.identifier && (<p className="mt-2 text-xs text-red-600">{errors.identifier._errors[0]}</p>)}
                                </motion.div>
                                <motion.div variants={formItemVariants}>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200" />
                                    {errors?.password && (<p className="mt-2 text-xs text-red-600">{errors.password._errors[0]}</p>)}
                                </motion.div>
                                <motion.div variants={formItemVariants}>
                                    <motion.button
                                        type="submit"
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-pink-400 disabled:cursor-not-allowed transition-colors"
                                        whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Signing In...' : 'Sign In'}
                                    </motion.button>
                                </motion.div>
                            </form>
                           
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
