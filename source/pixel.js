'use strict';

const defaultOptions = {
  bgColor: 0,
  fgColor: 0,
  styles: [],
  char: ' ',
};

const Pixel = class {
  static get defaultOptions() { return defaultOptions; }

  constructor(x, y, options = defaultOptions) {
    this.x = 0;
    this.y = 0;
    this.setOptions(options);
  }
  setOptions(options = defaultOptions) {
    this.options = {...defaultOptions, ...options};
  }
  isDifferent(pixel = {}) {
    ['bgColor', 'fgColor', 'char'].forEach(key => {
      if (pixel.options[key] !== this.options[key]) {
        return true;
      }
    });
    if (pixel.options.styles.length !== this.options.styles.length) {
      return true;
    }
    pixel.options.styles.forEach(style => {
      if (!this.options.styles.includes(style)) {
        return true;
      }
    });
    return false;
  }
  isSame(pixel = {}) {
    return !this.isDifferent(pixel);
  }
};

module.exports = Pixel;