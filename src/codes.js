'use strict';

const colors = require('./colors');

const codes = {
    escape: '\x1b[',
    screen: {
        clear: '0J'
    },
    cursor: {
        show: '?25h',
        hide: '?25l',
        save: 's',
        restore: 'u',
        position: function(x, y) {
            return (parseInt(y) + 1).toString() + ';' +
                (parseInt(x) + 1).toString() + 'H';
        }
    },
    color: {
        bg: function(id) {
            return '48;5;' + colors[id] + 'm';
        },
        fg: function(id) {
            return '38;5;' + colors[id] + 'm';
        }
    },
    styles: {
        reset: '0m',
        bold: ['21m', '1m'],
        dim: ['22m', '2m'],
        italic: ['23m', '3m'],
        underline: ['24m', '4m'],
        blink: ['25m', '5m'],
        reverse: ['27m', '7m'],
        hidden: ['28m', '8m'],
        strikethrough: ['29m', '9m']
    }
};

module.exports = codes;
