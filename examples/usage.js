'use strict';

const TerminalScreen = require('../src/terminal-screen');

// initialize
const t = new TerminalScreen();

// clear screen
t.clear();

// show/hide cursor
t.hideCursor();

// set background/foreground color
t.setBgColor('magenta');
t.setFgColor('451');

// set styles
t.setStyles(['bold', 'underline']);

// set position
t.setPosition(10, 5);

// write
t.write('Hello world!');

// shortcut methods
t.w('Goodbye world!', {
    x: 10, y: 7,
    bgColor: 'white', fgColor: 'gray3',
    styles: ['strikethrough', 'dim'],
    wrap: true
});

t.setPosition();
t.resetStyles();
t.showCursor();
