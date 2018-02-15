'use strict';

const TerminalScreen = require('../source/terminal-screen');
const colors = TerminalScreen.colors;

const terminalScreen = new TerminalScreen();

terminalScreen.clear();
terminalScreen.start();
terminalScreen.setPixel(0, 0, {
  bgColor: colors.rgb256Hex('#ff9900'),
  char: '*'
});

terminalScreen.setPixel(
  terminalScreen.width - 1,
  terminalScreen.height - 1,
  {
    bgColor: colors.rgb256Hex('#0044a0'),
    char: '*'
  }
);