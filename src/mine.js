const mineflayer = require('mineflayer');
const express = require('express');
const Movements = require('mineflayer-pathfinder').Movements;
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const { GoalBlock, GoalXZ } = require('mineflayer-pathfinder').goals;
const { Vec3 } = require('vec3');

const config = require('./settings.json');

const loggers = require('./logging.js');

function circleWalk(bot, radius) {
    return new Promise(() => {
        const pos = bot.entity.position;
        const x = pos.x;
        const y = pos.y;
        const z = pos.z;

        const points = [
            [x + radius, y, z],
            [x, y, z + radius],
            [x - radius, y, z],
            [x, y, z - radius],
        ];


        let i = 0;
          let currentGoal = null;
        setInterval(async () => {
             if(i === points.length) i = 0;

             currentGoal = new GoalXZ(points[i][0], points[i][2]);
              bot.pathfinder.setGoal(currentGoal);

                const block = bot.blockAt(new Vec3(currentGoal.x, pos.y, currentGoal.z));
                if(block && block.type !== 0) {
                  try {
                     await bot.tool.equipForBlock(block);
                       await bot.dig(block);
                  } catch (err) {
                      loggers.error("Error breaking block", err);
                    }
                 }

             i++;
        }, 1000);
    });
}


module.exports = { circleWalk }