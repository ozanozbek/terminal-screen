'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');

test('reset', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    let spyClear = sinon.spy(ts, 'clear');

    ts.reset();
    t.equal(spyClear.callCount, 0, 'uses default');

    ts.reset(true, 'blue');
    t.equal(spyClear.withArgs('blue').callCount, 1, 'uses color');

    let spySetEncoding = sinon.spy(ts, 'setEncoding');
    let spySetCursor = sinon.spy(ts, 'setCursor');
    let spySetPosition = sinon.spy(ts, 'setPosition');
    let spySetBgColor = sinon.spy(ts, 'setBgColor');
    let spySetFgColor = sinon.spy(ts, 'setFgColor');
    let spySetStyles = sinon.spy(ts, 'setStyles');
    let spySetWrap = sinon.spy(ts, 'setWrap');
    let spySetScroll = sinon.spy(ts, 'setScroll');
    let spySetLock = sinon.spy(ts, 'setLock');

    ts.reset();

    t.equal(spySetEncoding.withArgs().callCount, 1, 'calls setEncoding');
    t.equal(spySetCursor.withArgs().callCount, 1, 'calls setCursor');
    t.equal(spySetPosition.withArgs().callCount, 1, 'calls setPosition');
    t.equal(spySetBgColor.withArgs().callCount, 2, 'calls setBgColor');
    t.equal(spySetFgColor.withArgs().callCount, 2, 'calls setFgColor');
    t.equal(spySetStyles.withArgs().callCount, 1, 'calls setStyles');
    t.equal(spySetWrap.withArgs().callCount, 1, 'calls setWrap');
    t.equal(spySetScroll.withArgs().callCount, 1, 'calls setScroll');
    t.equal(spySetLock.withArgs(false).callCount, 1, 'calls setLock');

    t.equal(ts, ts.reset(), 'returns instance');

    t.end();
});
