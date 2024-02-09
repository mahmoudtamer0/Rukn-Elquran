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
    const { colors, setServer } = useData()
    const { recId } = useParams()
    const [soraId, setSoraId] = useState("")
    const [sewarList, setSewarList] = useState([])
    const [sewar, setSewar] = useState([])
    const [newSewar, setNewSewar] = useState([])
    const [reciter, setReciter] = useState([])
    const [search, setSearch] = useState([])



    useEffect(() => {
        fetch("https://mp3quran.net/api/v3/suwar?language=ar")
            .then(res => res.json())
            .then(data => setSewar(data.suwar))
        fetch(`https://www.mp3quran.net/api/v3/reciters?language=ar&reciter=${recId}`)
            .then(res => res.json())
            .then(data => setReciter(data.reciters[0]))
    }, [])



    useEffect(() => {
        if (reciter != "") {
            setSewarList(reciter.moshaf[0].surah_list.split(','))
        }
        // setSewarList(reciter.moshaf[0].surah_list.split(','))
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
        setSoraId(`${(sora.id.toString().padStart(3, 0))}`)
        setServer(`${reciter.moshaf[0].server}${(sora.id.toString().padStart(3, 0))}.mp3`)
    }


    return (
        <div className=''>
            <div className='landing'>
                <div className='landing-img'>
                    <img src={landingImg} />
                </div>
                <div className='text-center landing-text '>
                    <div className='d-flex align-items-center justify-content-center'>
                        <h2 className='landingTitle'> {reciter.name}</h2>
                    </div>
                    <div className='recDivSearch'>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type='text'
                            placeholder='ابحث عن سورة لهذا القارئ' />
                    </div>
                </div>
            </div>

            <div className='container mainRec'>
                <div className='sewarBoxes '>
                    {newSewar.filter((item) => {
                        return search !== "" ? item.name.includes(search) : sewar
                    }).map((sora, index) => (
                        <button
                            onClick={() => handlePlay(sora)}
                            style={{ backgroundColor: colors.whiteColor }}
                            className={`soraBox d-flex align-items-center
                            ${soraId == sora.id && "soraBoxActiv"}`}
                        >
                            <div className='soraDet'>
                                <div style={{ color: colors.searchColor }} className='soraNumberDiv'>
                                    <span style={{ color: colors.blackColor, zIndex: 0 }} className='soraNumber'>
                                        {soraId == sora.id ?
                                            <i class="fa-solid fa-pause"></i>
                                            :
                                            <i class="fa-solid fa-play"></i>
                                        }
                                    </span>
                                </div>
                                <span>{`${(index + 1).toLocaleString("ar-SA")}`}</span>
                                <span style={{ color: colors.blackColor }} className='soraName'>{sora.name}</span>
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