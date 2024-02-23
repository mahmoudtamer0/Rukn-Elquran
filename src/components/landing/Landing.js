import { Link, useNavigate } from 'react-router-dom';
import landingLogo from '../../images/quran-mazid-hero-calio.png'
import landingImg from '../../images/quran-book.jpg'
import './landing.css'
import { useData } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function Landing() {

    const { colors, reciters, getReciters, lang, font, setSearchResults } = useData()
    const [search, setSearch] = useState("")
    const [sewar, setSewar] = useState([])
    const [focused, setFocused] = useState(false)
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        getReciters()
        fetch(`https://mp3quran.net/api/v3/suwar?language=${lang}`)
            .then(res => res.json())
            .then(data => setSewar(data.suwar))
    }, [])

    const handleClose = () => {
        document.querySelector(".searchBox").classList.add("hide")
        document.querySelector(".searchBox").classList.remove("visibleSearchBox")
    }

    useEffect(() => {
        if (focused) {
            document.querySelector(".searchBox").classList.remove("hide")
            document.querySelector(".searchBox").classList.add("visibleSearchBox")
        } else {
            document.querySelector(".searchBox").classList.add("hide")
            document.querySelector(".searchBox").classList.remove("visibleSearchBox")
        }
    }, [focused])

    useEffect(() => {
        if (search == "") {
            handleClose()
        } else {
            document.querySelector(".searchBox").classList.remove("hide")
            document.querySelector(".searchBox").classList.add("visibleSearchBox")
        }
    }, [search])

    const handlesubmit = (e) => {
        e.preventDefault()
        if (search != '') {
            setSearchResults(search)
            navigate("/search_results")
        }
    }

    return (
        <div className='landing'>
            <div className='landing-img'>
                <img src={landingImg} alt='...' />
            </div>
            <div className='text-center landing-text '>
                <div className='d-flex align-items-center justify-content-center'>
                    <img style={{ width: "65px", margin: "10px" }} src={landingLogo} alt='..' />
                    <h2
                        style={{ fontFamily: font }}
                        className={`landingTitle ${lang == "eng" ? "font2" : null}`}>
                        {t("navBar.logo")}
                    </h2>
                </div>
                <div className='landDesc'>
                    <p style={{ margin: "0", color: "#dbdbdb", maxWidth: "100%" }}>{t("landing.p1")}</p>
                    <p style={{ maxWidth: "100%", margin: "0", marginTop: "20px", marginBottom: "20px", color: "#dbdbdb" }}>{t("landing.p2")}</p>
                </div>
                <div className='inpDiv'>
                    <div className='inpMainDiv'>
                        <div className='searchInputDiv' style={{ position: "relative" }}>
                            <form onSubmit={handlesubmit}>
                                <input
                                    onBlur={() => {
                                        setTimeout(() => {
                                            setFocused(false)
                                        }, 300);
                                    }}
                                    className='inpForSearch'
                                    onFocus={() => setFocused(true)}
                                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                    style={{ backgroundColor: colors.searchColor, color: colors.black }}
                                    type='text'
                                    placeholder={t("landing.search")} />

                                <i onClick={handlesubmit} className={`${lang == "eng" ? "rightI" : "leftI"} fa-solid fa-magnifying-glass`}></i>
                            </form>
                        </div>
                        <div className='fastLinksDiv text-end mt-3 '>
                            <div className='fastLinks'>
                                <Link to={`/quran/surah/1`}>{t("landing.link1")}</Link>
                                <Link to={`/quran/surah/2`}>{t("landing.link2")}</Link>
                                <Link to={`/reciters/107`}>{t("landing.link3")}</Link>
                                <Link to={`/reciters/105`}>{t("landing.link4")}</Link>
                            </div>

                        </div>
                        <div style={{ borderColor: colors.borderColor }}
                            className={`searchBox text-end hide ${search == "" && "h00"}`}>
                            <div className='mb-3'>
                                {
                                    sewar.filter((item) => {
                                        return item.name.toLowerCase().includes(search) ? search : null
                                    }).map(link => {
                                        return (
                                            <Link
                                                key={link.id}
                                                to={`/quran/surah/${link.id}`}
                                                className='searchMainLink'>
                                                <span>{link.name}</span>
                                                <i className="fa-solid fa-arrow-left"></i>
                                            </Link>
                                        )
                                    })
                                }
                                {
                                    reciters.filter((item) => {
                                        return item.name.toLowerCase().includes(search) ? search : null
                                    }).map(link => {
                                        return (
                                            <Link
                                                key={link.id}
                                                to={`/reciters/${link.id}`}
                                                className='searchMainLink'>
                                                <span>{t("reciters.reciter")} {link.name}</span>
                                                <i className="fa-solid fa-arrow-left"></i>
                                            </Link>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Landing;