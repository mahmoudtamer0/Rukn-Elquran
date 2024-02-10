import React, { useState, useEffect } from 'react';
import './ProgressBar.css'; // Import your CSS file for styling
import { useData } from '../../context/AppContext';

const ScrollProgressBar = () => {
    const { colors } = useData()
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const percentage = (scrollTop / scrollHeight) * 100;
        setScrollPercentage(percentage);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures useEffect runs only once

    return (
        <div style={{ backgroundColor: colors.progress }} className="progress-bar-container" >
            <div
                className="progress-bar"
                style={{ width: `${scrollPercentage}%`, backgroundColor: colors.mainColor }}
            ></div>
        </div>
    );
}


export default ScrollProgressBar;
