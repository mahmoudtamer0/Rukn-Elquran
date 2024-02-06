import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams, NavLink } from 'react-router-dom'
import { useData } from '../../context/AppContext'
import ScrollProgressBar from '../scroll/ScrollProgressBar'
import './sewar.css'
import './sewar.css'
import { useLocation } from 'react-router-dom'
import { useClickAway } from "@uidotdev/usehooks";
import { useOnClickOutside } from 'usehooks-ts'


const SoraMain = () => {

    let { soraNum } = useParams()
    const {
        getReciters,
        soraId,
        getAyahs, ayahs,
        setScrollBool, colors,
        setServer, setSoraId,
    } = useData()

    const spanref = useRef(null)
    const [pages, setPages] = useState({})
    const [reciters, setReciters] = useState([])
    const [sewar, setSewar] = useState([])
    const [soraName, setSoraName] = useState('')
    const [audioBool, setAudioBool] = useState(false)
    const [search, setSearch] = useState('')
    const [tafseer, setTafseer] = useState([])
    const [tafseerBool, setTafseerBool] = useState(false)
    const [tafseerBoxBool, setTafseerBoxBool] = useState(false)
    const [ayahInTafseer, setAyahInTafseer] = useState('')
    const [theTafseer, setTheTafseer] = useState('')

    const history = useLocation();
    const linkRef = useRef()

    const bts = [...document.querySelectorAll('.tafseerBtn')];
    const ays = [...document.querySelectorAll('.ayahSpan')];


    const getSewar = () => {
        fetch("https://mp3quran.net/api/v3/suwar?language=ar")
            .then(res => res.json())
            .then(data => setSewar(data.suwar))
    }

    const getTafseer = () => {
        fetch(`https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${soraNum}`)
            .then(res => res.json())
            .then(data => setTafseer(data.result))
    }

    const handleTafseer = (ayah) => {
        bts.map(bt => {
            bt.classList.remove("visible")
            bt.classList.add("hide")
            console.log(bt)
        })
        ays.map(bt => {
            bt.classList.remove("ayahClicked")
        })

        document.querySelector(`.ayahSpan${ayah.numberInSurah}`)?.classList.add("ayahClicked")

        let filter = tafseer?.filter(item => item.aya == ayah.numberInSurah)
        setAyahInTafseer(filter[0].arabic_text)
        setTheTafseer(filter[0].translation)
        document.querySelector(`.tafseer${ayah.numberInSurah}`)?.classList.remove("hide")
        document.querySelector(`.tafseer${ayah.numberInSurah}`)?.classList.add("visible")
    }

    const handleTafseerClose = (ayahNum) => {
        document.querySelector(`.tafseer${ayahNum}`).classList.remove("visible")
        document.querySelector(`.tafseer${ayahNum}`).classList.add("hide")
        document.querySelector(`.ayahSpan${ayahNum}`)?.classList.remove("ayahClicked")
    }

    useEffect(() => {
        if (tafseerBoxBool == false) {
            bts.map(bt => {
                bt.classList.remove("visible")
                bt.classList.add("hide")
            })

            ays.map(bt => {
                bt.classList.remove("ayahClicked")
            })
        } else return
    }, [tafseerBoxBool])


    const handleDetailedTafseer = (ayah) => {
        setTafseerBoxBool(true)
    }

    const handleTafseerBoxClose = () => {
        bts.map(bt => {
            bt.classList.remove("visible")
            bt.classList.add("hide")
            console.log(bt)
        })
        console.log(document.querySelector(`.tafseer`))
        setTafseerBoxBool(false)
    }

    const boxRef = useClickAway(() => {
        setTafseerBoxBool(false)
    });


    useEffect(() => {
        getSewar()
        getTafseer()
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

    useEffect(() => {
        if (soraId == "") {
            setAudioBool(false)
        } else {
            setAudioBool(true)
        }
    }, [soraId])
    const handlePauseClick = () => {
        setAudioBool(false)
        setSoraId("")
    }

    // sid bar

    const handleLinkClick = (newNum, e) => {
        history?.push(`${newNum}`);
    };




    useEffect(() => {
        if (document.querySelector(`#activeDiv`)?.offsetTop - linkRef.current?.offsetTop < 428) {
            return
        } else {
            linkRef.current.scrollTop = document.querySelector(`#activeDiv`)?.offsetTop - linkRef.current?.offsetTop - 200;
        }
    }, [sewar])



    return (
        <div className='Sora'>
            <div className='soraSideBar' style={{ width: "20%", borderLeftColor: colors.borderColor }}>
                <div className='sidBarContent'>
                    <div className='sideBarInput'>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='ابحث عن سورة'
                            style={{ backgroundColor: colors.searchColor }}
                            type='text' />
                    </div>
                    <div className='scrolll'>
                        <div ref={linkRef} id='sideBar' className='sideBarSoraNameDiv'>

                            {sewar?.filter((item) => {
                                return search !== "" ? item.name.includes(search) : sewar
                            }).map(sora => {
                                return (
                                    <div key={sora.id} id={sora.id == soraNum ? "activeDiv" : ""}>
                                        <NavLink
                                            style={{ color: colors.blackColor }}
                                            id={`id${(soraNum)}`}
                                            className={'mainSoraLink'}
                                            to={`/Rukn-Elquran/sewar/${sora.id}`}
                                            onClick={(e) => handleLinkClick(sora.id, e.target)}>
                                            <span>{sora.id.toLocaleString('ar-EG')}</span>
                                            <span>{sora.name}</span>
                                        </NavLink>
                                    </div>

                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
            <div className='soraContent'>
                <div ref={boxRef} className={tafseerBoxBool ? "tafseerBox boxVisible" : "tafseerBox"}>
                    <div className='tafseerBoxCloseBtn'>
                        <button onClick={() => {
                            handleTafseerBoxClose()
                        }
                        }><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div>{ayahInTafseer}</div>
                    <div>{theTafseer}</div>
                </div>
                <div className='text-center soraMainName'>
                    <h1> {soraName}</h1>
                </div>
                <div className='besmAllah'>
                    <h2 className=' text-center'>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h2>
                </div>
                <div>
                    <div className='audioButton'>
                        {!audioBool ? <button onClick={() => handlePlayClick()}>
                            <i className="fa-solid fa-play"></i>  تشغيل السورة صوتيا
                        </button> : <button className='audioStop' onClick={() => handlePauseClick()}>
                            <i className="fa-solid fa-stop"></i>  ايقاف المشغل
                        </button>}
                    </div>
                    {Object.keys(pages).map(pageNumber => (
                        <div
                            style={{ borderBottom: `1px solid ${colors.borderColor}` }}
                            className='soraPage'
                            key={pageNumber}>
                            <p style={{ color: colors.blackColor }} className='pAyah'>
                                {pages[pageNumber].map((item) => (
                                    <>
                                        <span
                                            className={`tafseerBtn hide tafseer${item.numberInSurah}`}>
                                            <button
                                                onClick={() => handleDetailedTafseer(item)}
                                            >
                                                تفسير الاية؟
                                            </button>
                                            <i
                                                className="fa-solid fa-circle-xmark"
                                                onClick={() => handleTafseerClose(item.numberInSurah)}
                                            >
                                            </i>
                                        </span>
                                        <span
                                            ref={spanref}
                                            onClick={() => handleTafseer(item)}
                                            className={`ayahSpan ayahSpan${item.numberInSurah}`}>
                                            {item.text.includes("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ") ?
                                                item.text.split("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ").toString()
                                                : item.text}
                                            <span style={{ margin: "7px" }}>{item.numberInSurah.toLocaleString('ar-EG')}</span>
                                        </span>
                                    </>
                                ))}
                            </p>
                            <div className='text-center mt-3'> <span>{pageNumber.toLocaleString('ar-EG')}</span> </div>
                        </div>
                    ))}
                </div>
                <div className='text-center nextButtons'>
                    {+soraNum > 1 && <Link
                        to={`/Rukn-Elquran/sewar/${+soraNum - 1}`}
                        onClick={() => history?.push(`${+soraNum - 1}`)}
                        style={{ color: colors.whiteColor, backgroundColor: colors.mainColor }}>
                        <i className="fa-solid fa-chevron-right"></i>
                        <span style={{ marginRight: "10px" }}>
                            السورة السابقة
                        </span>
                    </Link>}
                    {+soraNum <= 113 &&
                        < Link
                            to={`/Rukn-Elquran/sewar/${+soraNum + 1}`}
                            onClick={() => history?.push(`${+soraNum + 1}`)}
                            style={{ color: colors.whiteColor, backgroundColor: colors.mainColor }}>
                            <span style={{ marginLeft: "10px" }}>
                                السورة القادمة
                            </span>

                            <i className="fa-solid fa-chevron-left"></i>
                        </Link>}

                </div>
            </div>
        </div >
    )
}

export default SoraMain