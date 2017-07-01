'use strict';

const t = require('../source/terminal-screen');

t.core.clear();
t.core.move(5, 5);
t.core.setBgColor(t.colors.basic.blue);
t.core.setFgColor(t.colors.basic.green);
t.core.write('qweqwe');
//t.core.hideCursor();
//t.core.showCursor();