'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

test('clear', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    let spy = sinon.spy(ts, '_escape');
    let spySetBgColor = sinon.spy(ts, 'setBgColor');

    ts.clear();
    t.equal(spy.withArgs(codes.cursor.save).callCount, 1, 'saves screen');
    t.equal(spy.withArgs(codes.screen.clear).callCount, 1, 'clears screen');
    t.equal(spy.withArgs(codes.cursor.restore).callCount, 1, 'restores screen');
    t.equal(spySetBgColor.callCount, 2, 'calls setBgColor');

    ts.setBgColor('red');
    ts.clear('blue');
    t.equal(ts.options.bgColor, 'red', 'keeps bgColor');

    t.equal(ts, ts.clear(), 'returns instance');

    t.end();
});
