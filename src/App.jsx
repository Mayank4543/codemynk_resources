import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Question from "./pages/Question";
import Editor from "./pages/Editor";
function App() {
  //  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/question" element={<Question />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}
export default App;
