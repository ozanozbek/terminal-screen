'use strict';

const basic = [
    'black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white'
];

const bright = basic.map(function(id) {
    return 'bright' + id.charAt(0).toUpperCase() + id.slice(1);
});

const rgb = [];
for (let i = 0; i < 216; i++) {
    let r = Math.floor(i / 36).toString() || '0';
    let g = Math.floor((i % 36) / 6).toString() || '0';
    let b = Math.floor((i % 36 % 6)).toString() || '0';
    rgb.push(r + g + b);
}

const gray = [];
for (let i = 1; i <= 24; i++) {
    gray.push('gray' + i);
}

const colors = {};
basic.concat(bright, rgb, gray)
.map(function(value, i) {
    colors[value] = i;
});

module.exports = colors;
