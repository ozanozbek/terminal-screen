'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = require('../src/default-options');

test('setPosition', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    let spy = sinon.spy(ts, '_escape');

    ts.setPosition(undefined, undefined, true);
    t.equal(ts.options.x, defaultOptions.x, 'sets default');
    t.equal(ts.options.y, defaultOptions.y, 'sets default');

    ts.setPosition(10, 10);
    t.equal(ts.options.x, ts.width, 'limits x');
    t.equal(ts.options.y, ts.height, 'limits y');

    ts.setPosition(1, 2);
    t.equal(ts.options.x, 1, 'sets x');
    t.equal(ts.options.y, 2, 'sets y');
    t.equal(
        spy.withArgs(codes.cursor.position(1, 2)).callCount,
        1,
        'writes code'
    );

    ts.setPosition(1, 2);
    t.equal(
        spy.withArgs(codes.cursor.position(1, 2)).callCount,
        1,
        'compares current'
    );

    ts.setPosition(1, 2, true);
    t.equal(
        spy.withArgs(codes.cursor.position(1, 2)).callCount,
        2,
        'forces change'
    );

    t.equal(ts, ts.setPosition(), 'returns instance');

    t.end();
});
