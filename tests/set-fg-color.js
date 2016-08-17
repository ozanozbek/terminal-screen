'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = require('../src/default-options');

test('setFgColor', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    let spy = sinon.spy(ts, '_escape');

    ts.setFgColor(undefined, true);
    t.equal(ts.options.fgColor, defaultOptions.fgColor, 'sets default');

    ts.setFgColor('blue');
    t.equal(ts.options.fgColor, 'blue', 'sets fgColor');
    t.equal(
        spy.withArgs(codes.color.fg('blue')).callCount,
        1,
        'writes code'
    );

    ts.setFgColor('blue');
    t.equal(
        spy.withArgs(codes.color.fg('blue')).callCount,
        1,
        'compares current'
    );

    ts.setFgColor('blue', true);
    t.equal(
        spy.withArgs(codes.color.fg('blue')).callCount,
        2,
        'forces change'
    );

    t.equal(ts, ts.setFgColor(), 'returns instance');

    t.end();
});
