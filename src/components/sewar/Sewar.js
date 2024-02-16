import React from 'react'
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useData } from '../../context/AppContext'
import "./sewar.css"

const Sewar = () => {
    const { sewar, getSewar, colors, setSideBarOpen, font, fontSize, setPageScrollTo } = useData()
    const [sewarCount, setSewarCount] = useState(21)

    useEffect(() => {
        getSewar()
    }, [])

    const handleClick = () => {
        setSideBarOpen(true)
        setPageScrollTo(0)
    }

    return (
        <div className='Sewar'>
            <div className='container'>
                <div className='sewarBoxes row justify-content-between align-items-center'>
                    {sewar?.slice(0, sewarCount).map(sora => {
                        return (
                            <NavLink
                                key={sora.number}
                                onClick={() => handleClick()}
                                to={`/Rukn-Elquran/sewar/${sora.number || sora.id}`}
                                style={{ backgroundColor: colors.whitColor, border: `1px solid ${colors.borderColor}` }}
                                className='soraBox d-flex justify-content-between align-items-center'>
                                <div className='soraDet'>
                                    <div style={{ color: colors.searchColor, backgroundColor: colors.soraNumberDiv }}
                                        className='soraNumberDiv soraNumSpecial'>
                                        <span style={{ color: colors.blackColor }} className='soraNumber '>
                                            {sora.number != undefined && sora.number.toLocaleString('ar-EG') || sora.id}
                                        </span>
                                    </div>
                                    <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }} className='soraName'>{sora.name.split("سُورَةُ ")}</span>
                                </div>
                                {sora.numberOfAyahs != undefined &&
                                    <div className='ayahsCount' style={{ color: colors.greyColor }}>
                                        {sora.numberOfAyahs != undefined && sora.numberOfAyahs.toLocaleString('ar-EG')}  آيات</div>
                                }

                            </NavLink>
                        )
                    })}

                    <div className='mt-5 text-center divShow'>
                        <button
                            onClick={() => setSewarCount(sewar.length)}
                            style={{ color: colors.mainColor }}>اظهار المزيد</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Sewar;