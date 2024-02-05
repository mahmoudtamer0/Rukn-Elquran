import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useData } from '../../context/AppContext'
import ScrollProgressBar from '../scroll/ScrollProgressBar'
import './sewar.css'
import './sewar.css'


const SoraMain = () => {

    let { soraNum } = useParams()
    const {
        getReciters,
        getAyahs, ayahs,
        setScrollBool, colors,
        setServer, setSoraId,
        sewar, getSewar
    } = useData()

    const selecRef = useRef()
    const [pages, setPages] = useState({})
    const [reciters, setReciters] = useState([])
    const [soraName, setSoraName] = useState('')
    const [audioBool, setAudioBool] = useState(false)



    useEffect(() => {
        getSewar()
        setScrollBool(true)
        getAyahs(soraNum)
        fetch(`https://api.alquran.cloud/v1/surah/${soraNum}/ar.alafasy`)
            .then(res => res.json())
            .then(data => setSoraName(data.data.name))
    }, [])


    useEffect(() => {
        // Group data by page number
        const groupedPages = {};
        ayahs.forEach(item => {
            const { page } = item;
            if (!groupedPages[page]) {
                groupedPages[page] = [];
            }
            groupedPages[page].push(item);
        });
        setPages(groupedPages);
    }, [ayahs]);

    useEffect(() => {
        fetch(" https://www.mp3quran.net/api/v3/reciters?language=ar")
            .then(res => res.json())
            .then(data => setReciters(data.reciters))
    }, [])

    const handlePlayClick = () => {
        setAudioBool(true)
        setServer(reciters[0]?.moshaf[0].server)
        setSoraId(soraNum.padStart(3, 0))
    }
    const handlePauseClick = () => {
        setAudioBool(false)
        setSoraId("")
    }
    return (
        <div className='Sora'>

            <div className='soraContent'>
                <div className='text-center soraMainName'>
                    <h1> {soraName}</h1>
                </div>
                <div className='besmAllah'>
                    <h2 className=' text-center'>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h2>
                </div>
                <div>
                    <div className='audioButton'>
                        {!audioBool ? <button onClick={() => handlePlayClick()}>
                            <i class="fa-solid fa-play"></i>  تشغيل السورة صوتيا
                        </button> : <button className='audioStop' onClick={() => handlePauseClick()}>
                            <i class="fa-solid fa-stop"></i>  ايقاف المشغل
                        </button>}
                    </div>
                    {Object.keys(pages).map(pageNumber => (
                        <div
                            style={{ borderBottom: `1px solid ${colors.borderColor}` }}
                            className='soraPage'
                            key={pageNumber}>
                            <p style={{ color: colors.blackColor }}>
                                {pages[pageNumber].map((item) => (
                                    <span className='ayahSpan'>{item.text.includes("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ") ?
                                        item.text.split("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ").toString() : item.text}
                                        <span style={{ margin: "7px" }}>{item.numberInSurah.toLocaleString('ar-EG')}</span></span>
                                ))}
                            </p>
                            <div className='text-center mt-3'> <span>{pageNumber.toLocaleString('ar-EG')}</span> </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SoraMain