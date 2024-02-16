import React from 'react'
import { useData } from '../context/AppContext'
import { useTranslation } from 'react-i18next'

const AboutUs = () => {
    const { colors } = useData()
    const { t, i18n } = useTranslation()
    return (
        <div className='mainRec' style={{ height: "49vh" }}>
            <div className='container mainRec' style={{ paddingBottom: "0" }}>
                <h2 style={{
                    color: colors.blackColor,
                    fontSize: "1.7rem", marginBottom: "30px"
                }}>{t("home.about_us")}</h2>

                <p style={{ color: colors.blackColor }}>{t("home.aboutp")}
                    <a target='_blank' className="mahmoud" href='https://www.linkedin.com/in/mahmoudtamer0/'>Mahmoud Tamer</a></p>

                <p style={{ color: colors.blackColor }}>{t("home.aboutp2")} : React.js</p>

                <p style={{ color: colors.blackColor }}>{t("home.aboutp3")} : 'alfont_com_AlFont_com_pdms-saleem-quranfont' </p>
                <p style={{ color: colors.blackColor }}
                >
                    {t("home.aboutp4")}
                    :  <a target='_blank' className="mahmoud" href='https://wa.me/01123511914'>01123511914</a>

                </p>

                <p style={{ color: colors.blackColor }}>{t("home.aboutp5")} :
                    <a target='_blank' className="mahmoud" href='mailto:mahmoud.tamer.developer@gmail.com'> mahmoud.tamer.developer@gmail.com</a>
                </p>

            </div>
        </div >
    )
}

export default AboutUs