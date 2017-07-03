'use strict';

const T = require('../source/terminal-screen');

T.core.clear();
T.core.move(5, 5);
T.core.write('qweqwe ');
T.core.enableStyles();
T.core.write('qweqwe ');
T.core.disableStyles();
T.core.reset();
T.core.write('qweqwe ');

T.core.move(5, 6);
T.core.setBgColor(T.colors.basic.blue);
T.core.setFgColor(T.colors.basic.green);
T.core.write('qweqwe ');
//T.core.hideCursor();
//t.core.showCursor();

setTimeout(() => {}, 2000);