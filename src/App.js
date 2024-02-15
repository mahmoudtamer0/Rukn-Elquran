import AppContext, { useData } from "./context/AppContext";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Landing from "./components/landing/Landing";
import Sewar from "./components/sewar/Sewar";
import Sora from "./components/sewar/Sora";
import MainAudio from "./components/Audio/MainAudio";
import NavBool from "./components/NavBool";
import Reciters from "./components/reciters/Reciters";
import Reciter from "./components/reciters/Reciter";
import Radio from "./components/Radio";
import { LastSec } from "./components/lastsection/LastSec";
import Footer from "./components/footer/Footer";
import Home from "./components/Home"
import DateToday from "./components/date/DateToday";
// import DateToday from "./components/DateToday";

function App() {


  return (
    <div className="App" >
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

            <Route path="/Rukn-Elquran/reciters/:recId" element={<> <Reciter /></>} />

            <Route path="/Rukn-Elquran/radio" element={<>
              <Radio />
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
