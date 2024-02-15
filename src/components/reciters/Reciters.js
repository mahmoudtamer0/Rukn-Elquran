import React, { useEffect, useRef, useState } from 'react'
import { useData } from '../../context/AppContext';
import landingImg from '../../images/quran-book.jpg'
import "./rec.css"
import "../sewar/sewar.css"
import { NavLink } from 'react-router-dom';
import PulseLoader from "react-spinners/PulseLoader";
const Reciters = () => {

    const {
        reciters, getReciters,
        colors, font, fontSize,
        lang
    } = useData()
    const [search, setSearch] = useState('')

    useEffect(() => {
        getReciters()
    }, [])


    return (
        <div>
            <div className='landing' style={{ height: "350px" }}>
                <div className='landing-img'>
                    <img src={landingImg} />
                </div>
                <div className='text-center landing-text '>
                    <div className='d-flex align-items-center justify-content-center'>
                        <h2 className={`landingTitle ${lang == "eng" ? "font2" : null}`}>قراء القرأن</h2>
                    </div>
                    <div className='recDivSearch'>
                        <input
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            type='text'
                            placeholder='ابحث عن القارئ' />
                    </div>
                </div>
            </div>

            <div className='container mainRec'>
                <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "40px" }}>جميع القراء</h2>
                {reciters.length > 0 ?
                    <div className='sewarBoxes justify-content-between align-items-center'>
                        {reciters.filter((item) => {
                            return search !== "" ? item.name.toLowerCase().includes(search) : reciters
                        }).map((rec, index) => {
                            return (
                                <NavLink
                                    key={index}
                                    to={`/Rukn-Elquran/reciters/${rec.id}`}
                                    style={{ backgroundColor: colors.whitColor, border: `1px solid ${colors.borderColor}` }}
                                    className="soraBox d-flex justify-content-between align-items-center"
                                >
                                    <div className='soraDet'>
                                        <div style={{ color: colors.searchColor, backgroundColor: colors.soraNumberDiv }} className='soraNumberDiv'>
                                            <span style={{ color: colors.blackColor }} className='soraNumber'>{lang == "ar" ? (index + 1).toLocaleString("ar-SA") : (index + 1)}</span>
                                        </div>
                                        <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }} className='soraName'>{rec.name}</span>
                                    </div>
                                </NavLink>
                            )
                        })}
                    </div>
                    :
                    <div className='loaderDivSora'>
                        <PulseLoader
                            color='#0075ff'
                            loading={true}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                }

            </div>
        </div >

    )
}
export default Reciters;