import AppContext, { useData } from "./context/AppContext";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Landing from "./components/landing/Landing";
import Sewar from "./components/sewar/Sewar";
import Sora from "./components/sewar/Sora";
import MainAudio from "./components/MainAudio";
import NavBool from "./components/NavBool";
import Reciters from "./components/reciters/Reciters";
import Reciter from "./components/reciters/Reciter";
// import DateToday from "./components/DateToday";

function App() {


  return (
    <div className="App" >
      <Router>
        <AppContext>
          <Navbar />
          <Routes>
            <Route path="/Rukn-Elquran" element={<>
              <Landing />
              <Sewar />
            </>} />
            <Route path="/Rukn-Elquran/sewar" element={<>
              <Sewar />
            </>} />
            <Route path="/Rukn-Elquran/sewar/:soraNum" element={<> <Sora /></>} />

            <Route path="/Rukn-Elquran/reciters" element={<>
              <Reciters />
            </>} />

            <Route path="/Rukn-Elquran/reciters/:recId" element={<> <Reciter /></>} />
          </Routes>
          <NavBool />
          <MainAudio />
        </AppContext>
      </Router>
    </div >
  );
}

export default App;
