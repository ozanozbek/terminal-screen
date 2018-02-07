'use strict';

const TerminalScreen = require('../source/terminal-screen');

const terminalScreen = new TerminalScreen();

terminalScreen.clear();
terminalScreen.start();
terminalScreen.setPixel(1, 1, {
  bgColor: '#ff9900',
  char: '*'
});
