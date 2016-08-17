'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = require('../src/default-options');

test('setLock', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);

    ts.setLock(undefined, true);
    t.equal(ts.options.lock, defaultOptions.lock, 'sets default');

    ts.setLock(false);
    t.equal(ts.options.lock, false, 'sets lock');

    t.equal(ts, ts.setLock(), 'returns instance');

    t.end();
});
