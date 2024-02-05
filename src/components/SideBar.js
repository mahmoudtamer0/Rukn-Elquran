import React from 'react'
import "./sewar/sewar.css"
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useData } from './../context/AppContext'
import { useLocation } from 'react-router-dom'


const SideBar = () => {

    const { num } = useParams(); // Get the dynamic parameter from the URL
    const history = useLocation();

    const handleLinkClick = (newNum) => {
        history?.push(`${newNum}`);
    };

    const {
        sewar, getSewar
    } = useData()

    console.log(history)

    useEffect(() => {
        getSewar()
    }, [])
    return (
        <div className='soraSideBar' style={{ width: "20%", }}>
            {sewar.map(sora => {
                return (
                    <div>
                        <NavLink to={`/sewar/${sora.number}`}
                            onClick={() => handleLinkClick(sora.number)}>
                            {sora.name}</NavLink>
                    </div>
                )
            })}


        </div>
    )
}

export default SideBar