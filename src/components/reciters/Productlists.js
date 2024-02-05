import React, { useEffect, useRef, useState } from 'react'
import { useData } from '../context/AppContext';
import "./rec.css"
import { Link } from 'react-router-dom';
const Productlists = () => {

    const {
        sewar, getSewar,
        reciters, getReciters,
        setServer, setSoraId
    } = useData()
    const [sewarList, setSewarList] = useState([])
    const [newSewar, setNewSewar] = useState([])
    const [search, setSearch] = useState('')

    const [numberOfRec, setNumberOfRec] = useState(20)

    useEffect(() => {
        getSewar()
        getReciters()
    }, [])

    const handleClick = (rec) => {
        setServer(rec.moshaf[0].server)
        setSewarList(rec.moshaf[0].surah_list.split(','))
    }


    useEffect(() => {
        const newarr = []
        if (sewarList != '') {
            sewarList.map(soraList => {
                sewar?.map(soraName => {
                    if (soraName.id == soraList) {
                        newarr.push(soraName)
                        setNewSewar(newarr)
                    }
                })
            })
        }
    }, [sewarList])


    const handleSoraClick = (sora) => {
        const padSora = sora.padStart(3, '0')
        setSoraId(padSora)
    }

    return (
        <div>
            <Link to={`/sewar`}>sewar</Link>
            <div>
                <input onChange={(e) => setSearch(e.target.value)} type='search' />
            </div>

            <div className='recDiv' >
                {reciters.filter((item) => {
                    return search !== "" ? item.name.includes(search) : reciters
                }).slice(0, numberOfRec).map((rec, index) => {
                    return (
                        <div style={{ margin: "40px" }} key={rec.id}>
                            <button onClick={() => handleClick(rec)}>{index + 1}-{rec.id} {rec.name}</button>
                        </div>
                    )
                })}
            </div>

            <button onClick={() => setNumberOfRec(225)}>show more</button>

            <hr></hr>

            <div className='recDiv' >
                {newSewar.map((sora, index) => {
                    return (
                        <div style={{ margin: "40px" }} key={sora.id}>
                            <button onClick={() => handleSoraClick(sora.id.toString())}>{index + 1}-{sora.id} {sora.name}</button>
                        </div>
                    )
                })}
            </div>

            <hr></hr>


        </div >

    )
}
export default Productlists;