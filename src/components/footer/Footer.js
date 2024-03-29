import './footer.css'
import { useTranslation } from 'react-i18next'
import { useData } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';
function Footer() {
    const { t, i18n } = useTranslation();
    const { colors } = useData()
    return (
        <div className="footer" style={{ backgroundColor: colors.navColor }}>
            <div className='foot-secondlayer' style={{ backgroundColor: colors.navColor }}>
                <div className='container'>
                    <div className='row foot-sec-main justify-content-between align-items-center'>
                        <div className='secondlayer-firstdiv col-lg-2 col-md-4 col-sm-12 col-12'>
                            <h4 style={{ color: colors.blackColor }}>{t("footer.about_store")}</h4>
                            <p>{t("footer.about_desc")}</p>
                        </div>
                        <div className='secondlayer-secdiv col-lg-2 col-md-4 col-sm-12 col-12'>
                            <h4 style={{ color: colors.blackColor }}>{t("footer.col2_title")}</h4>
                            <ul>
                                <li><i className="fa-solid fa-angles-left"></i> <NavLink to={`/`}>{t("footer.col2_link1")}</NavLink> </li>
                                <li><i className="fa-solid fa-angles-left"></i> <NavLink to={`/radio`}>{t("footer.col2_link2")}</NavLink> </li>
                                <li><i className="fa-solid fa-angles-left"></i> <NavLink to={`/reciters`}>{t("footer.col2_link3")}</NavLink> </li>
                                <li><i className="fa-solid fa-angles-left"></i> <NavLink to={`/quran/sewar`}>{t("footer.col2_link4")}</NavLink> </li>
                            </ul>
                        </div>
                        <div className='secondlayer-thrdiv col-lg-2 col-md-4 col-sm-12 col-12'>
                            <h4 style={{ color: colors.blackColor }}>{t("footer.col3_title")}</h4>
                            <ul>
                                <li><i className="fa-solid fa-angles-left"></i> <NavLink to={`/quran/surah/36`}>{t("footer.col3_link1")}</NavLink> </li>
                                <li><i className="fa-solid fa-angles-left"></i> <NavLink to={`/quran/surah/67`}>{t("footer.col3_link2")}</NavLink> </li>
                                <li><i className="fa-solid fa-angles-left"></i> <NavLink to={`/reciters/107`}>{t("footer.col3_link3")}</NavLink> </li>
                                <li><i className="fa-solid fa-angles-left"></i> <NavLink to={`/quran/surah/2`}>{t("footer.col3_link4")}</NavLink> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className='foot-lastlayer' style={{ backgroundColor: colors.navColor }}>
                <div className='container'>
                    <div className='foot-last-main row justify-content-between align-items-center'>
                        <div style={{
                            color: colors.blackColor
                        }} className='col-lg-3 foot-last-fdiv'>
                            {t("footer.copy_right")}
                        </div>
                        <div className='foot-madby col-lg-3'>
                            <h4 style={{ color: colors.blackColor, fontSize: "14px", margin: "0" }}>Made By:
                                <a className='mahmoud' style={{ color: colors.mainColor }}
                                    href='https://www.linkedin.com/in/mahmoudtamer0' target='_blank'
                                > Mahmoud Tamer </a></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;