'use strict';

const TerminalApi = require('terminal-api');

const Pixel = require('./pixel');

const TerminalScreen = class {
  constructor(stream, encoding) {
    this.terminalApi = new TerminalApi(stream, encoding);
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
    this.terminalApi.w(
      pixel.options.char,
      pixel.options
    );
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
        pixel.options = {...newPixel.options};
      }
    });
    this.newPixels = [];
  }
  start(interval = 100) {
    if (!this.running) {
      this.stepNum = 0;
      this.running = true;
      this.intervalId = setInterval(
        this._step.bind(this),
        interval
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
  }
  setPixel(x, y, options) {
    options = {...Pixel.defaultOptions, ...options};
    let pixel = this.newPixels.find(
      pixel => pixel.x === x && pixel.y === y
    );
    if (!pixel) {
      pixel = new Pixel(x, y, options);
      this.newPixels.push(pixel);
    }
  }
};

module.exports = TerminalScreen;