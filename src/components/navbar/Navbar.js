import { NavLink, Link } from "react-router-dom";

import './navbar.css'
import { useEffect, useState } from "react";
import ScrollProgressBar from "../scroll/ScrollProgressBar";
import { useData } from "../../context/AppContext";

function Navbar() {
    const { scrollBool, setSideBarOpen, sideBarOpen, soraNow, colors, handleLightMode } = useData()
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [sideNavBarShow, setSideNavBarShow] = useState(false)

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
                        style={{ color: colors.blackColor, borderBlockColor: colors.borderColor }}
                        className="nav-link" aria-current="page" href="#">
                        <i class="fa-solid fa-house"></i>
                        <span>
                            الصفحة الرئيسية
                        </span>
                    </NavLink>
                    <NavLink
                        to={`/Rukn-Elquran/sewar`}
                        style={{ color: colors.blackColor, borderBlockColor: colors.borderColor }}
                        className="nav-link" aria-current="page" href="#">
                        <i class="fa-solid fa-book-quran"></i>
                        <span>
                            السور
                        </span>
                    </NavLink>
                    <NavLink
                        to={`/Rukn-Elquran/reciters`}
                        style={{ color: colors.blackColor, borderBlockColor: colors.borderColor }}
                        className="nav-link" href="#"
                    >
                        <i class="fa-solid fa-tower-broadcast"></i>
                        <span>
                            القراء
                        </span>
                    </NavLink>
                    <NavLink
                        to={`/Rukn-Elquran/reciters`}
                        style={{ color: colors.blackColor, borderBlockColor: colors.borderColor }}
                        className="nav-link" href="#"
                    >
                        <i class="fa-regular fa-clock"></i>
                        <span>
                            مواقيت الصلاة
                        </span>
                    </NavLink>

                    <NavLink
                        to={`/Rukn-Elquran/reciters`}
                        style={{ color: colors.blackColor, borderBlockColor: colors.borderColor }}
                        className="nav-link" href="#"
                    >
                        <i class="fa-solid fa-exclamation"></i>
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
                                class="fa-solid fa-bars"></i>
                        </div>
                        <Link to={'/Rukn-Elquran'} className="navLogo">
                            <i className="fa-solid fa-book-open"></i>
                            <span
                                style={{ color: colors.blackColor }}
                            >ركن القرآن</span>
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
                                <a
                                    style={{ color: colors.blackColor }}
                                    className="nav-link" href="#">مواقيت الصلاة</a>
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
                            <li className="nav-item">
                                {JSON.parse(localStorage.getItem("mode")) == "dark" ?
                                    <i
                                        style={{ backgroundColor: colors.iconBackGround }}
                                        onClick={() => handleLightMode()}
                                        class="fa-solid fa-sun"></i>
                                    :
                                    <i
                                        style={{ backgroundColor: colors.iconBackGround }}
                                        onClick={() => handleLightMode()}
                                        class="fa-solid fa-moon"></i>
                                }

                            </li>
                            <li className="nav-item">
                                <i
                                    style={{ backgroundColor: colors.iconBackGround }}
                                    class="fa-solid fa-language"></i>
                            </li>
                        </ul>
                    </div>
                </div>



                {scrollBool ?
                    <>
                        <ScrollProgressBar />
                        <div>
                            <div style={{ paddingTop: "8px" }}>
                                {sideBarOpen ?
                                    <button
                                        onClick={() => setSideBarOpen(false)}
                                        className="btnSora"
                                    >
                                        <i class="fa-solid fa-angle-right"></i>
                                        <span>{soraNow}</span>
                                    </button>
                                    :
                                    <button
                                        onClick={() => setSideBarOpen(true)}
                                        className="btnSora Btnclose"
                                    >
                                        <span>{soraNow}</span>
                                        <i class="fa-solid fa-angle-left"></i>
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