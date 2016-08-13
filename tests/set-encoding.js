'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = require('../src/default-options');

test('setEncoding', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    let spy = sinon.spy(stream, 'setDefaultEncoding');

    ts.setEncoding(undefined, true);
    t.equal(ts.options.encoding, defaultOptions.encoding, 'sets default');

    ts.setEncoding('ascii');
    t.equal(ts.options.encoding, 'ascii', 'sets encoding');
    t.equal(spy.callCount, 2, 'calls setDefaultEncoding');

    ts.setEncoding('ascii');
    t.equal(spy.callCount, 2, 'compares current');

    ts.setEncoding('ascii', true);
    t.equal(spy.callCount, 3, 'forces change');

    t.equal(ts, ts.setEncoding(), 'returns instance');

    t.end();
});
