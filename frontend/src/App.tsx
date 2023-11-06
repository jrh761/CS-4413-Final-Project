import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
