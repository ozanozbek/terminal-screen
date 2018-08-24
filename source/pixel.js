'use strict';

const defaultOptions = {
  bgColor: null,
  fgColor: null,
  styles: [],
  char: ' ',
};

const Pixel = class {
  static get defaultOptions() { return defaultOptions; }

  constructor(options = defaultOptions) {
    this.setOptions(options, true);
  }
  setOptions(options = defaultOptions, force = false) {
    if (force || this.isDifferent(options)) {
      this.options = {...defaultOptions, ...options};
      return true;
    }
    return false;
  }
  isDifferent(options = {}) {
    options = (options instanceof Pixel) ? options.options : options;
    for (const key of ['bgColor', 'fgColor', 'char']) {
      if (options[key] !== this.options[key]) {
        return true;
      }
    };
    if (options.styles.length !== this.options.styles.length) {
      return true;
    }
    for (const style of options.styles) {
      if (!this.options.styles.includes(style)) {
        return true;
      }
    };
    return false;
  }
  isSame(options = {}) {
    return !this.isDifferent(options);
  }
};

module.exports = Pixel;