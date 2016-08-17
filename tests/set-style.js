'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = require('../src/default-options');

test('setStyle', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    let spy = sinon.spy(ts, '_escape');

    ts.setStyle('underline', undefined, true);
    t.ok(ts.options.styles.has('underline'), 'sets default');

    ts.setStyle('bold');
    t.ok(ts.options.styles.has('bold'), 'sets fgColor');
    t.equal(
        spy.withArgs(codes.styles.bold[1]).callCount,
        1,
        'writes code'
    );

    ts.setStyle('bold');
    t.equal(
        spy.withArgs(codes.styles.bold[1]).callCount,
        1,
        'compares current'
    );

    ts.setStyle('bold', true, true);
    t.equal(
        spy.withArgs(codes.styles.bold[1]).callCount,
        2,
        'forces change'
    );

    t.equal(ts, ts.setStyle('bold'), 'returns instance');

    t.end();
});
