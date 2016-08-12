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

test('setCursor', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    let spy = sinon.spy(ts, '_escape');

    ts.setCursor(undefined, true);
    t.equal(ts.options.cursor, defaultOptions.cursor, 'sets default');

    ts.setCursor(false);
    t.equal(ts.options.cursor, false, 'sets cursor');
    t.equal(spy.withArgs(codes.cursor.hide).callCount, 1, 'writes code');

    ts.setCursor(false);
    t.equal(spy.withArgs(codes.cursor.hide).callCount, 1, 'compares current');

    ts.setCursor(false, true);
    t.equal(spy.withArgs(codes.cursor.hide).callCount, 2, 'forces change');

    t.equal(ts, ts.setCursor(), 'returns instance');

    t.end();
});

test('setWrap', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);

    ts.setWrap(undefined, true);
    t.equal(ts.options.wrap, defaultOptions.wrap, 'sets default');

    ts.setWrap(false);
    t.equal(ts.options.wrap, false, 'sets wrap');

    t.equal(ts, ts.setWrap(), 'returns instance');

    t.end();
});

test('setScroll', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);

    ts.setScroll(undefined, true);
    t.equal(ts.options.scroll, defaultOptions.scroll, 'sets default');

    ts.setScroll(false);
    t.equal(ts.options.scroll, false, 'sets scroll');

    t.equal(ts, ts.setScroll(), 'returns instance');

    t.end();
});

test('setLock', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);

    ts.setLock(undefined, true);
    t.equal(ts.options.lock, true, 'sets default');

    ts.setLock(false);
    t.equal(ts.options.lock, false, 'sets lock');

    t.equal(ts, ts.setLock(), 'returns instance');

    t.end();
});

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

test('setOptions', function(t) {
    let stream = new MockStream(4, 4);
    let ts = new TerminalScreen(stream);
    let options = {
        encoding: 'ascii',
        cursor: false,
        x: 3,
        y: 2,
        bgColor: 'red',
        fgColor: 'blue',
        styles: ['reverse', 'blink'],
        wrap: false,
        scroll: false,
        lock: true
    };

    ts.setOptions(options);
    t.deepLooseEqual(
        ts.options,
        Object.assign({}, options, {styles: new Set(options.styles)}),
        'sets options'
    );

    t.end();
});
