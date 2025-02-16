import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllPolls = () => {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();

  // Fetch all polls
  useEffect(() => {
    const fetchPolls = async () => {
      const response = await axios.get(
        "https://quick-polling-app-tawny.vercel.app/api/polls"
      );
      setPolls(response.data);
    };
    fetchPolls();
  }, []);

  // Refresh poll results every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://quick-polling-app-tawny.vercel.app/api/polls")
        .then((res) => {
          setPolls(res.data);
        });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>All Polls</h2>
      {polls.map((poll) => (
        <div key={poll._id} className="poll-item">
          <h3>{poll.question}</h3>
          <ul>
            {poll.options.map((option, index) => (
              <li key={index}>
                {option.text} ({option.votes} votes)
              </li>
            ))}
          </ul>
          <button onClick={() => navigate(`/poll/${poll._id}`)}>
            View Poll
          </button>
        </div>
      ))}
      <button onClick={() => navigate("/")}>Create New Poll</button>
    </div>
  );
};

export default AllPolls;
