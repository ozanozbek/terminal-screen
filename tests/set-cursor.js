'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = require('../src/default-options');

test('setCursor', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    let spy = sinon.spy(ts, '_escape');

    ts.setCursor(undefined, true);
    t.equal(ts.options.cursor, defaultOptions.cursor, 'sets default');

    ts.setCursor(false);
    t.equal(ts.options.cursor, false, 'sets cursor');
    t.equal(spy.withArgs(codes.cursor.hide).callCount, 1, 'writes code');

    ts.setCursor(false);
    t.equal(spy.withArgs(codes.cursor.hide).callCount, 1, 'compares current');

    ts.setCursor(false, true);
    t.equal(spy.withArgs(codes.cursor.hide).callCount, 2, 'forces change');

    t.equal(ts, ts.setCursor(), 'returns instance');

    t.end();
});
