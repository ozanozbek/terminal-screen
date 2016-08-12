'use strict';

const test = require('tape');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = {
    encoding: 'utf8',
    cursor: true,
    x: 0,
    y: 0,
    bgColor: 'black',
    fgColor: 'white',
    styles: new Set(),
    wrap: true,
    scroll: true,
    lock: false
};

test('construct', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    
    t.ok(ts instanceof TerminalScreen);
    t.equal(ts.codes, codes);
    t.equal(ts.stream, stream);
    t.equal(ts.width, stream.columns);
    t.equal(ts.height, stream.rows);
    t.deepLooseEqual(ts.options, defaultOptions);
    
    t.end();
});
