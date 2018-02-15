'use strict';

const TerminalScreen = require('../source/terminal-screen');
const colors = TerminalScreen.colors;

const terminalScreen = new TerminalScreen();

terminalScreen.start();

const draw = () => {
  terminalScreen.clear();
  terminalScreen.setPixel(0, 0, {
    fgColor: colors.basic.green,
    char: '*'
  });

  terminalScreen.setPixel(
    terminalScreen.width - 1,
    terminalScreen.height - 1,
    {
      fgColor: colors.basic.red,
      char: '*'
    }
  );
};

terminalScreen.on('resize', draw);
draw();