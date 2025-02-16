import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const navigate = useNavigate();

  // Create a poll
  const createPoll = async () => {
    const optionsArray = options
      .split(",")
      .map((opt) => ({ text: opt.trim(), votes: 0 }));
    const response = await axios.post(
      "https://quick-polling-app-tawny.vercel.app/api/polls",
      {
        question,
        options: optionsArray,
      }
    );
    // Redirect to the poll page
    navigate(`/poll/${response.data._id}`);
  };

  return (
    <div>
      <h2>Create a Poll</h2>
      <input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter options (comma separated)"
        value={options}
        onChange={(e) => setOptions(e.target.value)}
      />
      <button onClick={createPoll}>Create Poll</button>
    </div>
  );
};

export default CreatePoll;
