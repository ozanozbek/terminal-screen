'use strict';

const codes = require('./codes');

const writer = {
    _output: (text = '', unescaped = false) => {
        return unescaped ? text : codes.escape + text;
    },
    clear: () => {
        return writer.move(0, 0) + writer._output(codes.screen.clear);
    },
    move: (x = 0, y = 0) => {
        return writer._output(codes.cursor.move(x, y));
    },
    write: (text = '') => {
        return writer._output(text, true);
    },
    setBgColor: (color = '0') => {
        return writer._output(codes.color.bg(color));
    },
    setFgColor: (color = '7') => {
        return writer._output(codes.color.fg(color));
    },
    resetBgColor: () => {
        return writer._output(codes.resetBgColor);
    },
    resetFgColor: () => {
        return writer._output(codes.resetFgColor);
    },
    hideCursor: () => {
        return writer._output(codes.cursor.hide);
    },
    showCursor: () => {
        return writer._output(codes.cursor.show);
    },
    enableStyles: (styleList = ['bold'], _disable = false) => {
        styleList = (typeof styleList === 'string') ? [styleList] : styleList;
        const styles = {};
        styleList.forEach((style) => {
            styles[style] = _disable ? false : true;
        });
        return writer.setStyles(styles);
    },
    disableStyles: (styleList = ['bold']) => {
        return writer.enableStyles(styleList, true);
    },
    setStyles: (styles = {bold: true}) => {
        let result = '';
        for(const style in styles) {
            if (Object.keys(codes.styles).includes(style)) {
                result += writer._output(
                    codes.styles[style][+styles[style]], undefined
                );
            }
        }
        return result;
    },
    reset: () => {
        return writer._output(codes.reset);
    }
};

module.exports = writer;