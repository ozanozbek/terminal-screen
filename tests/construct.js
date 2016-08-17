'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

test('construct', function(t) {
    let stream = new MockStream(4, 4);
    let stub = sinon.stub(TerminalScreen.prototype, 'setStream');
    let ts = new TerminalScreen(stream);
    
    t.ok(ts instanceof TerminalScreen, 'initializes');
    t.equal(ts.codes, codes, 'sets codes');
    t.equal(stub.callCount, 1, 'calls setStream');

    stub.restore();
    
    t.end();
});
