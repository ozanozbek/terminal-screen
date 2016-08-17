'use strict';

const MockStream = class MockStream {
    constructor(width = 40, height = 30) {
        this.columns = width;
        this.rows = height;
        this.encoding = null;
    }
    setDefaultEncoding(encoding) {
        this.encoding = encoding;
    }
    write(text) {

    }
};

module.exports = MockStream;
