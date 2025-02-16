import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PollPage = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const navigate = useNavigate();

  // Check if the user has already voted on this poll
  useEffect(() => {
    const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");
    if (votedPolls.includes(pollId)) {
      setHasVoted(true);
    }
  }, [pollId]);

  // Fetch poll results every 5 seconds
  useEffect(() => {
    const fetchPoll = async () => {
      const response = await axios.get(
        `https://quick-polling-app-tawny.vercel.app/api/polls/${pollId}`
      );
      setPoll(response.data);
    };
    fetchPoll();

    const interval = setInterval(fetchPoll, 5000);
    return () => clearInterval(interval);
  }, [pollId]);

  // Vote on a poll
  const vote = async () => {
    if (selectedOption === null || hasVoted) return;

    try {
      await axios.post(
        `https://quick-polling-app-tawny.vercel.app/api/polls/${pollId}/vote`,
        {
          optionIndex: selectedOption,
        }
      );

      // Update local storage to mark this poll as voted
      const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");
      votedPolls.push(pollId);
      localStorage.setItem("votedPolls", JSON.stringify(votedPolls));

      // Update the UI
      setHasVoted(true);
      const updatedPoll = { ...poll };
      updatedPoll.options[selectedOption].votes += 1;
      setPoll(updatedPoll);
    } catch (error) {
      alert("Failed to record vote");
    }
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div>
      <h2>{poll.question}</h2>
      <ul>
        {poll.options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="option"
                onChange={() => setSelectedOption(index)}
                disabled={hasVoted} // Disable radio buttons if the user has voted
              />
              {option.text} ({option.votes} votes)
            </label>
          </li>
        ))}
      </ul>
      <button onClick={vote} disabled={hasVoted}>
        {hasVoted ? "Already Voted" : "Vote"}
      </button>
    </div>
  );
};

export default PollPage;
