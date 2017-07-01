'use strict';

const T = require('../source/terminal-screen');

T.core.clear();
T.core.move(5, 5);
//T.core.setBgColor(T.colors.basic.blue);
//T.core.setFgColor(T.colors.basic.green);
T.core.write('qweqwe ');
T.core.enableStyles();
T.core.write('qweqwe ');
T.core.disableStyles();
T.core.resetStyles();
T.core.write('qweqwe ');
//t.core.hideCursor();
//t.core.showCursor();