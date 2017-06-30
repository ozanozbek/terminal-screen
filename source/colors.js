'use strict';

const colorNames = [
    'black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white'
];

const colors = {
    basic: {},
    bright: {},
    rgb: {},
    gray: {}
};
colorNames.forEach((colorName, i) => {
    colors.basic[colorName] = i;
    colors.bright[colorName] = i + 8;
});
for (let i = 0; i < 216; i++) {
    let r = Math.floor(i / 36).toString() || '0';
    let g = Math.floor((i % 36) / 6).toString() || '0';
    let b = Math.floor((i % 36 % 6)).toString() || '0';
    colors.rgb[r + g + b] = i + 16
}
for (let i = 1; i < 25; i++) {
    colors.gray[i] = 231 + i;
}

module.exports = colors;