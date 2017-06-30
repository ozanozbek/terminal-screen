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

const rgb6 = (r = 0, g = 0, b = 0) => rgb6[
    r.toString() +
    g.toString() +
    b.toString()
];
for (let i = 0; i < 216; i++) {
    let r = Math.floor(i / 36).toString() || '0';
    let g = Math.floor((i % 36) / 6).toString() || '0';
    let b = Math.floor((i % 36 % 6)).toString() || '0';
    rgb6[r + g + b] = i + 16;
}

const rgb256 = (r = 0, g = 0, b = 0) => rgb6(
    Math.round(parseInt(r) * 5 / 255).toString(),
    Math.round(parseInt(g) * 5 / 255).toString(),
    Math.round(parseInt(b) * 5 / 255).toString()
);

const rgb256Hex = (hex = '000000') => {
    hex = hex.charAt(0) === '#' ? hex.slice(1) : hex;
    return rgb256(
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16)
    );
};

const colors = {
    basic: {},
    bright: {},
    gray: {},
    rgb6: rgb6,
    rgb256: rgb256,
    rgb256Hex: rgb256Hex
};
colorNames.forEach((colorName, i) => {
    colors.basic[colorName] = i;
    colors.bright[colorName] = i + 8;
});
for (let i = 1; i < 25; i++) {
    colors.gray[i] = 231 + i;
}

module.exports = colors;