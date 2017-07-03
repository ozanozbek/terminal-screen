'use strict';

const T = require('../source/terminal-screen');

const t = new T();

t.clear();
t.move(5, 5);
t.enableStyles('bold');
t.setBgColor(t.colors.basic.yellow);
t.setFgColor(t.colors.basic.magenta);
console.log(t.state);
t.reset();
console.log(t.state);