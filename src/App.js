import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotoLibrary from "./components/PhotoLibrary"; // Check the path to PhotoLibrary
import Favorites from "./components/Favorites"; // Check the path to Favorites

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PhotoLibrary />} />
        <Route exact path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
