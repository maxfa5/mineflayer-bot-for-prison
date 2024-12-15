// index.js
const mineflayer = require('mineflayer');
const { createServer } = require('http');
const socketIO = require('socket.io');
const express = require('express');
const path = require('path');
const AutoAuth = require('mineflayer-auto-auth');


// TODO include from options.json
const botConfig = {
  // host: 'test-LCIP.aternos.me',
  // port: 59573,
  host: 'mc.inferlife.org',
  port: 25565,
  username: 'SunShineee',
  version: "1.19.4",
  plugins: [AutoAuth],
  AutoAuth: {
    logging: true,
    password: '46hd83j2...',
    ignoreRepeat: true
  }
}

const bot = require('./bot2.js');
const botController = require('./controllers/botController');
const webServer = require('./webServer');
const loggers = require('./logging.js');

const PORT_express_view = 3000;
const logger = loggers.logger;


// Create Express app
const app = express();
const server = createServer(app);
const io = new socketIO.Server(server);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// Initialize bot
bot.init(botConfig, io);

// Initialize bot controller with socket.io
botController.init(bot.getBot(), io);

// Initialize web server
webServer.init(app, bot.getBot(), io);


// Start Express server
server.listen(PORT_express_view, () => {
    logger.info(`Web interface running at http://localhost:${PORT_express_view}`);
  });