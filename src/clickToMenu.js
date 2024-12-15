//clickToMenu.js
const mineflayer = require('mineflayer');
const loggers = require('./logging');
const logger = loggers.logger;

/**
 * @param {mineflayer.Bot} mineflayerBot bot object from mineflayer
 */
function clickToMenu(mineflayerBot) {
    logger.info("clickToMenu function called");
    // mineflayerBot.on('', function(){
        mineflayerBot.setQuickBarSlot(4);
        mineflayerBot.activateItem(false);
        mineflayerBot.on('windowOpen', function(window){
            // console.log('Window', window);
            mineflayerBot.clickWindow(13,1,0);
        })
    // })
}

module.exports = { clickToMenu };
// function clickToMenu(bot, radius) {
//     bot.setQuickBarSlot(4);
//     bot.activateItem(false);
//     bot.on('windowOpen', function(window){
//         console.log('Window', window);
//     })
// };


// module.exports = { clickToMenu };