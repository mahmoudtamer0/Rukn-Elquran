import React from 'react'
import { useData } from '../context/AppContext'
import landingImg from '../images/quran-book.jpg'

const LandingSection = ({ setSearch, name, searchFor }) => {
    const { font, lang } = useData()

    return (
        <div className='landing' style={{ height: "350px" }}>
            <div className='landing-img'>
                <img src={landingImg} alt='...' />
            </div>
            <div className='text-center landing-text '>
                <div className='d-flex align-items-center justify-content-center'>
                    <h2 style={{ fontFamily: font, }}
                        className={`landingTitle ${lang == "eng" ? "font2" : null}`}>
                        {name}
                    </h2>
                </div>
                <div className='recDivSearch'>
                    <input
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        type='text'
                        className='inpForSearch'
                        placeholder={searchFor} />
                </div>
            </div>
        </div>
    )
}

export default LandingSection