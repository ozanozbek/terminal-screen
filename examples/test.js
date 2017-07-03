'use strict';

const T = require('../source/terminal-screen');

const t = new T();

t.clear();
t.reset();
t.move(5, 5);
t.setBgColor(t.colors.basic.white);
t.setFgColor(t.colors.basic.blue);
t.write('123');
t.move(5, 6);
t.enableStyles('bold');
t.write('456');
t.reset();
t.write('789');
t.reset();
