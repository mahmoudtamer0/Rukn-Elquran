import React from 'react'
import { useState, useEffect } from 'react';
import landingImg from "../images/quran-book.jpg"
import { useData } from '../context/AppContext';

const Radio = () => {

    const { radio, getRadio, colors, setServer, server } = useData()
    const [search, setSearch] = useState([])
    const [soraId, setSoraId] = useState()

    useEffect(() => {
        getRadio()
    }, [])

    const handlePlay = (radio) => {
        setSoraId(`${radio.id}`)
        setServer(`${radio.url}`)
    }

    return (
        <div>
            <div className='landing' style={{ height: "350px" }}>
                <div className='landing-img'>
                    <img src={landingImg} />
                </div>
                <div className='text-center landing-text '>
                    <div className='d-flex align-items-center justify-content-center'>
                        <h2 className='landingTitle'>قراء القرأن</h2>
                    </div>
                    <div className='recDivSearch'>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type='text'
                            placeholder='ابحث عن اذاعات القران الكريم' />
                    </div>
                </div>
            </div>

            <div className='container mainRec'>
                <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "40px" }}>جميع اذاعات القران الكريم</h2>
                <div className='sewarBoxes '>
                    {radio?.filter((item) => {
                        return search !== "" ? item.name.includes(search) : radio
                    }).map((radio, index) => (
                        <button
                            key={radio.id}
                            onClick={() => handlePlay(radio)}
                            style={{ backgroundColor: "transparent", border: `1px solid ${colors.borderColor}` }}
                            className={`soraBox d-flex align-items-center
                            ${server == radio.url && "soraBoxActiv"}`}
                        >
                            <div className='soraDet'>
                                <div style={{ color: colors.searchColor, backgroundColor: colors.soraNumberDiv }} className='soraNumberDiv'>
                                    <span style={{ color: colors.blackColor }} className='soraNumber'>
                                        {server == radio.url ?
                                            <i className="fa-solid fa-pause"></i>
                                            :
                                            <i className="fa-solid fa-play"></i>
                                        }
                                    </span>
                                </div>
                                <span style={{ color: colors.blackColor }} >{`${(index + 1).toLocaleString("ar-SA")}`}</span>
                                <span style={{ color: colors.blackColor, fontSize: "1.7rem" }} className='soraName'>{radio.name}</span>
                            </div>

                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Radio