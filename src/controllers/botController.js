// ./controllers/botController.js
const loggers = require('../logging.js');
const logger = loggers.logger;
let bot = null;
let io = null;
let controlStates = {
  forward: false,
  back: false,
  left: false,
  right: false,
  jump: false
};

function init(mineflayerBot, socketIO) {
  bot = mineflayerBot;
  io = socketIO;

  bot.on('spawn', () => {
    logger.info('Bot spawned in game');
    broadcastStatus();
  });

  bot.on('health', () => {
    broadcastStatus();
  });

  bot.on('error', (err) => {
    logger.info('Bot error:', err);
    io.emit('botError', err.message);
  });

  bot.on('kicked', (reason) => {
    logger.info('Bot was kicked:', reason);
    io.emit('botKicked', reason);
  });

  io.on('connection', (socket) => {
    socket.on('keyPress', handleKeyPress);
    socket.on('keyRelease', handleKeyRelease);
  });

  // Update loop for continuous movement
  setInterval(updateMovement, 50);
}

function handleKeyPress(key) {
  switch (key) {
    case 'w': controlStates.forward = true; break;
    case 's': controlStates.back = true; break;
    case 'a': controlStates.left = true; break;
    case 'd': controlStates.right = true; break;
    case ' ': controlStates.jump = true; break;
  }
  updateBotControls();
}

function handleKeyRelease(key) {
  switch (key) {
    case 'w': controlStates.forward = false; break;
    case 's': controlStates.back = false; break;
    case 'a': controlStates.left = false; break;
    case 'd': controlStates.right = false; break;
    case ' ': controlStates.jump = false; break;
  }
  updateBotControls();
}

function updateBotControls() {
  if (!bot) return;
  bot.setControlState('forward', controlStates.forward);
  bot.setControlState('back', controlStates.back);
  bot.setControlState('left', controlStates.left);
  bot.setControlState('right', controlStates.right);
  bot.setControlState('jump', controlStates.jump);
}

function updateMovement() {
  if (!bot) return;
  updateBotControls();
  broadcastStatus();
}

function broadcastStatus() {
  if (!bot || !io) return;
  io.emit('botStatus', {
    health: bot.health,
    food: bot.food,
    position: bot.position,
    inventory: bot.inventory.items(),
    controlStates
  });
}

function chat(message) {
  if (bot) {
    bot.chat(message);
  }
}

module.exports = {
  init,
  chat,
  broadcastStatus
};
