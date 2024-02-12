import { NavLink, Link } from "react-router-dom";

import './navbar.css'
import { useEffect, useState } from "react";
import ScrollProgressBar from "../scroll/ScrollProgressBar";
import { useData } from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import "../../fonts/_PDMS_Saleem_QuranFont Regular.ttf"

import { useClickAway } from "@uidotdev/usehooks";

function Navbar() {
    const { scrollBool, setSideBarOpen,
        sideBarOpen, soraNow,
        colors, handleLightMode,
        handleEngLanguage, handleArLanguage, font, lang } = useData()
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [Langvisible, setLangVisible] = useState(false);
    const [sideNavBarShow, setSideNavBarShow] = useState(false)
    const { t, i18n } = useTranslation()

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

    const boxRef = useClickAway(() => {
        setLangVisible(false)
    })

    return (
        <div className={`navbar ${visible ? 'visible' : 'hidden'}`}>
            <div
                style={{ display: "block", backgroundColor: colors.navColor }}
                className={`sideNaveBar ${sideNavBarShow ? "sideNaveBarShow" : null}`}>
                <div className='sideBarCloseBtn'>
                    <button
                        style={{ color: colors.blackColor, textAlign: "end" }}
                        onClick={() => setSideNavBarShow(false)}
                    ><i className="fa-solid fa-xmark"></i></button>
                </div>
                <p style={{ color: colors.blackColor, margin: "0" }}
                    className="text-center"
                >القائمة</p>
                <div className="divLinks">
                    <NavLink
                        to={`/Rukn-Elquran`}
                        onClick={() => setSideNavBarShow(false)}
                        style={{ color: colors.blackColor, borderBlockColor: colors.borderColor }}
                        className="nav-link" aria-current="page" href="#">
                        <i className="fa-solid fa-house"></i>
                        <span>
                            الصفحة الرئيسية
                        </span>
                    </NavLink>
                    <NavLink
                        to={`/Rukn-Elquran/sewar`}
                        onClick={() => setSideNavBarShow(false)}
                        style={{ color: colors.blackColor, borderBlockColor: colors.borderColor }}
                        className="nav-link" aria-current="page" href="#">
                        <i className="fa-solid fa-book-quran"></i>
                        <span>
                            السور
                        </span>
                    </NavLink>
                    <NavLink
                        onClick={() => setSideNavBarShow(false)}
                        to={`/Rukn-Elquran/reciters`}
                        style={{ color: colors.blackColor, borderBlockColor: colors.borderColor }}
                        className="nav-link" href="#"
                    >
                        <i className="fa-solid fa-tower-broadcast"></i>
                        <span>
                            القراء
                        </span>
                    </NavLink>
                    <NavLink
                        onClick={() => setSideNavBarShow(false)}
                        to={`/Rukn-Elquran/radio`}
                        style={{ color: colors.blackColor, borderBlockColor: colors.borderColor }}
                        className="nav-link" href="#"
                    >
                        <i className="fa-regular fa-clock"></i>
                        <span>
                            راديو القران
                        </span>
                    </NavLink>
                    <NavLink
                        onClick={() => setSideNavBarShow(false)}
                        to={`/Rukn-Elquran/reciters`}
                        style={{ color: colors.blackColor, borderBlockColor: colors.borderColor }}
                        className="nav-link" href="#"
                    >
                        <i className="fa-solid fa-exclamation"></i>
                        <span>
                            معلومات عنا
                        </span>
                    </NavLink>
                </div>
            </div>
            <nav style={{ display: "block", backgroundColor: colors.navColor }} className="navbar navbar-expand-lg ">
                <div className="container">


                    <div style={{ gap: "10px" }} className="d-flex align-items-center">
                        <div className="barsDiv">
                            <i
                                onClick={() => setSideNavBarShow(true)}
                                style={{ color: colors.blackColor }}
                                className="fa-solid fa-bars"></i>
                        </div>
                        <Link to={'/Rukn-Elquran'} style={{ fontFamily: font }} className="navLogo">
                            <i className="fa-solid fa-book-open"></i>
                            <span
                                style={{ color: colors.blackColor }}
                            >{t("navBar.logo")}</span>
                        </Link>
                    </div>

                    <div className=" navNav" id="">
                        <ul style={{ gap: "45px" }} className="navbar-nav me-auto mb-2 mb-lg-0 ulMainLinks">
                            <li className="nav-item">
                                <NavLink
                                    to={`/Rukn-Elquran/sewar`}
                                    style={{ color: colors.blackColor }}
                                    className="nav-link" aria-current="page" href="#">السور</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to={`/Rukn-Elquran/reciters`}
                                    style={{ color: colors.blackColor }}
                                    className="nav-link" href="#">القراء</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to={`/Rukn-Elquran/radio`}
                                    style={{ color: colors.blackColor }}
                                    className="nav-link" href="#"> راديو القران</NavLink>
                            </li>
                            <li className="nav-item">
                                <a
                                    style={{ color: colors.blackColor }}
                                    className="nav-link" href="#">معلومات عنا</a>
                            </li>
                        </ul>
                    </div>
                    <div className=" navIconsDiv" id="navbarTogglerDemo03">
                        <ul className=" me-auto mb-2 mb-lg-0">
                            <li className="nav-item langLi" style={{ position: "relative" }}>
                                {JSON.parse(localStorage.getItem("mode")) == "dark" ?
                                    <i
                                        style={{ backgroundColor: colors.iconBackGround }}
                                        onClick={() => handleLightMode()}
                                        className="fa-solid fa-sun"></i>
                                    :
                                    <i
                                        style={{ backgroundColor: colors.iconBackGround }}
                                        onClick={() => handleLightMode()}
                                        className="fa-solid fa-moon"></i>
                                }
                                <div ref={boxRef} className={`${Langvisible ? "d-block" : "d-none"}`}>
                                    <button onClick={() => handleArLanguage()}>Arabic</button>
                                    <button onClick={() => handleEngLanguage()}>English</button>
                                </div>
                            </li>
                            <li className="nav-item" >
                                <i
                                    onClick={() => {
                                        Langvisible ? setLangVisible(false) : setLangVisible(true)
                                    }}
                                    style={{ backgroundColor: colors.iconBackGround }}
                                    className="fa-solid fa-language"></i>
                            </li>

                            {/* <li className="nav-item">
                                <i
                                    onClick={() => handleEngLanguage()}
                                    style={{ backgroundColor: colors.iconBackGround }}
                                    className="fa-solid fa-language"></i>
                            </li> */}
                        </ul>
                    </div>
                </div>



                {scrollBool ?
                    <>
                        <ScrollProgressBar />
                        <div>
                            <div className={`${lang == "eng" && "text-end"}`} style={{ paddingTop: "8px" }}>
                                {sideBarOpen ?
                                    <button
                                        onClick={() => setSideBarOpen(false)}
                                        className={`btnSora`}
                                    >
                                        <i className="fa-solid fa-angle-right"></i>
                                        <span>{soraNow}</span>
                                    </button>
                                    :
                                    <button
                                        onClick={() => setSideBarOpen(true)}
                                        className="btnSora Btnclose"
                                    >
                                        <span>{soraNow}</span>
                                        <i className="fa-solid fa-angle-left"></i>
                                    </button>
                                }

                            </div>
                        </div>
                    </>
                    : null}
            </nav>

        </div >


    )
}

export default Navbar;