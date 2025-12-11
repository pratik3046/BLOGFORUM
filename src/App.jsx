import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ForumPage from './pages/ForumPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import NewPostView from './pages/NewPostView';
import NewThreadView from './pages/NewThreadView';
import { initialBlogPosts, initialForumThreads } from './data/mockData';

const App = () => {
    const [pageContext, setPageContext] = useState({ page: 'login' });
    const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
    const [forumThreads, setForumThreads] = useState(initialForumThreads);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [time, setTime] = useState('');
    const [greeting, setGreeting] = useState('');
    const [today, setToday] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
            setTime(now.toLocaleTimeString('en-US', options) + ' IST');
            setToday(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
            const hour = now.getHours();
            if (hour < 12) setGreeting('Good Morning');
            else if (hour < 17) setGreeting('Good Afternoon');
            else setGreeting('Good Evening');
        };
        updateDateTime();
        const timerId = setInterval(updateDateTime, 1000);
        return () => clearInterval(timerId);
    }, []);

    const handleNavClick = (context) => {
        setPageContext(context);
        window.scrollTo(0, 0);
    };

    const handleLoginSuccess = (username) => {
        setIsAuthenticated(true);
        setCurrentUser(username);
        handleNavClick({ page: 'home' });
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        handleNavClick({ page: 'login' });
    };

    const handleCommentSubmit = (postId, commentText) => {
        setBlogPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? { ...post, comments: [...post.comments, { id: Date.now(), author: currentUser, text: commentText }] }
                    : post
            )
        );
    };

    const handleReplySubmit = (threadId, replyText) => {
        setForumThreads(prevThreads =>
            prevThreads.map(thread =>
                thread.id === threadId
                    ? { ...thread, replies: [...thread.replies, { id: Date.now(), author: currentUser, text: replyText }] }
                    : thread
            )
        );
    };

    const handleNewThreadSubmit = ({ title, content }) => {
        const newThread = {
            id: Date.now(),
            title,
            content,
            author: currentUser,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            replies: [],
        };
        setForumThreads(prevThreads => {
            const updatedThreads = [newThread, ...prevThreads];
            handleNavClick({ page: 'forum', threadId: newThread.id });
            return updatedThreads;
        });
    };

    const handleNewBlogPostSubmit = ({ title, content, imageUrl }) => {
        const newPost = {
            id: Date.now(),
            title,
            content,
            image: imageUrl,
            author: currentUser,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            excerpt: content.substring(0, 100) + '...',
            comments: [],
        };
        setBlogPosts(prevPosts => {
            const updatedPosts = [newPost, ...prevPosts];
            handleNavClick({ page: 'blog', postId: newPost.id });
            return updatedPosts;
        });
    };

    const renderPage = () => {
        switch (pageContext.page) {
            case 'home':
                return <HomePage onNavClick={handleNavClick} />;
            case 'blog':
                if (pageContext.newPost) {
                    if (!isAuthenticated) return <LoginPage onLoginSuccess={handleLoginSuccess} today={today} greeting={greeting} />;
                    return <NewPostView onBack={() => handleNavClick({ page: 'blog' })} handleNewBlogPostSubmit={handleNewBlogPostSubmit} />;
                }
                return <BlogPage pageContext={pageContext} posts={blogPosts} onNavClick={handleNavClick} handleCommentSubmit={handleCommentSubmit} isAuthenticated={isAuthenticated} currentUser={currentUser} />;
            case 'forum':
                if (pageContext.newThread) {
                    if (!isAuthenticated) return <LoginPage onLoginSuccess={handleLoginSuccess} today={today} greeting={greeting} />;
                    return <NewThreadView onBack={() => handleNavClick({ page: 'forum' })} handleNewThreadSubmit={handleNewThreadSubmit} />;
                }
                return <ForumPage pageContext={pageContext} threads={forumThreads} onNavClick={handleNavClick} handleReplySubmit={handleReplySubmit} handleNewThreadSubmit={handleNewThreadSubmit} isAuthenticated={isAuthenticated} currentUser={currentUser} />;
            case 'about':
                return <AboutPage />;
            case 'contact':
                return <ContactPage />;
            case 'login':
                return <LoginPage onLoginSuccess={handleLoginSuccess} today={today} greeting={greeting} />;
            default:
                return <HomePage onNavClick={handleNavClick} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            {isAuthenticated && (
                <Header
                    onNavClick={handleNavClick}
                    pageContext={pageContext}
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    onLogout={handleLogout}
                    time={time}
                    greeting={greeting}
                />
            )}
            <main className="flex-grow">
                {renderPage()}
            </main>
            {pageContext.page !== 'login' && <Footer onNavClick={handleNavClick} />}
        </div>
    );
};

export default App;
