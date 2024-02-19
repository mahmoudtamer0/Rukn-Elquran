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
import HashLoader from "react-spinners/HashLoader"
import './components/preloader.css'
import { useState, useEffect } from "react";
import PreLoader from "./components/PreLoader";
function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1800)
  }, [])

  return (
    <div className="App" >
      {loading ?
        // preloader
        <PreLoader />
        :
        <Router>
          <AppContext>
            <NavBool />
            <Navbar />
            <Routes>
              <Route path="/Rukn-Elquran" element={<>
                <Home />
              </>} />
              <Route path="/Rukn-Elquran/sewar" element={<>
                <Sewar />
              </>} />

              <Route path="/Rukn-Elquran/prayer_times" element={<>
                <DateToday />
              </>} />
              <Route path="/Rukn-Elquran/sewar/:soraNum" element={<> <Sora /></>} />

              <Route path="/Rukn-Elquran/reciters" element={<>
                <Reciters />
              </>} />

              <Route path="/Rukn-Elquran/azkar" element={<>
                <Azkar />
              </>} />

              <Route path="/Rukn-Elquran/reciters/:recId" element={<> <Reciter /></>} />

              <Route path="/Rukn-Elquran/radio" element={<>
                <Radio />
              </>} />

              <Route path="/Rukn-Elquran/about_us" element={<>
                <AboutUs />
              </>} />
            </Routes>
            <MainAudio />
            <Footer />
          </AppContext>
        </Router>
      }
    </div >
  );
}

export default App;
