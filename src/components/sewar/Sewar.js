import React from 'react'
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useData } from '../../context/AppContext'
import "./sewar.css"

const Sewar = () => {
    const { sewar, getSewar, colors, setSideBarOpen } = useData()
    const [sewarCount, setSewarCount] = useState(21)

    useEffect(() => {
        getSewar()
    }, [])

    return (
        <div className='Sewar'>
            <div className='container'>
                <div className='sewarBoxes row justify-content-between align-items-center'>
                    {sewar.slice(0, sewarCount).map(sora => {
                        return (
                            <NavLink
                                onClick={() => setSideBarOpen(true)}
                                to={`/Rukn-Elquran/sewar/${sora.number}`}
                                style={{ backgroundColor: colors.whitColor, border: `1px solid ${colors.borderColor}` }}
                                className='soraBox d-flex justify-content-between align-items-center'>
                                <div className='soraDet'>
                                    <div style={{ color: colors.searchColor, backgroundColor: colors.soraNumberDiv }}
                                        className='soraNumberDiv soraNumSpecial'>
                                        <span style={{ color: colors.blackColor }} className='soraNumber '>{sora.number.toLocaleString('ar-EG')}</span>
                                    </div>
                                    <span style={{ color: colors.blackColor }} className='soraName'>{sora.name.split("سُورَةُ ")}</span>
                                </div>
                                <div className='ayahsCount' style={{ color: colors.greyColor }}>{sora.numberOfAyahs.toLocaleString('ar-EG')}  آيات</div>
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