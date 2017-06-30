'use strict';

const T = require('../source/terminal-screen');

const t = new T();

console.log(T.colors.rgb6(0, 2, 5));
console.log(T.colors.rgb256(0, 127, 255));
console.log(T.colors.rgb256Hex('#0077ff'));