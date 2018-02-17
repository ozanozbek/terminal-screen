'use strict';

const TerminalScreen = require('../source/terminal-screen');

const getRandomNumber = (min = 0, max = 6) => (
  Math.floor(Math.random() * max) + min
);

const getRandomColor = () => getRandomNumber(0, 256);

const getRandomGrayColor = () => TerminalScreen.colors.gray[
  getRandomNumber(0, 24)
];

const drawBorders = () => {
  for (let y of [0, t.height - 1]) {
    for (let x = 0; x < t.width; x++) {
      t.set({char: ' ', bgColor: getRandomColor()}, x, y);
    }
  }
  for (let x of [0, t.width - 1]) {
    for (let y = 1; y < t.height - 1; y++) {
      t.set({char: ' ', bgColor: getRandomColor()}, x, y);
    }
  }
};

const writeTitle = (title) => {
  title.split('').join(' ').split('').forEach((char, i) => {
    t.set({
      char: char,
      fgColor: t.colors.gray[23 - ((t.stepNum % 8) * 3)]
    }, (t.width / 2) - title.length + i, t.height / 2);
  });
};

const writeFps = () => {
  `fps: ${t.fps}  `.split('').forEach((char, i) => {
    t.set({char, fgColor: t.colors.rgb6(0, 1, 1)}, i + 1, 1)
  });
};

const step = (delta) => {
  drawBorders();
  writeTitle('terminal-screen');
  writeFps();
};

const t = new TerminalScreen();
t.setCursor(false);
t.on('render', step);
t.setFps(30);
t.clear();
t.start();