import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import SideBar from "./components/sideBar";
import MainContent from "./components/mainContent";
import SearchResults from "./components/searchResults";
import Footer from "./components/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [footer, setFooter] = useState(true);
  const goToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route
            path="/search"
            element={<SearchResults setFooter={setFooter} />}
          ></Route>
          <Route
            path="/"
            element={
              <div className="appBody">
                <MainContent setFooter={setFooter} />
                <SideBar />
              </div>
            }
          ></Route>
        </Routes>
        {footer && <Footer />}
        <div onClick={goToTop} className="goToTop">
          <i class="fa-solid fa-arrow-up"></i>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
