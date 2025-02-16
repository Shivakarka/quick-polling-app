import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreatePoll from "./components/CreatePoll.jsx";
import PollPage from "./components/PollPage.jsx";
import AllPolls from "./components/AllPolls.jsx";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="pollContainer">
        <h1>Quick Polling App</h1>
        <nav>
          <Link to="/all-polls">Show All Polls</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CreatePoll />} />
          <Route path="/poll/:pollId" element={<PollPage />} />
          <Route path="/all-polls" element={<AllPolls />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
