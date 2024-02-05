import { Link } from 'react-router-dom';
import landingLogo from '../../images/quran-mazid-hero-calio.png'
import './landing.css'
import { useData } from '../../context/AppContext';


function Landing() {

    const { colors } = useData()

    return (
        <div className='landing'>
            <div className='landing-img'>
            </div>
            <div className='text-center landing-text '>
                <div className='d-flex align-items-center justify-content-center'>
                    <img style={{ width: "65px" }} src={landingLogo} alt='..' />
                    <h2 className='landingTitle'> ركن القرآن</h2>
                </div>
                <div className='inpDiv'>
                    <div className='inpMainDiv' style={{ backgroundColor: colors.whiteColor }}>
                        <input style={{ backgroundColor: colors.searchColor, color: colors.black }} type='text' placeholder='ماذا تريد ان تقرا؟' />
                        <div className='d-flex justify-content-between  align-items-center inpDivLinks'>
                            <Link style={{ backgroundColor: colors.searchColor }}>الملك</Link>
                            <Link style={{ backgroundColor: colors.searchColor }}>الملك</Link>
                            <Link style={{ backgroundColor: colors.searchColor }}>الملك</Link>
                            <Link style={{ backgroundColor: colors.searchColor }}>الملك</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;