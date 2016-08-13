'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = require('../src/default-options');

test('setStyles', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    let spy = sinon.spy(ts, '_escape');
    let spyStyle = sinon.spy(ts, 'setStyle');
    let spyBg = sinon.spy(ts, 'setBgColor');
    let spyFg = sinon.spy(ts, 'setFgColor');

    ts.setStyles(['bold', 'underline']);
    t.equal(
        spy.withArgs(codes.styles.reset).callCount,
        1,
        'resets styles'
    );
    t.equal(spyBg.callCount, 1, 'fixes bgColor');
    t.equal(spyFg.callCount, 1, 'fixes fgColor');
    t.equal(spyStyle.withArgs('bold', true).callCount, 1, 'sets style 1');
    t.equal(spyStyle.withArgs('underline', true).callCount, 1, 'sets style 2');

    ts.setStyles(['dim'], true);
    t.equal(spyStyle.withArgs('dim', true, true).callCount, 1, 'forces change');

    t.equal(ts, ts.setStyles(['dim']), 'returns instance');

    t.end();
});
