'use strict';

const colors = require('./colors');
const codes = require('./codes');
const writer = require('./writer');

const TerminalScreen = class {
    static get colors() { return colors; }
    static get codes() { return codes; }
    static get writer() { return writer; }
    
    constructor(stream, encoding) {
        this.colors = colors;
        this.codes = codes;
        this.writer = writer;
        
        this.stream = undefined;
        this.encoding = undefined;
        this.width = undefined;
        this.height = undefined;
        this.state = {};
        
        this.setStream(stream);
        this.setEncoding(encoding);
    }
    
    _applyEncoding() {
        if (this.stream && this.encoding) {
            this.stream.setDefaultEncoding(this.encoding);
        }
    }
    
    _resetState(keepPosition = false) {
        this.state = {
            x: keepPosition ? this.state.x : undefined,
            y: keepPosition ? this.state.y : undefined,
            bgColor: undefined,
            fgColor: undefined,
            cursor: undefined,
            styles: {}
        };
        Object.keys(codes.styles).forEach((style) => {
            this.state.styles[style] = undefined;
        })
    }
    
    // change to es6 setter getter?
    setStream(stream = process.stdout) {
        this.stream = stream;
        this.width = this.stream.columns;
        this.height = this.stream.rows;
        this._applyEncoding();
        this._resetState();
    }
    
    setEncoding(encoding = 'utf8') {
        this.encoding = encoding;
        this._applyEncoding();
    }
    
    clear() {
        this.stream.write(this.writer.clear());
    }
    
    move(x, y) {
        x = Math.min(x, this.width);
        y = Math.min(y, this.height);
        this.stream.write(this.writer.move(x, y));
        this.state.x = x;
        this.state.y = y;
    }
    
    write(text) {
        this.stream.write(this.writer.write(text));
        // update cursor position state
    }
    
    setBgColor(color, force = false) {
        if (force || this.state.bgColor !== color) {
            this.stream.write(this.writer.setBgColor(color));
            this.state.bgColor = color;
        }
    }
    setFgColor(color, force = false) {
        if (force || this.state.fgColor !== color) {
            this.stream.write(this.writer.setFgColor(color));
            this.state.fgColor = color;
        }
    }
    resetBgColor(force = false) {
        if (force || this.state.bgColor !== undefined) {
            this.stream.write(this.writer.resetBgColor());
            this.state.bgColor = undefined;
        }
    }
    resetFgColor(force = false) {
        if (force || this.state.fgColor !== undefined) {
            this.stream.write(this.writer.resetFgColor());
            this.state.fgColor = undefined;
        }
    }
    hideCursor(force = false) {
        if (force || this.state.cursor) {
            this.stream.write(this.writer.hideCursor());
            this.state.cursor = false;
        }
    }
    showCursor(force = false) {
        if (force || !this.state.cursor) {
            this.stream.write(this.writer.hideCursor());
            this.state.cursor = true;
        }
    }
    enableStyles(styleList = [], force = false, _disable = false) {
        styleList = (typeof styleList === 'string') ? [styleList] : styleList;
        styleList = styleList.filter(
            (style) => 
                force || this.state.styles[style] !== (_disable ? false : true)
        );
        this.stream.write(this.writer.enableStyles(styleList));
        styleList.forEach((style) => {
            this.state.styles[style] = _disable ? false : true;
        });
    }
    disableStyles(styleList = [], force = false) {
        this.enableStyles(styleList, force, true);
    }
    setStyles(styles, force = false) {
        if (!force) {
            styles = Object.keys(styles).reduce(
                (list, style) => this.state.styles[style] !== styles[style]
            ).reduce(
                (_styles, style) => _styles[style] = styles[style],
            {});
        }
        this.stream.write(this.writer.setStyles(styles));
        for (const style in this.state.styles) {
            this.state.styles[style] = styles[style];
        }
    }
    reset() {
        this.stream.write(this.writer.reset());
        this._resetState(true);
    }
};

module.exports = TerminalScreen;