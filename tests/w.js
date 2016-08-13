'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

test('w', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    let spy = sinon.spy(ts, 'write');
    let spySetOptions = sinon.spy(ts, 'setOptions');

    ts.w('test', {x: 2}, false);
    t.equal(spy.withArgs('test').callCount, 1, 'calls write');
    t.equal(spySetOptions.withArgs({x: 2}).callCount, 1, 'calls setOptions');

    let options = Object.assign({}, ts.options);
    ts.w('test', {bgColor: 'blue'}, true);
    t.equal(spySetOptions.withArgs(options).callCount, 1, 'reverts options');

    t.equal(ts, ts.write(), 'returns instance');

    t.end();
});
