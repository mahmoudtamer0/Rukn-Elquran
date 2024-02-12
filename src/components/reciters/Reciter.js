import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./rec.css"
import "../sewar/sewar.css"
import landingImg from "../../images/quran-book.jpg"
import { useData } from '../../context/AppContext'
import landingLogo from '../../images/quran-mazid-hero-calio.png'

import { NavLink } from 'react-router-dom'
import { Button } from 'bootstrap'

const Reciter = () => {
    const { colors, setServer, lang, soraId, setSoraId, font, setPlay, fontSize } = useData()
    const { recId } = useParams()
    const [sewarList, setSewarList] = useState([])
    const [sewar, setSewar] = useState([])
    const [newSewar, setNewSewar] = useState([])
    const [reciter, setReciter] = useState([])
    const [search, setSearch] = useState([])



    useEffect(() => {
        fetch(`https://mp3quran.net/api/v3/suwar?language=${lang}`)
            .then(res => res.json())
            .then(data => setSewar(data.suwar))
        fetch(`https://www.mp3quran.net/api/v3/reciters?language=${lang}&reciter=${recId}`)
            .then(res => res.json())
            .then(data => setReciter(data.reciters[0]))
    }, [])



    useEffect(() => {
        if (reciter != "") {
            setSewarList(reciter.moshaf[0].surah_list.split(','))
        }
    }, [reciter])

    useEffect(() => {
        const newarr = []
        if (sewarList != '') {
            sewarList.map(soraList => {
                sewar?.map(soraName => {
                    if (soraName.id == soraList) {
                        newarr.push(soraName)
                        setNewSewar(newarr)
                    }
                })
            })
        }
    }, [sewarList])

    const handlePlay = (sora) => {
        setSoraId(`${(sora.id.toString().padStart(3, 0))}.mp3`)
        setServer(`${reciter.moshaf[0].server}${(sora.id.toString().padStart(3, 0))}.mp3`)
        setPlay(true)
    }


    return (
        <div className=''>
            <div className='landing' style={{ height: "350px" }}>
                <div className='landing-img'>
                    <img src={landingImg} />
                </div>
                <div className='text-center landing-text '>
                    <div className='d-flex align-items-center justify-content-center'>
                        <h2 className='landingTitle'> {reciter.name}</h2>
                    </div>
                    <div className='recDivSearch'>
                        <input
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            type='text'
                            placeholder='ابحث عن سورة لهذا القارئ' />
                    </div>
                </div>
            </div>

            <div className='container mainRec'>
                <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "40px" }}>جميع السور لهذا القارئ</h2>
                <div className='sewarBoxes '>
                    {newSewar.filter((item) => {
                        return search !== "" ? item.name.toLowerCase().includes(search) : sewar
                    }).map((sora, index) => (
                        <button
                            key={sora.id}
                            onClick={() => handlePlay(sora)}
                            style={{ backgroundColor: "transparent", border: `1px solid ${colors.borderColor}` }}
                            className={`soraBox d-flex align-items-center
                            ${soraId == `${sora.id.toString().padStart(3, 0)}.mp3` && "soraBoxActiv"}`}
                        >
                            <div className='soraDet'>
                                <div style={{ color: colors.searchColor, backgroundColor: colors.soraNumberDiv }} className='soraNumberDiv'>
                                    <span style={{ color: colors.blackColor }} className='soraNumber'>
                                        {soraId == `${sora.id.toString().padStart(3, 0)}.mp3` ?
                                            <i className="fa-solid fa-pause"></i>
                                            :
                                            <i className="fa-solid fa-play"></i>
                                        }
                                    </span>
                                </div>
                                <span style={{ color: colors.blackColor }} >{`${(index + 1).toLocaleString("ar-SA")}`}</span>
                                <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }} className='soraName'>{sora.name}</span>
                            </div>
                            {/* <div className='ayahsCount' style={{ color: colors.greyColor }}>{sora.numberOfAyahs.toLocaleString('ar-EG')}  آيات</div> */}
                        </button>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Reciter