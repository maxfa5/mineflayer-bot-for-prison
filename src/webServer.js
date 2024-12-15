// ./webServer.js
const path = require('path');
const loggers = require('./logging.js');
const logger = loggers.logger;
const express = require('express');

function init(app, bot, io) {
  // Routes
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    if (message) {
      bot.chat(message);
      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Message is required' });
    }
  });
  logger.info("Web Server Initialized");
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));


    app.get('/', (req, res) => {
        res.render('index');
    });

  }
module.exports = {
  init
};