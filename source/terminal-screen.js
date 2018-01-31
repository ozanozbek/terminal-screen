'use strict';

const TerminalApi = require('terminal-api');

const TerminalScreen = class {
  constructor(stream, encoding) {
    this.terminalApi = new TerminalApi(stream, encoding);
    this.intervalId = null;
    this.running = false;
  }
  _step() {
    this.render();
  }
  render() {
    console.log('render!');
  }
  start(interval = 100) {
    if (!this.running) {
      this.running = true;
      this.intervalId = setInterval(
        this._step.bind(this),
        interval
      );
    }
  }
  stop() {
    if (!this.running) {
      this.running = false;
      clearInterval(this.intervalId);
    }
  }
};

module.exports = TerminalScreen;