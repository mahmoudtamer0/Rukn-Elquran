import AppContext from "./context/AppContext";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sewar from "./components/sewar/Sewar";
import Sora from "./components/sewar/Sora";
import MainAudio from "./components/Audio/MainAudio";
import NavBool from "./components/NavBool";
import Reciters from "./components/reciters/Reciters";
import Reciter from "./components/reciters/Reciter";
import Radio from "./components/Radio";
import Footer from "./components/footer/Footer";
import Home from "./components/Home"
import DateToday from "./components/date/DateToday";
import AboutUs from "./components/AboutUs";
import { Azkar } from "./components/azkar/Azkar";
import './components/preloader.css'
import PreLoader from "./components/PreLoader";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
function App() {
  // "homepage": "https://mahmoudtamer0.github.io/Rukn-Elquran/",

  return (
    <div className="App" >
      <Router basename="/">
        <Analytics />
        <SpeedInsights />
        <AppContext>
          <PreLoader />
          <NavBool />
          <Navbar />
          <Routes>
            <Route path="/" element={<>
              <Home />
            </>} />
            <Route path="/quran/sewar" element={<>
              <Sewar />
            </>} />
            <Route path="/prayer_times" element={<>
              <DateToday />
            </>} />
            <Route path="/quran/surah/:soraNum" element={<> <Sora /></>} />
            <Route path="/quran/surah/:soraNum/ayah/:ayahNum" element={<> <Sora /></>} />

            <Route path="/reciters" element={<>
              <Reciters />
            </>} />

            <Route path="/azkar" element={<>
              <Azkar />
            </>} />

            <Route path="/reciters/:recId" element={<> <Reciter /></>} />

            <Route path="/radio" element={<>
              <Radio />
            </>} />

            <Route path="/about_us" element={<>
              <AboutUs />
            </>} />
          </Routes>
          <MainAudio />
          <Footer />
        </AppContext>
      </Router>

    </div >
  );
}

export default App;
