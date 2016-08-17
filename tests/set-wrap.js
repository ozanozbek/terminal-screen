'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = require('../src/default-options');

test('setWrap', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);

    ts.setWrap(undefined, true);
    t.equal(ts.options.wrap, defaultOptions.wrap, 'sets default');

    ts.setWrap(false);
    t.equal(ts.options.wrap, false, 'sets wrap');

    t.equal(ts, ts.setWrap(), 'returns instance');

    t.end();
});
