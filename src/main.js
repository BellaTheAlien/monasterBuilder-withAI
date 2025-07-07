
// BuildAMonster
//
// A template for building a monster using a series of assets from
// a sprite atlas.
// 
// Art assets from Kenny Assets "Monster Builder Pack" set:
// https://kenney.nl/assets/monster-builder-pack

import { BodyTool } from "../languageModel/tools/bodyTool.js";
import { initializeTools, registerTool } from "../languageModel/modelConnector.js";
import { sendSystemMessge } from "../languageModel/chatBox.js";

const tools = {
    body: new BodyTool(getScene),
};

Object.values(tools).forEach((generator) => {
    if (generator.toolCall) {
        registerTool(generator.toolCall);
    }
});

initializeTools();

sendSystemMessge("Introduce yourself and explain what you can do.");


"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 800,
    height: 600,
    scene: [Monster]
}

const game = new Phaser.Game(config);