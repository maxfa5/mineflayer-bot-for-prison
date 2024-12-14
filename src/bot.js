const mineflayer = require('mineflayer');
const mineflayerViewer = require('prismarine-viewer').mineflayer;
const inventoryViewer = require('mineflayer-web-inventory')
var AutoAuth = require('mineflayer-auto-auth')
const { mapDownloader } = require('mineflayer-item-map-downloader')


const PORT_web_view = 3000;
const PORT_chest_view = 3001;
const bot_options = {
    host: 'test-LCIP.aternos.me',
    port: 59573,
    // host: 'mc.inferlife.org',
    // port: 25565,
    username: 'SunShineee',
    version: "1.19.4",
    plugins: [AutoAuth],
    AutoAuth: {
      logging: true,
      password: '1',
      ignoreRepeat: true
    }
  }
  
  
  const bot = mineflayer.createBot(bot_options)
  bot.loadPlugin(mapDownloader) // load it before spawning to get all maps
  bot.on('serverAuth', function() {
    // Here bot should be already authorized
  });
  
  bot.once('spawn', () => {
    mineflayerViewer(bot, { port: PORT_web_view }) // Start the viewing server on port 3000
  
    // Draw the path followed by the bot
    const path = [bot.entity.position.clone()]
    bot.on('move', () => {
      if (path[path.length - 1].distanceTo(bot.entity.position) > 1) {
        path.push(bot.entity.position.clone())
        bot.viewer.drawLine('path', path)
      }
    })
  })

  bot.on('chat', function Hi (username,message) {

    if(username === bot_options.username) return;
    
    if (message === "Ты бот?" ) {
    
    setTimeout(() => bot.chat(username + ", нет я не бот"), 5000);
    
    }});

    let web_chest_options = {
      port: PORT_chest_view
    }
  
    inventoryViewer(bot, web_chest_options)



