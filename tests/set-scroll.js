'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = require('../src/default-options');

test('setScroll', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);

    ts.setScroll(undefined, true);
    t.equal(ts.options.scroll, defaultOptions.scroll, 'sets default');

    ts.setScroll(false);
    t.equal(ts.options.scroll, false, 'sets scroll');

    t.equal(ts, ts.setScroll(), 'returns instance');

    t.end();
});
