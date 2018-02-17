'use strict';

const TerminalApi = require('terminal-api');
const PixelCollection = require('./pixel-collection');

const TerminalScreen = class extends TerminalApi {
  constructor(stream, encoding) {
    super(stream, encoding);
    this.intervalTime = 100;
    this.intervalId = null;
    this.running = false;
    this.stepNum = 0;
    this.pixels = new PixelCollection();
    this.newPixels = new PixelCollection();
    this.oldTimeStamp = null;
    this.newTimeStamp = null;
    this.fps = 0;
  }
  _step() {
    this.render();
    this.stepNum++;
  }
  _renderPixel(x, y, pixel) {
    const char = pixel.options.char;
    const options = {
      x, y,
      bgColor: pixel.options.bgColor,
      fgColor: pixel.options.fgColor,
      styles: pixel.options.styles
    };
    this.w(char, options);
  }
  setIntervalTime(intervalTime = 100) {
    this.intervalTime = intervalTime;
    if (this.running) {
      this.stop();
      this.start(false);
    }
  }
  setFps(fps = 30) {
    this.setIntervalTime(1000 / fps);
  }
  render() {
    this.newPixels.forEach((newPixel, x, y) => {
      if (this.pixels.set(x, y, newPixel)) {
        this._renderPixel(x, y, newPixel);
      }
    });
    this.newPixels.empty();
    this.emit('render', this.stepNum);
    this.newTimeStamp = new Date;
    if (this.oldTimeStamp) {
      this.fps = Math.round(1000 / (this.newTimeStamp - this.oldTimeStamp));
    }
    this.oldTimeStamp = this.newTimeStamp;
  }
  start(reset = true) {
    if (!this.running) {
      if (reset) {
        this.stepNum = 0;
        this.fps = 0;
        this.oldTimeStamp = null;
        this.newTimeStamp = null;
      }
      this.running = true;
      this.intervalId = setInterval(
        this._step.bind(this),
        this.intervalTime
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
    super.clear();
    this.pixels.empty();
    this.newPixels.empty();
  }
  set(x, y, options) {
    this.newPixels.set(x, y, options);
  }
};

TerminalScreen.TerminalApi = TerminalApi;
TerminalScreen.PixelCollection = PixelCollection;

module.exports = TerminalScreen;