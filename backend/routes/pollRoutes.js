const express = require("express");
const {
  createPoll,
  voteOnPoll,
  getPollResults,
  getAllPolls,
} = require("../controllers/pollController");

const router = express.Router();

// Create a poll
router.post("/polls", createPoll);

// Vote on a poll
router.post("/polls/:pollId/vote", voteOnPoll);

// Get poll results
router.get("/polls/:pollId", getPollResults);

// Get all polls
router.get("/polls", getAllPolls);

module.exports = router;
