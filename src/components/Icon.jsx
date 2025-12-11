import React from 'react';

export const LogoIcon = ({ className, color }) => (
    <svg 
        className={className} 
        viewBox="0 0 100 100" 
        fill="none" 
        stroke={color || "currentColor"} 
        strokeWidth="4" 
        xmlns="http://www.w3.org/2000/svg"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Outer circle of the compass */}
        <circle cx="50" cy="50" r="46"/>
        
        {/* Faint direction lines */}
        <path d="M50 15 V 85 M15 50 H 85" strokeWidth="2" opacity="0.6" />
        
        {/* Stylized needle - top part as a mountain peak */}
        <polygon points="50,12 60,60 50,50 40,60" fill={color || "currentColor"} stroke="none" />
        
        {/* Bottom part of the needle for contrast */}
        <polygon points="50,88 60,40 50,50 40,40" fill="#FFF" stroke="none" opacity="0.8" />
    </svg>
);
export const SearchIcon = ({ className }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );
};

export const MenuIcon = ({ className }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
};

export const XIcon = ({ className }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
};

export const ProfileIcon = ({ className }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
};



