const express = require('express');
const router = express.Router();

let comments = [];

function clean(text) {
  return text.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

router.get('/', function(req, res) {
  const page = Number(req.query.page) || 1;
  const limit = 10;

  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({
    comments: comments.slice(start, end),
    page: page,
    totalPages: Math.ceil(comments.length / limit)
  });
});

router.post('/', function(req, res) {
  const name = req.body.name;
  const message = req.body.message;

  if (!name || !message || !name.trim() || !message.trim()) {
    return res.status(400).json({
      error: 'Please enter both your name and a comment.'
    });
  }

  if (name.length > 40 || message.length > 500) {
    return res.status(400).json({
      error: 'Name must be under 40 characters and comment must be under 500 characters.'
    });
  }

  const newComment = {
    id: Date.now(),
    name: clean(name),
    message: clean(message),
    timestamp: new Date().toLocaleString()
  };

  comments.unshift(newComment);

  res.status(201).json(newComment);
});

module.exports = router;