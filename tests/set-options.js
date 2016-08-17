'use strict';

const test = require('tape');
const sinon = require('sinon');
const MockStream = require('./_mock-stream');

const TerminalScreen = require('../src/terminal-screen');
const codes = require('../src/codes');

const defaultOptions = require('../src/default-options');

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
