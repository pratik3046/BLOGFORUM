import React, { useState } from 'react';
import CommentSection from '../components/CommentSection';
import { initialBlogPosts } from '../data/mockData';
import LazyImage from '../components/LazyImage';

const AllPostsView = ({ posts, onPostSelect, onNewPostClick }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const currentPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
    const pageNumbers = Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => i + 1);
    return (
        <div className="font-sans">
            <section className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Latest Posts</h1>
                </div>
            </section>
            <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">From the Blog</h2>
                        <button onClick={onNewPostClick} className="bg-pink-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-600 transition-colors ">Write a New Post</button>
                    </div>
                    <div className="space-y-16">
                        {currentPosts.map(post => (
                            <div key={post.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pb-12 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                <LazyImage src={post.image} alt={post.title} className="rounded-2xl shadow-lg w-full h-auto object-cover aspect-video" />
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{post.date} by <span className="font-semibold">{post.author}</span></p>
                                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 hover:text-pink-500 transition-colors cursor-pointer" onClick={() => onPostSelect(post.id)}>{post.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">{post.excerpt}</p>
                                    <a href="#" onClick={(e) => {e.preventDefault(); onPostSelect(post.id)}} className="font-bold text-pink-500 hover:text-pink-600 transition-colors">Read More &rarr;</a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 flex justify-center items-center space-x-2">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Previous</button>
                        {pageNumbers.map(number => (
                            <button key={number} onClick={() => setCurrentPage(number)} className={`px-4 py-2 border rounded-md ${currentPage === number ? 'bg-pink-500 text-white border-pink-500' : 'bg-white border-gray-300 hover:bg-gray-50'}`}>{number}</button>
                        ))}
                        <button onClick={() => setCurrentPage(p => Math.min(pageNumbers.length, p + 1))} disabled={currentPage === pageNumbers.length} className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Next</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

const SinglePostView = ({ post, onBack, handleCommentSubmit, isAuthenticated, currentUser, onNavClick }) => {
    return (
        <div className="font-sans pt-16 md:pt-24 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 py-6 md:py-12 max-w-full">
                <button onClick={onBack} className="text-pink-500 font-semibold hover:text-pink-600 mb-6 md:mb-8 text-sm md:text-base">&larr; Back to Blog</button>
                <div className="max-w-4xl mx-auto overflow-hidden">
                    <LazyImage src={post.image} alt={post.title} className="rounded-lg md:rounded-2xl shadow-lg w-full h-auto object-cover aspect-[16/9] mb-6 md:mb-8" />
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4 break-words">{post.title}</h1>
                    <div className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mb-6 md:mb-8"><span>By {post.author}</span> | <span>{post.date}</span></div>
                    <div className="prose prose-sm md:prose lg:prose-xl max-w-none text-gray-700 dark:text-gray-300">
                        <p className="break-words overflow-wrap-anywhere">{post.content}</p>
                    </div>
                    <CommentSection comments={post.comments} onCommentSubmit={(commentText) => handleCommentSubmit(post.id, commentText)} isAuthenticated={isAuthenticated} currentUser={currentUser} onNavClick={onNavClick} itemType="blog post"/>
                </div>
            </div>
        </div>
    );
};

const BlogPage = ({ pageContext, posts, onNavClick, handleCommentSubmit, isAuthenticated, currentUser }) => {
    const handleNewPostClick = () => {
        if (isAuthenticated) {
            onNavClick({ page: 'blog', newPost: true });
        } else {
            onNavClick({ page: 'login' });
        }
    };

    const post = posts.find(p => p.id === pageContext.postId);

    if (post) {
        return <SinglePostView post={post} onBack={() => onNavClick({page: 'blog'})} {...{handleCommentSubmit, isAuthenticated, currentUser, onNavClick}} />;
    }

    return <AllPostsView posts={posts} onPostSelect={(postId) => onNavClick({page: 'blog', postId})} onNewPostClick={handleNewPostClick} />;
};

export default BlogPage;
