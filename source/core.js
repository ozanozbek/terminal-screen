'use strict';

const codes = require('./codes');

const ds = process.stdout; // default stream

const core = {
    _write: (text = '', unescaped = false, stream = ds) => {
        stream.write(unescaped ? text : codes.escape + text);
    },
    clear: (stream = ds) => {
        core.move(0, 0, stream);
        core._write(codes.screen.clear, undefined, stream);
    },
    move: (x = 0, y = 0, stream = ds) => {
        core._write(codes.cursor.move(x, y), undefined, stream);
    },
    write: (text = '', stream = ds) => {
        core._write(text, true, stream);
    },
    setBgColor: (color = '0', stream = ds) => {
        core._write(codes.color.bg(color), undefined, stream);
    },
    setFgColor: (color = '7', stream = ds) => {
        core._write(codes.color.fg(color), undefined, stream);
    },
    hideCursor: (stream = ds) => {
        core._write(codes.cursor.hide, undefined, stream);
    },
    showCursor: (stream = ds) => {
        core._write(codes.cursor.show, undefined, stream);
    },
    enableStyles: (styleList = ['bold'], stream = ds, _disable = false) => {
        styleList = (typeof styleList === 'string') ? [styleList] : styleList;
        const styles = {};
        styleList.forEach((style) => {
            styles[style] = _disable ? false : true;
        });
        core.setStyles(styles, stream);
    },
    disableStyles: (styleList = ['bold'], stream = ds) => {
        core.enableStyles(styleList, stream, true);
    },
    setStyles: (styles = {bold: true}, stream = ds) => {
        for(const style in styles) {
            if (Object.keys(codes.styles).includes(style)) {
                core._write(
                    codes.styles[style][+styles[style]],
                    undefined,
                    stream
                );
            }
        }
    },
    resetStyles: (stream = ds) => {
        core._write(codes.styles.reset, undefined, stream);
    }
};

module.exports = core;