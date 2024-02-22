import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useData } from '../../context/AppContext'
import './sewar.css'
import './sewar.css'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SideBar = ({ soraNum }) => {

    const {
        soraId,
        colors,
        setSoraId,
        sideBarOpen,
        setSideBarOpen,
        lang,
    } = useData()


    const [sewar, setSewar] = useState([])
    const [search, setSearch] = useState('')
    const history = useLocation();
    const linkRef = useRef()
    const { t, i18n } = useTranslation()

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);



    useEffect(() => {
        if (document.querySelector(`#activeDiv`)?.offsetTop - linkRef.current?.offsetTop < 428) {
            return
        } else {
            linkRef.current.scrollTop = document.querySelector(`#activeDiv`)?.offsetTop - linkRef.current?.offsetTop - 200;
        }
    }, [sewar])


    useEffect(() => {
        setSoraId(`${soraNum.padStart(3, 0)}.mp3`)
    }, [soraId])

    const getSewar = () => {
        fetch(`https://mp3quran.net/api/v3/suwar?language=${lang}`)
            .then(res => res.json())
            .then(data => setSewar(data.suwar))
    }

    useEffect(() => {
        getSewar()
    }, [])

    return (
        <div className={`soraSideBar ${visible ? "sideBarIsVisible" : "sideBarIsNotVisible"} ${!sideBarOpen ? "sideHide" : null}`}
            style={{
                borderLeftColor: colors.borderColor, backgroundColor: colors.sidBarColor
            }}>
            <div className={`${lang == "eng" && "text-end"} btnOfSideBar`}>
                {sideBarOpen ?
                    <button
                        onClick={() => setSideBarOpen(false)}
                        className={`btnSora`}
                        style={{ color: colors.blackColor }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    :
                    <button
                        onClick={() => setSideBarOpen(true)}
                        className="btnSora Btnclose"
                        style={{ color: colors.blackColor }}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                }

            </div>
            <div className='sidBarContent'>
                <div className='sideBarCloseBtn'>
                    <button
                        style={{ color: colors.blackColor }}
                        onClick={() => setSideBarOpen(false)}
                    ><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className='sideBarInput'>
                    <input
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        placeholder={t("sora.search_for_surah")}
                        style={{ backgroundColor: colors.searchColor }}
                        type='text' />
                </div>
                <div className='scrolll'>
                    <div ref={linkRef} id='sideBar' className='sideBarSoraNameDiv'>

                        {sewar?.filter((item) => {
                            return search !== "" ? item.name.toLowerCase().includes(search) : sewar
                        }).map(sora => {
                            return (
                                <div key={sora.id} id={sora.id == soraNum ? "activeDiv" : ""}>
                                    <NavLink
                                        style={{ color: colors.blackColor }}
                                        id={`id${(soraNum)}`}
                                        className={'mainSoraLink'}
                                        to={`/quran/surah/${sora.id}`}
                                        onClick={(e) => setSideBarOpen(false)}>
                                        {lang == "ar" ?
                                            <span>{sora.id.toLocaleString('ar-EG')}</span>
                                            :
                                            <span>{sora.id}</span>
                                        }

                                        <span>{sora.name}</span>
                                    </NavLink>
                                </div>

                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SideBar