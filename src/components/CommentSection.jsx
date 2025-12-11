import React, { useState } from 'react';
import { z } from 'zod';

const CommentSchema = z.string().min(1, { message: "Comment cannot be empty." }).max(500, { message: "Comment cannot exceed 500 characters." });
const ProfileIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);

const CommentSection = ({ comments, onCommentSubmit, isAuthenticated, currentUser, onNavClick, itemType }) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const result = CommentSchema.safeParse(comment);
        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }
        onCommentSubmit(comment);
        setComment('');
        setError('');
    };

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{itemType === 'thread' ? 'Replies' : 'Comments'} ({comments.length})</h2>
            <div className="space-y-6">
                {comments.map(c => (
                    <div key={c.id} className="flex space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <ProfileIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 dark:text-white">{c.author}</p>
                            <p className="text-gray-600 dark:text-gray-300">{c.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            {isAuthenticated ? (
                <form onSubmit={handleSubmit} className="mt-8">
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="4" className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-pink-500 focus:border-pink-500" placeholder={`Add a ${itemType === 'thread' ? 'reply' : 'comment'}...`}></textarea>
                    {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
                    <button type="submit" className="mt-4 bg-pink-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-600 transition-colors">Submit</button>
                </form>
            ) : (
                <div className="mt-8 text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors duration-300">
                    <p className="text-gray-700 dark:text-gray-300">You must be logged in to {itemType === 'thread' ? 'reply' : 'comment'}.</p>
                    <button onClick={() => onNavClick({ page: 'login' })} className="mt-4 font-bold text-pink-500 hover:text-pink-600 transition-colors">Sign in to join the discussion &rarr;</button>
                </div>
            )}
        </div>
    );
};

export default CommentSection;
