'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = {
    encoding: 'utf8',
    cursor: true,
    x: 0,
    y: 0,
    bgColor: 'black',
    fgColor: 'white',
    styles: new Set(),
    wrap: true,
    scroll: true,
    lock: false
};

test('construct', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    
    t.ok(ts instanceof TerminalScreen, 'initialization');
    t.equal(ts.codes, codes, 'sets codes');
    t.equal(ts.stream, stream, 'sets stream');
    t.equal(ts.width, stream.columns, 'sets width');
    t.equal(ts.height, stream.rows, 'sets height');
    t.deepLooseEqual(ts.options, defaultOptions, 'sets default options');
    
    t.end();
});

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
