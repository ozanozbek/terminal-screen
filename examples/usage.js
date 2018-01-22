'use strict';

const TerminalScreen = require('../source/terminal-screen');

// initialize
const t = new TerminalScreen();

// clear screen
t.clear();

// show/hide cursor
t.setCursor(false);

// set background/foreground color
t.setBgColor(t.colors.basic.magenta);
t.setFgColor(t.colors.rgb6(4, 5, 1));

// set styles
t.setStyles({bold: true, underline: true});

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

t.reset();
