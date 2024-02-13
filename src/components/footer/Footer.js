import './footer.css'
import { useTranslation } from 'react-i18next'
import android from '../../images/android.svg'
import apple from '../../images/apple.svg'
import { useData } from '../../context/AppContext';
function Footer() {
    const { t, i18n } = useTranslation();
    const { colors } = useData()
    return (
        <div className="footer" style={{ backgroundColor: colors.navColor }}>
            <div className='foot-secondlayer' style={{ backgroundColor: colors.navColor }}>
                <div className='container'>
                    <div className='row foot-sec-main justify-content-between align-items-center'>
                        <div className='secondlayer-firstdiv col-lg-2 col-md-4 col-sm-12 col-12'>
                            <h4>{t("footer.about_store")}</h4>
                            <p>{t("footer.about_desc")}</p>
                        </div>
                        <div className='secondlayer-secdiv col-lg-2 col-md-4 col-sm-12 col-12'>
                            <h4>{t("footer.col2_title")}</h4>
                            <ul>
                                <li><i className="fa-solid fa-angles-left"></i> <a>{t("footer.col2_link1")}</a> </li>
                                <li><i className="fa-solid fa-angles-left"></i> <a>{t("footer.col2_link2")}</a> </li>
                                <li><i className="fa-solid fa-angles-left"></i> <a>{t("footer.col2_link3")}</a> </li>
                                <li><i className="fa-solid fa-angles-left"></i> <a>{t("footer.col2_link4")}</a> </li>
                            </ul>
                        </div>
                        <div className='secondlayer-thrdiv col-lg-2 col-md-4 col-sm-12 col-12'>
                            <h4>{t("footer.col3_title")}</h4>
                            <ul>
                                <li><i className="fa-solid fa-angles-left"></i> <a>{t("footer.col3_link1")}</a> </li>
                                <li><i className="fa-solid fa-angles-left"></i> <a>{t("footer.col3_link2")}</a> </li>
                                <li><i className="fa-solid fa-angles-left"></i> <a>{t("footer.col3_link3")}</a> </li>
                                <li><i className="fa-solid fa-angles-left"></i> <a>{t("footer.col3_link4")}</a> </li>
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
                                <a style={{ color: colors.mainColor }}
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