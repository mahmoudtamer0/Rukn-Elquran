import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./rec.css"
import { useData } from '../../context/AppContext'

import { NavLink } from 'react-router-dom'
import { Button } from 'bootstrap'

const Reciter = () => {
    const { sewar, getSewar, colors, setServer } = useData()
    const { recId } = useParams()
    const [sewarList, setSewarList] = useState([])
    const [newSewar, setNewSewar] = useState([])
    const [reciter, setReciter] = useState([])



    useEffect(() => {
        getSewar()
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
                    if (soraName.number == soraList) {
                        newarr.push(soraName)
                        setNewSewar(newarr)
                    }
                })
            })
        }
    }, [sewarList])

    const handlePlay = (soraNum) => {
        setServer(`${reciter.moshaf[0].server}${(soraNum.toString().padStart(3, 0))}.mp3`)
    }


    return (
        <div className='mainRec'>
            {reciter.name}

            <div className='container'>
                <div className='sewarBoxes row justify-content-between align-items-center'>

                    {newSewar.map((sora, index) => (
                        <button
                            onClick={() => handlePlay(sora.number)}
                            style={{ backgroundColor: colors.whiteColor, width: "48%" }}
                            className="soraBox d-flex align-items-center"
                        >
                            <div className='soraDet'>
                                <div style={{ color: colors.searchColor }} className='soraNumberDiv'>
                                    <span style={{ color: colors.blackColor }} className='soraNumber'> <i class="fa-solid fa-play"></i></span>
                                </div>
                                <span style={{ color: colors.blackColor }} className='soraName'>{`${(index + 1).toLocaleString('ar-EG')}${sora.name}`}</span>
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