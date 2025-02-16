const Poll = require("../models/Poll");

// Create a poll
const createPoll = async (req, res) => {
  const { question, options } = req.body;
  try {
    const poll = new Poll({ question, options });
    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({ error: "Failed to create poll" });
  }
};

// Vote on a poll
const voteOnPoll = async (req, res) => {
  const { optionIndex } = req.body;
  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    poll.options[optionIndex].votes += 1;
    await poll.save();
    res.json({ message: "Vote recorded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to record vote" });
  }
};

// Get poll results
const getPollResults = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch poll results" });
  }
};

// Get all polls
const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch polls" });
  }
};

module.exports = { createPoll, voteOnPoll, getPollResults, getAllPolls };
