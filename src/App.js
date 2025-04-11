import React, { useState } from "react";
import "./App.css";
import { HomeComponent } from "./components/HomeComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimeDetail from "./components/AnimeDetails";
import VideoDetail from "./components/VideoDetail";
function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<HomeComponent searchTerm={searchTerm} onSearchChange={handleSearchChange} />} />
                    <Route path="/anime/:id" element={<AnimeDetail />} />
                    <Route path="/video/:videoId" element={<VideoDetail />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
