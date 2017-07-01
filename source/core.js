'use strict';

const codes = require('./codes');

const core = {
    _write: (text = '', unescaped = false, stream = process.stdout) => {
        stream.write(unescaped ? text : codes.escape + text);
    },
    clear: (stream = process.stdout) => {
        core.move(0, 0, stream);
        core._write(codes.screen.clear, undefined, stream);
    },
    move: (x = 0, y = 0, stream = process.stdout) => {
        core._write(codes.cursor.move(x, y), undefined, stream);
    },
    write: (text = '', stream = process.stdout) => {
        core._write(text, true, stream);
    },
    setBgColor: (color = '0', stream = process.stdout) => {
        core._write(codes.color.bg(color), undefined, stream);
    },
    setFgColor: (color = '7', stream = process.stdout) => {
        core._write(codes.color.fg(color), undefined, stream);
    },
    hideCursor: (stream = process.stdout) => {
        core._write(codes.cursor.hide, undefined, stream);
    },
    showCursor: (stream = process.stdout) => {
        core._write(codes.cursor.show, undefined, stream);
    }
};

module.exports = core;