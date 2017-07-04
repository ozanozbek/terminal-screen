'use strict';

const T = require('../source/terminal-screen');

const t = new T();

console.log(t.width);

t.setWrap(false);
t.clear();
t.move(50, 5);
t.write(12345);