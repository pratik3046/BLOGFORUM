import React from 'react';
import CommentSection from '../components/CommentSection';

const AllThreadsView = ({ threads, onThreadSelect, onNewThreadClick }) => {
    return (
        <div className="font-sans">
             <section className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        Community Forum
                    </h1>
                </div>
            </section>
            <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Discussions</h2>
                        <button onClick={onNewThreadClick} className="bg-pink-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-600 transition-colors">
                            Start New Thread
                        </button>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-600">
                            {threads.map(thread => (
                                <li key={thread.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-200" onClick={() => onThreadSelect(thread.id)}>
                                    <div className="flex justify-between">
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white hover:text-pink-500">{thread.title}</h3>
                                        <span className="text-gray-500 dark:text-gray-400">{thread.replies.length} replies</span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Started by <span className="font-semibold">{thread.author}</span> on {thread.date}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

const SingleThreadView = ({ thread, onBack, handleReplySubmit, isAuthenticated, currentUser, onNavClick }) => {
    return (
       <div className="font-sans pt-24 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6 py-12">
                <button onClick={onBack} className="text-pink-500 font-semibold hover:text-pink-600 mb-8">&larr; Back to Forum</button>
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg transition-colors duration-300">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">{thread.title}</h1>
                    <div className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                        <span>By {thread.author}</span> | <span>{thread.date}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{thread.content}</p>
                </div>
                
                <CommentSection
                    comments={thread.replies}
                    onCommentSubmit={(replyText) => handleReplySubmit(thread.id, replyText)}
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    onNavClick={onNavClick}
                    itemType="thread"
                />
            </div>
        </div>
    );
};

const ForumPage = ({ pageContext, threads, onNavClick, handleReplySubmit, isAuthenticated, currentUser }) => {
    const thread = threads.find(t => t.id === pageContext.threadId);
    if (thread) {
        return <SingleThreadView thread={thread} onBack={() => onNavClick({page: 'forum'})} {...{handleReplySubmit, isAuthenticated, currentUser, onNavClick}} />;
    }

    const handleNewThreadClick = () => {
        if (isAuthenticated) {
            onNavClick({ page: 'forum', newThread: true });
        } else {
            onNavClick({ page: 'login' });
        }
    };

    return <AllThreadsView threads={threads} onThreadSelect={(threadId) => onNavClick({page: 'forum', threadId})} onNewThreadClick={handleNewThreadClick} />;
};

export default ForumPage;
