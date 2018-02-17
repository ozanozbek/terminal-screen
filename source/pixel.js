'use strict';

const defaultOptions = {
  bgColor: 0,
  fgColor: 255,
  styles: [],
  char: ' ',
};

const Pixel = class {
  static get defaultOptions() { return defaultOptions; }

  constructor(x = 0, y = 0, options = defaultOptions) {
    this.x = x;
    this.y = y;
    this.setOptions(options);
  }
  setOptions(options = defaultOptions) {
    this.options = {...defaultOptions, ...options};
  }
  isDifferent(pixel = {}) {
    for (const key of ['bgColor', 'fgColor', 'char']) {
      if (pixel.options[key] !== this.options[key]) {
        return true;
      }
    };
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