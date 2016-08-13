'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');

test('setStream', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen();
    let spy = sinon.spy(ts, 'reset');

    ts.setStream(undefined, true);
    t.equal(ts.stream, process.stdout, 'sets default');

    ts.setStream(stream);
    t.equal(ts.stream, stream, 'sets stream');
    t.equal(ts.width, stream.columns, 'sets width');
    t.equal(ts.height, stream.rows, 'sets height');
    t.equal(spy.callCount, 2, 'calls reset');

    ts.setStream(stream);
    t.equal(spy.callCount, 2, 'compares current');

    ts.setStream(stream, true);
    t.equal(spy.callCount, 3, 'forces change');

    t.equal(ts, ts.setStream(), 'returns instance');

    t.end();
});
