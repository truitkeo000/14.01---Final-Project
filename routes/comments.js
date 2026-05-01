// API routes for storing, validating, and loading customer comments
const express = require('express');
const router = express.Router();

// Stores comments in memory for this prototype project
let comments = [];

// Cleans basic HTML characters to help prevent simple XSS attempts
function clean(text) {
  return text.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Sends comments back in groups of 10 for pagination
router.get('/', function(req, res) {
  const page = Number(req.query.page) || 1;
  const limit = 10;

// Calculates which comments should be shown on the current page
  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({
    comments: comments.slice(start, end),
    page: page,
    totalPages: Math.ceil(comments.length / limit)
  });
});

// Validates and saves a new customer comment
router.post('/', function(req, res) {
  const name = req.body.name;
  const message = req.body.message;

// Rejects empty or whitespace-only fields
  if (!name || !message || !name.trim() || !message.trim()) {
    return res.status(400).json({
      error: 'Please enter both your name and a comment.'
    });
  }

// Enforces character limits for both fields
  if (name.length > 40 || message.length > 500) {
    return res.status(400).json({
      error: 'Name must be under 40 characters and comment must be under 500 characters.'
    });
  }

// Builds the comment object with cleaned text and a server-generated timestamp
  const newComment = {
    id: Date.now(),
    name: clean(name),
    message: clean(message),
    timestamp: new Date().toLocaleString()
  };

  // Adds the newest comment to the top of the list
  comments.unshift(newComment);

  res.status(201).json(newComment);
});

module.exports = router;