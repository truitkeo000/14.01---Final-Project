// Main Express setup for the Downtown Donuts website
// Handles routing, middleware, and error handling
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const { dbMiddleware } = require('./bin/db');

// Imports the main page routes and comments API routes
const indexRouter = require('./routes/index');
const commentsRouter = require('./routes/comments');

const app = express();

// Tells Express to use Pug templates from the views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Allows the app to read form data and JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serves static files like CSS, images, and frontend JavaScript
app.use(express.static(path.join(__dirname, 'public')));

// Keeps the original database middleware from the starter project
app.use(dbMiddleware);

// Routes for main website pages like home, menu, about, and comments
app.use('/', indexRouter);

// API route for getting and posting customer comments
app.use('/api/comments', commentsRouter);

// Catches requests to unknown pages and sends them to the error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Shows an error page instead of crashing the app
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;