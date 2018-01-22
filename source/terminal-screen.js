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
    this.wrap = true;

    this.width = undefined;
    this.height = undefined;
    this.state = {};

    this.setStream(stream, false);
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
    });
  }
  _writeChar(char) {
    if (this.state.x < this.width) {
      this.stream.write(this.writer.write(char));
      this.state.x++;
      return true;
    } else if (this.wrap && this.state.y < this.height - 1) {
      this.stream.write(this.writer.write(char));
      this.state.y++;
      this.state.x = 0;
      return true;
    }
    return false;
  }
  setStream(stream = process.stdout, _applyEncoding = true) {
    this.stream = stream;
    this.width = this.stream.columns;
    this.height = this.stream.rows;
    this._resetState();
    if (_applyEncoding) {
      this._applyEncoding();
    }
  }
  setEncoding(encoding = 'utf8') {
    this.encoding = encoding;
    this._applyEncoding();
  }
  setWrap(wrap = true) {
    this.wrap = Boolean(wrap);
  }
  clear() {
    this.stream.write(this.writer.clear());
    this.state.x = 0;
    this.state.y = 0;
  }
  setPosition(x, y) {
    x = Math.min(x, this.width);
    y = Math.min(y, this.height);
    this.stream.write(this.writer.setPosition(x, y));
    this.state.x = x;
    this.state.y = y;
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
  setCursor(state = true, force = false) {
    if (force || state !== this.state.cursor) {
      this.stream.write(
        state
        ? this.writer.showCursor()
        : this.writer.hideCursor()
      );
      this.state.cursor = state;
    }
  }
  setStyles(styles, force = false) {
    if (!force) {
      styles = Object.keys(styles).filter(
        style => this.state.styles[style] !== styles[style]
      ).reduce((newStyles, style) => {
        newStyles[style] = styles[style];
        return newStyles;
      }, {});
    }
    this.stream.write(this.writer.setStyles(styles));
    for (const style in this.state.styles) {
      this.state.styles[style] = styles[style];
    }
  }
  enableStyles(styleList = [], force = false, _disable = false) {
    styleList = (typeof styleList === 'string') ? [styleList] : styleList;
    this.setStyles(styleList.reduce((newStyles, style) => {
      newStyles[style] = _disable ? false : true;
      return newStyles;
    }, {}));
  }
  disableStyles(styleList = [], force = false) {
    this.enableStyles(styleList, force, true);
  }
  reset() {
    this.stream.write(this.writer.reset());
    this.setCursor(true);
    this._resetState(true);
  }
  write(text = '') {
    const chars = String(text).split('');
    let status = true;
    while (status && chars.length) {
      status = this._writeChar(chars.shift());
    }
  }
  w(text, options, revert = false, force = false) {
  //TODO
  }
};

module.exports = TerminalScreen;