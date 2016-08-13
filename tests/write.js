'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = require('../src/default-options');

test('write', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    let spy = sinon.spy(ts, '_write');

    /*ts.setOptions({x: 0, y: 0, lock: false});
    ts.write('x');
    t.equal(spy.withArgs('x').callCount, 1, 'calls _write');
    t.equal(ts.options.x, 1, 'uses no lock');

    ts.setOptions({x: 0, y: 0, lock: true});
    ts.write('x');
    t.equal(ts.options.x, 0, 'uses lock');
    ts.setOptions({lock: false});

    ts.setOptions({x: 0, y: 3, wrap: false, scroll: false});
    ts.write('q12345');
    t.equal(spy.withArgs('q123').callCount, 1, 'calls _write');
    t.equal(ts.options.x, 3, 'x uses no wrap no scroll');
    t.equal(ts.options.y, 3, 'y uses no wrap no scroll');

    ts.setOptions({x: 0, y: 2, wrap: true, scroll: false});
    ts.write('w12345');
    t.equal(spy.withArgs('w12345').callCount, 1, 'calls _write');
    t.equal(ts.options.x, 2, 'x uses wrap no scroll');
    t.equal(ts.options.y, 3, 'y uses wrap no scroll');*/

    ts.setOptions({x: 0, y: 3, wrap: true, scroll: false});
    ts.write('e12345');
    t.equal(spy.withArgs('e123').callCount, 1, 'calls _write');
    t.equal(ts.options.x, 3, 'x uses wrap no scroll');
    t.equal(ts.options.y, 3, 'y uses wrap no scroll');

    /*ts.setOptions({x: 0, y: 3, wrap: true, scroll: true});
    ts.write('r12345');
    t.equal(spy.withArgs('r12345').callCount, 1, 'calls _write');
    t.equal(ts.options.x, 2, 'x uses wrap scroll');
    t.equal(ts.options.y, 3, 'y uses wrap scroll');

    t.equal(ts, ts.write(), 'returns instance');*/

    t.end();
});
