'use strict';

const TerminalApi = require('terminal-api');
const Pixel = require('./pixel');

const TerminalScreen = class {
  static get TerminalApi() { return TerminalApi; }
  static get colors() { return TerminalApi.colors; }

  constructor(stream, encoding) {
    this.terminalApi = new TerminalApi(stream, encoding);
    this.interval = 100;
    this.intervalId = null;
    this.running = false;
    this.stepNum = 0;
    this.pixels = [];
    this.newPixels = [];
  }
  _step() {
    this.render();
    this.stepNum++;
  }
  _renderPixel(pixel) {
    const char = pixel.options.char;
    const options = {
      x: pixel.x, y: pixel.y,
      bgColor: pixel.options.bgColor,
      fgColor: pixel.options.fgColor,
      styles: pixel.options.styles
    };
    this.terminalApi.w(char, options);
  }
  get width() {
    return this.terminalApi.width;
  }
  get height() {
    return this.terminalApi.height;
  }
  get colors() {
    return this.terminalApi.colors;
  }
  setStream(stream) {
    this.terminalApi.setStream(stream);
  }
  setEncoding(encoding) {
    this.terminalApi.setEncoding(encoding);
  }
  setInterval(interval = 100) {
    this.interval = interval;
    if (this.running) {
      this.stop();
      this.start(false);
    }
  }
  render() {
    this.newPixels.forEach(newPixel => {
      let pixel = this.pixels.find(
        pixel => 
          pixel.x === newPixel.x
          && pixel.y === newPixel.y
      );
      if (!pixel) {
        this._renderPixel(newPixel);
        this.pixels.push(newPixel);
      } else if (pixel.isDifferent(newPixel)) {
        this._renderPixel(newPixel);
        pixel.setOptions(newPixel.options);
      }
    });
    this.newPixels = [];
  }
  start(reset = true) {
    if (!this.running) {
      if (reset) {
        this.stepNum = 0;
      }
      this.running = true;
      this.intervalId = setInterval(
        this._step.bind(this),
        this.interval
      );
    }
  }
  stop() {
    if (this.running) {
      this.running = false;
      clearInterval(this.intervalId);
    }
  }
  clear() {
    this.terminalApi.clear();
    this.pixels = [];
    this.newPixels = [];
  }
  setCursor(cursor = true) {
    this.terminalApi.setCursor(cursor, false);
  }
  setPixel(x = 0, y = 0, options) {
    options = {...Pixel.defaultOptions, ...options};
    let pixel = this.newPixels.find(
      pixel => pixel.x === x && pixel.y === y
    );
    if (pixel) {
      pixel.setOptions(options);
    } else {
      pixel = new Pixel(x, y, options);
      this.newPixels.push(pixel);
    }
  }
};

module.exports = TerminalScreen;