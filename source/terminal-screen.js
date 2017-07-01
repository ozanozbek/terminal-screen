'use strict';

const colors = require('./colors');
const codes = require('./codes');
const core = require('./core');

const TerminalScreen = class {
    static get colors() { return colors; }
    static get codes() { return codes; }
    static get core() { return core; }
    
    constructor() {}
};

module.exports = TerminalScreen;