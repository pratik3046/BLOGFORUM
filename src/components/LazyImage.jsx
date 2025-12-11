import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ 
    src, 
    alt, 
    className = "", 
    placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23d1d5db' font-family='Arial, sans-serif' font-size='16'%3ELoading...%3C/text%3E%3C/svg%3E",
    ...props 
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setError(true);
        setIsLoaded(true);
    };

    return (
        <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...props}>
            {!isLoaded && (
                <img
                    src={placeholder}
                    alt="Loading..."
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${className}`}
                />
            )}
            {isInView && (
                <img
                    src={error ? placeholder : src}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    } ${className}`}
                    onLoad={handleLoad}
                    onError={handleError}
                    loading="lazy"
                />
            )}
        </div>
    );
};

export default LazyImage;