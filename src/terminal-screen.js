'use strict';

const codes = require('./codes');

const styleList = [
    'bold', 'dim', 'italic', 'underline',
    'blink', 'reverse', 'hidden', 'strikethrough'
];

const TerminalScreen = class TerminalScreen {
    constructor(stream, encoding) {
        this.codes = codes;
        this.width = null
        this.height = null;
        this.stream = null;
        this.encoding = null;
        this.cursor = null;
        this.position = {x: null, y: null};
        this.bgColor = null;
        this.fgColor = null;
        this.styles = {};
        let self = this;
        styleList.forEach(function(key) {
            self.styles[key] = null;
        });
        this.setStream(stream, false);
        this.setEncoding(encoding);
    }
    setStream(stream = process.stdout, force = false) {
        if (force || this.stream !== stream) {
            this.stream = stream;
            this.width = this.stream.columns;
            this.height = this.stream.rows;
            this.reset();
        }
    }
    setEncoding(encoding = 'utf8', force = false) {
        if (force || this.encoding !== encoding) {
            this.encoding = encoding;
            this.stream.setDefaultEncoding(encoding);
        }
    }
    reset(force) {
        this.clear();
        this.setPosition(undefined, undefined, force);
        this.setBgColor(undefined, force);
        this.setFgColor(undefined, force);
        this.resetStyles();
    }
    clear(bgColor = 'black') {
        let currentBgColor = this.bgColor;
        this._escape(this.codes.cursor.save);
        this.setPosition(0, 0, true);
        this.setBgColor(bgColor);
        this._escape(this.codes.screen.clear);
        this.setBgColor(currentBgColor);
        this._escape(this.codes.cursor.restore);
    }
    showCursor(force = false) {
        if (force || !this.cursor) {
            this.cursor = true;
            this._escape(this.codes.cursor.show);
        }
    }
    hideCursor(force = false) {
        if (force || this.cursor !== false) {
            this.cursor = false;
            this._escape(this.codes.cursor.hide);
        }
    }
    setPosition(x = 0, y = 0, force = false) {
        x = x || Math.min(x, this.width);
        y = y || Math.min(y, this.height);
        if (force || this.position.x !== x || this.position.y !== y) {
            this.position = {x: x, y: y};
            this._escape(this.codes.cursor.position(x, y));
        }
    }
    setBgColor(color = 'black', force = false) {
        if (force || this.bgColor !== color) {
            this.bgColor = color;
            this._escape(this.codes.color.bg(color));
        }
    }
    setFgColor(color = 'white', force = false) {
        if (force || this.fgColor !== color) {
            this.fgColor = color;
            this._escape(this.codes.color.fg(color));
        }
    }
    setStyle(style, value = true, force = false) {
        if (
            Object.keys(this.styles).includes(style) &&
            (force || this.styles[style] !== value)
        ) {
            this.styles[style] = value;
            this._escape(this.codes.styles[style][+value]);
        }
    }
    setStyles(styles = [], force) {
        for (let key in this.styles) {
            if (styles.includes(key)) {
                this.setStyle(key, true, force);
            } else {
                this.setStyle(key, false, force);
            }
        }
    }
    resetStyles() {
        for (let key in this.styles) {
            this.styles[key] = false;
        }
        this._escape(this.codes.styles.reset);
    }
    setAll(options = {}, force) {
        if (options.x || options.y) {
            this.setPosition(options.x, options.y, force);
        }
        if (options.bgColor) {
            this.setBgColor(options.bgColor, force);
        }
        if (options.fgColor) {
            this.setFgColor(options.fgColor, force);
        }
        if (options.styles) {
            this.setStyles(options.styles, force);
        }
    }
    write(text = '', wrap = false, scroll = false) {
        if (!scroll) {
            let limit = wrap ? (
                this.width * this.height
                - Math.max((this.position.y - 1), 0) * this.width
                - this.position.x
            ) : this.width - this.position.x;
            text = text.slice(0, limit);
        }

        this._write(text);
        this.position = {
            x: (this.position.x + text.length) % this.width,
            y: Math.max(this.position.y + Math.floor((this.position.x + text.length) % this.width), this.height)
        };
    }
    put(text = '', wrap, scroll) {
        let position = this.position;
        this._escape(this.codes.cursor.save);
        this.write(text, wrap, scroll);
        this._escape(this.codes.cursor.restore);
        this.position = position;
    }
    w(text, options, force) {
        this._short('write', text, options, force);
    }
    p(text, options, force) {
        this._short('put', text, options, force);
    }
    _short(fnName, text, options, force) {
        this.setAll({
            x: options.x, y: options.y,
            bgColor: options.bgColor,
            fgColor: options.fgColor,
            styles: options.styles
        }, force);
        this[fnName](text, options.wrap, options.scroll);
    }
    _write(text = '') {
        this.stream.write(text);
    }
    _escape(data) {
        this._write(this.codes.escape + data);
    }
};

module.exports = TerminalScreen;
