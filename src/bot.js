// const mineflayer = require('mineflayer');
// const mineflayerViewer = require('prismarine-viewer').mineflayer;
// const inventoryViewer = require('mineflayer-web-inventory');
// const express = require('express');
// const path = require('path');
// var AutoAuth = require('mineflayer-auto-auth');
// const { mapDownloader } = require('mineflayer-item-map-downloader');
// const readline = require('node:readline/promises');
// const { stdin: input, stdout: output } = require('node:process');
// const botController = require('./controllers/botController.js');
// const webServer = require('./webServer.js');
// const { createServer } = require('http');
// const socketIO = require('socket.io');
// const logger = require('./logging.js');

// const PORT_web_view = 3001;
// const PORT_chest_view = 3002;
// const PORT_express_view = 3000;

// const bot_options = {
//     host: 'test-LCIP.aternos.me',
//     port: 59573,
//     // host: 'mc.inferlife.org',
//     // port: 25565,
//     username: 'SunShineee',
//     version: "1.19.4",
//     plugins: [AutoAuth],
//     AutoAuth: {
//       logging: true,
//       password: '46hd83j2...',
//       ignoreRepeat: true
//     }
//   }

  
//     const bot = mineflayer.createBot(bot_options)
//     bot.loadPlugin(mapDownloader) // load it before spawning to get all maps
  
//   // Create Express app
//   const app = express();
//   const server = createServer(app);
//   const io = socketIO(server);
  
//   app.set('view engine', 'ejs');
//   app.set('views', path.join(__dirname, 'views'));
//   app.use(express.json());
//   app.use(express.static(path.join(__dirname, 'public')));

//   // Initialize bot controller with socket.io
// botController.init(bot, io);

// // Initialize web server
// webServer.init(app, bot, io);

// // Initialize Prismarine viewer
// bot.once('spawn', () => {
//   mineflayerViewer(bot, { port: PORT_web_view, firstPerson: true });
//   console.log('Bot viewer running at http://localhost:3001');
//   inventoryViewer(bot, web_chest_options)

// });

// // Start Express server
// server.listen(PORT_express_view, () => {
//   console.log(`Web interface running at http://localhost:${PORT_express_view}`);
// });


  
//   // bot.once('spawn', async () => {
//   //   // mineflayerViewer(bot, { port: PORT_web_view }) // Start the viewing server on port 3000
//   //   // Draw the path followed by the bot
//   //   const path = [bot.entity.position.clone()]
//   //   bot.on('move', () => {
//   //     if (path[path.length - 1].distanceTo(bot.entity.position) > 1) {
//   //       path.push(bot.entity.position.clone())
//   //       bot.viewer.drawLine('path', path)
//   //     }
//   //   })
//   // })
  
//   bot.on('chat', function Hi (username,message) {

//     if(username === bot_options.username) return;
    
//     if (message === "Ты бот?" ) {
    
//     setTimeout(() => bot.chat(username + ", нет я не бот"), 5000);
    
//     }});

//     let web_chest_options = {
//       port: PORT_chest_view
//     }
  

//     const registry = require('prismarine-registry')('1.16')
//     const ChatMessage = require('prismarine-chat')(registry)
    
//     const msg = new ChatMessage({"text":"Example chat mesasge"})
//     console.log(msg.toString())