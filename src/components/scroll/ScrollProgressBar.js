import React, { useState, useEffect } from 'react';
import './ProgressBar.css'; // Import your CSS file for styling

const ScrollProgressBar = () => {
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

    // const [prevScrollPos, setPrevScrollPos] = useState(0);
    // const [visible, setVisible] = useState(true);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const currentScrollPos = window.scrollY;

    //         setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    //         setPrevScrollPos(currentScrollPos);
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [prevScrollPos]);
    // className = "progress-bar-container"
    // className = {` ${visible ? "progress-bar-container-visible" : "progress-bar-container-hidden"} `

    return (
        <div className="progress-bar-container" >
            <div
                className="progress-bar"
                style={{ width: `${scrollPercentage}%` }}
            ></div>
        </div>
    );
}


export default ScrollProgressBar;
