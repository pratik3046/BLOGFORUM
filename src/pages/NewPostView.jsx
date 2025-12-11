import React, { useState } from 'react';
import { z } from 'zod';
import { motion } from 'framer-motion';

const BlogPostSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters." }),
    imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
    content: z.string().min(50, { message: "Content must be at least 50 characters." })
});

const NewPostView = ({ onBack, handleNewBlogPostSubmit }) => {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = BlogPostSchema.safeParse({ title, imageUrl, content });
        if (!result.success) {
            setErrors(result.error.format());
            return;
        }
        handleNewBlogPostSubmit({ title, imageUrl, content });
    };

    return (
        <div className="font-sans pt-16 md:pt-24 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 py-6 md:py-12">
                <button onClick={onBack} className="text-pink-500 font-semibold hover:text-pink-600 mb-6 md:mb-8">&larr; Cancel</button>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">Create a New Blog Post</h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 bg-gray-50 dark:bg-gray-800 p-4 md:p-8 rounded-lg transition-colors duration-300">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 text-sm md:text-base"/>
                            {errors?.title && <p className="mt-2 text-xs text-red-600">{errors.title._errors[0]}</p>}
                        </div>
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                            <input type="text" id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="mt-1 block w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 text-sm md:text-base"/>
                             {errors?.imageUrl && <p className="mt-2 text-xs text-red-600">{errors.imageUrl._errors[0]}</p>}
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                            <textarea id="content" value={content} onChange={e => setContent(e.target.value)} rows="10" className="mt-1 block w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 text-sm md:text-base"></textarea>
                            {errors?.content && <p className="mt-2 text-xs text-red-600">{errors.content._errors[0]}</p>}
                        </div>
                        <div className="text-center">
                           <button type="submit" className="w-full md:w-auto bg-pink-500 text-white font-bold py-3 px-6 md:px-8 rounded-lg hover:bg-pink-600 transition-colors text-sm md:text-base">Publish Post</button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default NewPostView;
