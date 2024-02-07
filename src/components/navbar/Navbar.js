import { NavLink, Link } from "react-router-dom";

import './navbar.css'
import { useEffect, useState } from "react";
import ScrollProgressBar from "../scroll/ScrollProgressBar";
import { useData } from "../../context/AppContext";

function Navbar() {
    const { scrollBool, setSideBarOpen, sideBarOpen, soraNow } = useData()
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

    return (
        <div className={`navbar ${visible ? 'visible' : 'hidden'}`}>
            <nav style={{ display: "block" }} className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link to={'/Rukn-Elquran'} className="navLogo">
                        <i className="fa-solid fa-book-open"></i>
                        <span>ركن القرآن</span>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                    </div>
                    <div></div>
                </div>
                {scrollBool ?
                    <div>
                        <div>
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
                        <ScrollProgressBar />
                    </div>
                    : null}
            </nav>

        </div>


    )
}

export default Navbar;