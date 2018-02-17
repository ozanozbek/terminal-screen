'use strict';

const Pixel = require('./pixel');

const PixelCollection = class {
  constructor() {
    this.pixels = {};
  }
  empty() {
    this.pixels = {};
  }
  get(x, y) {
    return (this.pixels[x] && this.pixels[x][y])
      ? this.pixels[x][y]
      : undefined;
  }
  set(x, y, pixel) {
    if (!(pixel instanceof Pixel )) {
      pixel = new Pixel(pixel);
    }
    this.pixels[x] = this.pixels[x] || {};
    if (this.pixels[x][y]) {
      return this.pixels[x][y].setOptions(pixel.options);
    } else {
      this.pixels[x][y] = pixel;
      return true;
    }
  }
  forEach(forEachFn) {
    if (typeof forEachFn === 'function') {
      for (const x in this.pixels) {
        for (const y in this.pixels[x]) {
          forEachFn(this.pixels[x][y], x, y);
        }
      }
    }
  }
};

PixelCollection.Pixel = Pixel;

module.exports = PixelCollection;