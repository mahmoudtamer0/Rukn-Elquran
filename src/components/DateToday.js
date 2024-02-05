import React from 'react'
import { useState, useEffect } from 'react';

const DateToday = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // Update every second

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);


    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = currentDate.toLocaleDateString('en-Uk', options).replace(/\//g, '-');


    return (
        <div>Date</div>
    )
}

export default DateToday