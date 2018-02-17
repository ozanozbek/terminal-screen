'use strict';

const TerminalScreen = require('../source/terminal-screen');

const getRandomNumber = (min = 0, max = 6) => (
  Math.floor(Math.random() * max) + min
);

const getRandomColor = () => TerminalScreen.colors.rgb6(
  getRandomNumber(), getRandomNumber(), getRandomNumber()
);

const getRandomGrayColor = () => TerminalScreen.colors.gray[
  getRandomNumber(0, 24)
];

const drawBorders = () => {
  for (let y of [0, t.height - 1]) {
    for (let x = 0; x < t.width; x++) {
      t.setPixel(x, y, {char: '█', fgColor: getRandomColor()});
    }
  }
  for (let x of [0, t.width - 1]) {
    for (let y = 1; y < t.height - 1; y++) {
      t.setPixel(x, y, {char: '█', fgColor: getRandomColor()});
    }
  }
};

const writeTitle = (title) => {
  title.split('').forEach((char, i) => {
    t.setPixel(
      (t.width / 2) - title.length + (i * 2),
      t.height / 2,
      {char: char, fgColor: t.colors.gray[23 - ((t.stepNum % 8) * 3)]}
    );
  });
};

const step = (stepNum) => {
  drawBorders();
  writeTitle('terminal-screen');
};

const t = new TerminalScreen();
t.setCursor(false);
t.on('render', step);
t.setIntervalTime(20);
t.clear();
t.start();