import React, { useEffect, useState } from 'react'
import { useData } from '../../context/AppContext'
import "./last-sec.css"
import { NavLink } from 'react-router-dom'

export const LastSec = () => {
    const { colors, lastSoras, font, setPageScrollTo } = useData()


    return (
        <div>
            <div className='container mainRec' style={{ position: "relative" }}>
                <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "40px" }}
                >قرئ مؤخرا</h2>
                <div className='lastMainBoxes d-flex align-items-center'>
                    {lastSoras.slice(-10).reverse().map((sora, index) => (
                        <NavLink
                            onClick={() => setPageScrollTo(sora.PageNow)}
                            to={`/Rukn-Elquran/sewar/${sora.soraId}`}
                            className='mainBox'
                            style={{ borderColor: colors.borderColor, color: colors.blackColor }}>
                            <div className='boxHead d-flex justify-content-between align-items-center'>
                                <span>{sora.soraName}</span>
                                <span>{sora.soraId}</span>
                            </div>
                            <div className='boxBody' style={{ backgroundColor: colors.navColor }}>
                                <div style={{ fontFamily: font, fontSize: "2rem" }}>{sora.soraName.split("سُورَةُ")}</div>
                                {sora.PageNow != undefined ?
                                    <div style={{ fontSize: "17px" }}>
                                        <span style={{ fontFamily: font }}>صفحة</span>
                                        <span>{sora.PageNow}</span>

                                    </div>
                                    :
                                    <div style={{ fontSize: "17px" }}>
                                        <span style={{ fontFamily: font }}> صفحة</span>
                                        <span> {sora.firstPageNumber}</span>
                                    </div>
                                }

                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}