// import Productlists from "./components/Productlists";
// import Product from "./components/Product";
import AppContext from "./context/AppContext";
import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Landing from "./components/landing/Landing";
import Sewar from "./components/sewar/Sewar";
import Sora from "./components/sewar/Sora";
import ScrollProgressBar from "./components/scroll/ScrollProgressBar";
import MainAudio from "./components/MainAudio";
import SideBar from "./components/SideBar";
// import DateToday from "./components/DateToday";

function App() {

  // useEffect(() => {
  //   fetch("https://quranenc.com/api/v1/translation/sura/arabic_moyassar/1?fbclid=IwAR2wajWJvZb7kTXRQMyD8hTpBPF_PbfMvx-RyrDDGZ_e6ZY1mZYrPKiXaJ4")
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }, [])

  // console.log()

  return (
    <div className="App">
      <Router>
        <AppContext>
          <Navbar />
          <Routes>
            <Route path="/" element={<>
              <Landing />
              <Sewar />
            </>} />
            <Route path="/sewar" element={<>
              <Sewar />
            </>} />
            <Route path="/sewar/:soraNum" element={<> <Sora /></>} />
          </Routes>
          <SideBar />
          <MainAudio />
        </AppContext>

      </Router>

    </div >
  );
}

export default App;
