// ./bot2.js
const mineflayer = require('mineflayer');
const { mapDownloader } = require('mineflayer-item-map-downloader');
const AutoAuth = require('mineflayer-auto-auth');
const { mineflayer: mineflayerViewer } = require('prismarine-viewer');
const inventoryViewer = require('mineflayer-web-inventory');
const loggers = require('./logging.js');

const logger = loggers.logger;

let bot = null;
let web_chest_options = {
  port: 3002
}

const init = (botConfig, io) => {

    bot = mineflayer.createBot(botConfig);
    bot.loadPlugin(mapDownloader); // load it before spawning to get all maps

    bot.once('spawn', async () => {
      mineflayerViewer(bot, { port: 3001, firstPerson: true });
      logger.info('Bot viewer running at http://localhost:3001');
        inventoryViewer(bot, web_chest_options)
    });


    bot.on('chat', function Hi (username,message) {

        if(username === botConfig.username) return;

        if (message === "Ты бот?" ) {

            setTimeout(() => bot.chat(username + ", нет я не бот"), 5000);

        }});
        const registry = require('prismarine-registry')('1.16')
        const ChatMessage = require('prismarine-chat')(registry)

        const msg = new ChatMessage({"text":"Example chat mesasge"})
        console.log(msg.toString())

};

const getBot = () => {
    return bot;
};


module.exports = { init, getBot };