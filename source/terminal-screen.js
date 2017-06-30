'use strict';

const core = require('./core');
const colors = require('./colors');
const codes = require('./codes');

const TerminalScreen = class TerminalScreen {
    static get core() { return core; }
    static get colors() { return colors; }
    static get codes() { return codes; }
};

module.exports = TerminalScreen;