'use strict';

const colorNames = [
    'black', 'red', 'green', 'yellow',
    'blue', 'magenta', 'cyan', 'white'
];

const rgb6 = (r = 0, g = 0, b = 0) => parseInt(r.toString() + g.toString() + b.toString(), 6) + 16;

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

for (let i = 0; i < 24; i++) {
    colors.gray[i] = 232 + i;
}

module.exports = colors;