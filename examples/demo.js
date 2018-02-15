'use strict';

const TerminalScreen = require('../source/terminal-screen');
const colors = TerminalScreen.colors;

const terminalScreen = new TerminalScreen();

terminalScreen.clear();
terminalScreen.start();
terminalScreen.setPixel(2, 2, {
  bgColor: colors.rgb256Hex('#ff9900'),
  char: '*'
});