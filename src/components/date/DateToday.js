import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/AppContext';
import { useClickAway } from '@uidotdev/usehooks'
import './date.css'
import PulseLoader from "react-spinners/PulseLoader";

const DateToday = () => {
    const {
        colors,
        font, fontSize, lang } = useData();

    const [timings, setTimings] = useState([])
    const [country, setCountry] = useState()
    const [city, setCity] = useState()
    const [countrys, setCountrys] = useState([])
    const [cities, setCities] = useState([])
    const [selectShow, setSelectShow] = useState(false)
    const [secondSelectShow, setSecondSelectShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState([])
    const [search2, setSearch2] = useState([])



    useEffect(() => {
        fetch(`https://api.aladhan.com/v1/timingsByCity/${formatDate(selectedDate)}?city=${city}&country=${country}&method=8`)
            .then(res => res.json())
            .then(data => setTimings(data.data))
    }, [country])


    useEffect(() => {
        fetch("https://countriesnow.space/api/v0.1/countries")
            .then(res => res.json())
            .then(data => setCountrys(data.data))
    }, [])

    useEffect(() => {
        if (countrys.length > 0) {
            setCountry(countrys[61]?.country)
            setCity(countrys[61]?.cities[12])
            setCities(countrys[61]?.cities)
        }
    }, [countrys])

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleSelectClick = async (country) => {
        setCountry(country.country)
        setCities(country.cities)
        setCity(country.cities[0])
        setSelectShow(false)
        try {
            setLoading(true)
            await fetch(`https://api.aladhan.com/v1/timingsByCity/${formatDate(selectedDate)}?city=${city}&country=${country}&method=8`)
                .then(res => res.json())
                .then(data => setTimings(data.data))
        } catch { }
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }


    const handleSecondeSelectClick = async (city) => {
        setCity(city)
        setSecondSelectShow(false)
        try {
            setLoading(true)
            await fetch(`https://api.aladhan.com/v1/timingsByCity/${formatDate(selectedDate)}?city=${city}&country=${country}&method=8`)
                .then(res => res.json())
                .then(data => setTimings(data.data))
        } catch { }

        setTimeout(() => {
            setLoading(false)
        }, 500)
    }


    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };



    const handleDateChange = (event) => {
        const [day, month, year] = event.target.value.split('-').map(Number);
        const selectedDate = new Date(year, month - 1, day); // Month is zero-based
        setSelectedDate(selectedDate);

        fetch(`https://api.aladhan.com/v1/timingsByCity/${formatDate(selectedDate)}?city=${city}&country=${country}&method=8`)
            .then(res => res.json())
            .then(data => setTimings(data.data))
    };



    const next30DaysOptions = [];
    for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        next30DaysOptions.push(
            <option key={i} value={formatDate(date)}>{formatDate(date)}</option>
        );
    }


    const boxRef = useClickAway(() => {
        setSelectShow(false)
    })

    const box2Ref = useClickAway(() => {
        setSecondSelectShow(false)
    })

    return (
        <div className='mainRec'>
            <div className='container mainRec' style={{ paddingBottom: "0" }}>
                <h2 style={{ color: colors.blackColor, fontSize: "1.7rem", marginBottom: "40px" }}>مواقيت الصلاه</h2>
                <form onSubmit={handleSubmit} class="row mb-4 formDate">

                    <div
                        ref={boxRef}
                        style={{ background: colors.sidBarColor, transform: "translateY(-30%)" }}
                        className={`selectDiv ${selectShow ? "d-block" : "d-none"}`}
                    >
                        <div className='selectXdiv'>
                            <i style={{ color: colors.blackColor }}
                                onClick={() => setSelectShow(false)}
                                className="fa-solid fa-xmark mb-4"></i>
                        </div>
                        <div className='sideBarInput mb-4'>
                            <input
                                autoFocus
                                placeholder='ابحث عن البلد'
                                style={{ backgroundColor: colors.searchColor }}
                                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                type='text' />
                        </div>
                        {countrys.filter((item) => {
                            return search !== "" ? item.country.toLowerCase().includes(search) : countrys
                        }).map((country) => (
                            <button
                                onClick={() => handleSelectClick(country)}
                                className='btnnnnn'>
                                <button
                                    style={{ borderColor: colors.borderColor, color: colors.blackColor }}>
                                    {country.country}
                                </button>
                            </button>
                        ))}
                    </div>

                    <div class="col">
                        <button
                            style={{
                                border: `1px solid ${colors.borderColor}`,
                                height: "47px",
                                backgroundColor: colors.navColor,
                                color: colors.blackColor
                            }}
                            onClick={() => setSelectShow(true)}
                            className='buttonDate d-flex w-100 justify-content-between align-items-center'>
                            <span>{country}</span>
                            <span><i class="fa-solid fa-angle-down"></i></span>
                        </button>
                    </div>

                    <div
                        ref={box2Ref}
                        style={{ background: colors.sidBarColor, transform: "translateY(-30%)" }}
                        className={`selectDiv ${secondSelectShow ? "d-block" : "d-none"}`}
                    >
                        <div className='selectXdiv'>
                            <i style={{ color: colors.blackColor }}
                                onClick={() => setSecondSelectShow(false)}
                                className="fa-solid fa-xmark mb-4"></i>
                        </div>
                        <div className='sideBarInput mb-4'>
                            <input
                                placeholder='ابحث عن مدينة'
                                onChange={(e) => setSearch2(e.target.value.toLowerCase())}
                                style={{ backgroundColor: colors.searchColor }}
                                type='text' />
                        </div>
                        {cities.filter((item) => {
                            return search2 !== "" ? item.toLowerCase().includes(search2) : cities
                        }).map(cityy => (
                            <button
                                onClick={() => handleSecondeSelectClick(cityy)}
                                className='btnnnnn'>
                                <button
                                    style={{ borderColor: colors.borderColor, color: colors.blackColor }}>
                                    {cityy}
                                </button>
                            </button>
                        ))}
                    </div>

                    <div class="col">
                        <button
                            style={{
                                border: `1px solid ${colors.borderColor}`,
                                height: "47px",
                                backgroundColor: colors.navColor,
                                color: colors.blackColor
                            }}
                            onClick={() => setSecondSelectShow(true)}
                            className='buttonDate d-flex w-100 justify-content-between align-items-center'>
                            <span>{city}</span>
                            <span><i class="fa-solid fa-angle-down"></i></span>
                        </button>
                    </div>

                    <div className='col'>
                        <select
                            style={{
                                border: `1px solid ${colors.borderColor}`,
                                height: "47px",
                                backgroundColor: colors.navColor,
                                color: colors.blackColor
                            }}
                            className='buttonDate d-flex w-100 justify-content-between align-items-center'
                            value={formatDate(selectedDate)} onChange={handleDateChange}>
                            {next30DaysOptions}
                        </select>
                    </div>
                </form>

                {!loading > 0 ?
                    <>
                        <div className='mb-3' style={{ color: colors.blackColor }}>
                            {city}, {country}, {lang == "eng" ? timings?.date?.gregorian?.weekday?.en :
                                timings?.date?.hijri?.weekday?.ar
                            }</div>
                        <div className='sewarBoxes justify-content-between align-items-center'>
                            <div
                                style={{ backgroundColor: colors.whitColor, border: `1px solid ${colors.borderColor}` }}
                                className="soraBox d-flex justify-content-between align-items-center"
                            >
                                <div className='soraDet'>
                                    <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }}
                                        className='soraName'>الفجر</span>
                                </div>
                                <div className='ayahsCount' style={{ color: colors.greyColor }}>
                                    {timings?.timings?.Fajr}</div>
                            </div>
                            <div
                                style={{ backgroundColor: colors.whitColor, border: `1px solid ${colors.borderColor}` }}
                                className="soraBox d-flex justify-content-between align-items-center"
                            >
                                <div className='soraDet'>
                                    <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }}
                                        className='soraName'>الشروق</span>
                                </div>
                                <div className='ayahsCount' style={{ color: colors.greyColor }}>
                                    {timings?.timings?.Sunrise}</div>
                            </div>
                            <div
                                style={{ backgroundColor: colors.whitColor, border: `1px solid ${colors.borderColor}` }}
                                className="soraBox d-flex justify-content-between align-items-center"
                            >
                                <div className='soraDet'>
                                    <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }}
                                        className='soraName'>الضهر</span>
                                </div>
                                <div className='ayahsCount' style={{ color: colors.greyColor }}>
                                    {timings?.timings?.Dhuhr}
                                </div>
                            </div>
                            <div
                                style={{ backgroundColor: colors.whitColor, border: `1px solid ${colors.borderColor}` }}
                                className="soraBox d-flex justify-content-between align-items-center"
                            >
                                <div className='soraDet'>
                                    <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }}
                                        className='soraName'>العصر</span>
                                </div>
                                <div className='ayahsCount' style={{ color: colors.greyColor }}>
                                    {timings?.timings?.Asr}</div>
                            </div>
                            <div
                                style={{ backgroundColor: colors.whitColor, border: `1px solid ${colors.borderColor}` }}
                                className="soraBox d-flex justify-content-between align-items-center"
                            >
                                <div className='soraDet'>
                                    <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }}
                                        className='soraName'>المغرب</span>
                                </div>
                                <div className='ayahsCount' style={{ color: colors.greyColor }}>
                                    {timings?.timings?.Maghrib}</div>
                            </div>
                            <div
                                style={{ backgroundColor: colors.whitColor, border: `1px solid ${colors.borderColor}` }}
                                className="soraBox d-flex justify-content-between align-items-center"
                            >
                                <div className='soraDet'>
                                    <span style={{ color: colors.blackColor, fontFamily: font, fontSize: fontSize }}
                                        className='soraName'>العشاء</span>
                                </div>
                                <div className='ayahsCount' style={{ color: colors.greyColor }}>
                                    {timings?.timings?.Isha}</div>
                            </div>
                        </div>
                    </>
                    :
                    <div className='loaderDivSora'>
                        <PulseLoader
                            color='#0075ff'
                            loading={true}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                }

            </div>
        </div >
    );
};

export default DateToday;