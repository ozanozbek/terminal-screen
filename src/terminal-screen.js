'use strict';

const codes = require('./codes');

const TerminalScreen = class TerminalScreen {
    constructor(stream) {
        this.codes = codes;
        this.stream = null;
        this.width = null;
        this.height = null;
        this.options = {
            encoding: undefined,
            cursor: undefined,
            x: undefined,
            y: undefined,
            bgColor: undefined,
            fgColor: undefined,
            styles: new Set(),
            wrap: false,
            scroll: false,
            lock: false
        };
        this.setStream(stream);
    }
    setStream(stream = process.stdout, force = false) {
        if (force || this.stream !== stream) {
            this.stream = stream;
            this.width = this.stream.columns;
            this.height = this.stream.rows;
            this.reset(true);
        }
        return this;
    }
    setEncoding(encoding = 'utf8', force = false) {
        if (force || this.encoding !== encoding) {
            this.encoding = encoding;
            this.stream.setDefaultEncoding(encoding);
        }
        return this;
    }
    setCursor(cursor = true, force = false) {
        if (force || this.cursor !== cursor) {
            this.cursor = cursor;
            this._escape(
                cursor ?
                this.codes.cursor.show :
                this.codes.cursor.hide
            );
        }
        return this;
    }
    setPosition(x = 0, y = 0, force = false) {
        x = x || Math.min(x, this.width);
        y = y || Math.min(y, this.height);
        if (force || this.options.x !== x || this.options.y !== y) {
            this.options.x = x;
            this.options.y = y;
            this._escape(this.codes.cursor.position(x, y));
        }
        return this;
    }
    setBgColor(color = 'black', force = false) {
        if (force || this.options.bgColor !== color) {
            this.options.bgColor = color;
            this._escape(this.codes.color.bg(color));
        }
        return this;
    }
    setFgColor(color = 'white', force = false) {
        if (force || this.options.fgColor !== color) {
            this.options.fgColor = color;
            this._escape(this.codes.color.fg(color));
        }
        return this;
    }
    setStyle(style, value = true, force = false) {
        if (
            force ||
            !!value !== this.options.styles.has(style)
        ) {
            if (value) {
                this.options.styles.add(style);
            } else {
                this.options.styles.delete(style);
            }
            this._escape(this.codes.styles[style][+value]);
        }
        return this;
    }
    setStyles(styles = [], force = false) {
        this._escape(this.codes.styles.reset);
        this.setBgColor(this.options.bgColor, true);
        this.setFgColor(this.options.fgColor, true);
        this.options.styles.clear();
        styles.forEach(function(style) {
            this.setStyle(style, true, force);
        }, this);
        return this;
    }
    setWrap(wrap = true) {
        this.options.wrap = wrap;
        return this;
    }
    setScroll(scroll = true) {
        this.options.scroll = scroll;
        return this;
    }
    setLock(lock = false) {
        this.options.lock = lock;
        return this;
    }
    setOptions(options = {}, force) {
        for (let key in options) {
            let fn = this['set' + key.charAt(0).toUpperCase() + key.slice(1)];
            if (typeof fn === 'function') {
                fn.apply(this, [options[key], force]);
            }
        }
        if (options.x || options.y) {
            this.setPosition(options.x, options.y, force);
        }
        return this;
    }
    reset(clear = false, color) {
        if (clear) {
            this.clear(color);
        }
        this.setEncoding();
        this.setCursor();
        this.setPosition();
        this.setBgColor();
        this.setFgColor();
        this.setStyles();
        this.setWrap();
        this.setScroll();
        this.setLock();
        return this;
    }
    clear(color) {
        let currentBgColor = this.options.bgColor;
        this._escape(this.codes.cursor.save);
        this.setPosition(0, 0, true);
        this.setBgColor(color);
        this._escape(this.codes.screen.clear);
        this.setBgColor(currentBgColor);
        this._escape(this.codes.cursor.restore);
        return this;
    }
    write(text = '') {
        let position;
        if (this.options.lock) {
            position = {x: this.options.x, y: this.options.y};
            this._escape(this.codes.cursor.save);
        }

        let current = Object.assign({}, this.options);
        if (!this.options.scroll) {
            let limit = this.options.wrap ? (
                this.width * this.height
                - Math.max((this.options.y - 1), 0) * this.width
                - this.options.x
            ) : this.width - this.options.x;
            text = text.slice(0, limit);
        }

        this._write(text);
        let currentX = this.options.x;
        this.options.x = (this.options.x + text.length) % this.width;
        this.options.y = Math.max(
            this.options.y + Math.floor(
                (currentX + text.length) % this.width
            ),
            this.height
        );

        if (this.options.lock) {
            this._escape(this.codes.cursor.restore);
            this.options.x = position.x;
            this.options.y = position.y;
        }
        return this;
    }
    w(text, options, revert, force) {
        if (revert) {
            let current = Object.assign({}, this.options);
            this.setOptions(options, force);
            this.write(text);
            this.setOptions(current, force);
        } else {
            this.setOptions(options, force);
            this.write(text);
        }
        return this;
    }
    _write(text = '') {
        this.stream.write(text);
    }
    _escape(data) {
        this._write(this.codes.escape + data);
    }
};

module.exports = TerminalScreen;
