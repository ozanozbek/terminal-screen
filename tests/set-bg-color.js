'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = require('../src/default-options');

test('setBgColor', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    let spy = sinon.spy(ts, '_escape');

    ts.setBgColor(undefined, true);
    t.equal(ts.options.bgColor, defaultOptions.bgColor, 'sets default');

    ts.setBgColor('blue');
    t.equal(ts.options.bgColor, 'blue', 'sets bgColor');
    t.equal(
        spy.withArgs(codes.color.bg('blue')).callCount,
        1,
        'writes code'
    );

    ts.setBgColor('blue');
    t.equal(
        spy.withArgs(codes.color.bg('blue')).callCount,
        1,
        'compares current'
    );

    ts.setBgColor('blue', true);
    t.equal(
        spy.withArgs(codes.color.bg('blue')).callCount,
        2,
        'forces change'
    );

    t.equal(ts, ts.setBgColor(), 'returns instance');

    t.end();
});
