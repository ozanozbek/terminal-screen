# terminal-screen

[Installation](#installation) |
[Usage](#usage) |
[API](#api) |
[Colors](#colors) |
[Styles](#styles) |
[License](#license)

terminal-screen is a terminal wrapper, providing easy access without ANSI codes or dirty details.
- Manages terminal states
- Handles position, color and styling
- Supports 256 color
- No dependencies

# []()

### Installation
```bash
npm install --save terminal-screen
```

# []()

### Usage
```javascript
'use strict';

const TerminalScreen = require('../src/terminal-screen');

// initialize
const t = new TerminalScreen();

// clear screen
t.clear();

// show/hide cursor
t.setCursor(false);

// set background/foreground color
t.setBgColor('magenta');
t.setFgColor('451');

// set styles
t.setStyles(['bold', 'underline']);

// set position
t.setPosition(10, 5);

// write
t.write('Hello world!');

// shortcut methods
t.w('Goodbye world!', {
    x: 10, y: 7,
    bgColor: 'white', fgColor: 'gray3',
    styles: ['strikethrough', 'dim'],
    wrap: true
});
```

# []()

### API
#### Instance properties
```javascript
{
    // All properties are read-only and should only be changed using setter methods.

    codes:          {},              // Ansi code lookup table used for operations
    stream:         process.stdout,  // Wrapped stream
    width:          0,               // Width of stream
    height:         0,               // Height of stream
    options: {                       // Current options
        encoding:   'utf8',
        cursor:     true,
        x:          0,
        y:          0,
        bgColor:    'black',
        fgColor:    'white',
        styles:     [],
        wrap:       true,
        scroll:     true,
        lock:       false
    }
}
```

#### Instance methods
```javascript
class TerminalScreen {
    constructor(
        stream      /* WritableStream */        = process.stdout        // Stream to wrap
    ) {}
    
    // All methods return instance for chaining.
    
    setStream(
        stream      /* WritableStream */        = process.stdout,       // Stream to wrap
        force       /* boolean */               = false                 // Force change
    ) {/* Wraps given stream. */}
    
    setEncoding(
        encoding    /* string */                = 'utf8',               // Encoding to set
        force       /* boolean */               = false                 // Force change
    ) {/* Sets encoding. */}
    
    setCursor(
        cursor      /* boolean */               = true,                 // Cursor status
        force       /* boolean */               = false                 // Force change
    ) {/* Shows or hides cursor. */}
    
    setPosition(
        x           /* number */                = 0,                    // Zero-indexed X coordinate
        y           /* number */                = 0,                    // Zero-indexed Y coordinate
        force       /* boolean */               = false                 // Force change
    ) {/* Moves cursor to given position. */}
    
    setBgColor(
        color       /* string */                = 'black',              // Color name
        force       /* boolean */               = false                 // Force change
    ) {/* Sets background color to given color. */}
    
    setFgColor(
        color       /* string */                = 'white',              // Color name
        force       /* boolean */               = false                 // Force change
    ) {/* Sets foreground color to given color. */}
    
    setStyle(
        style       /* string */                = undefined,            // Style name
        value       /* boolean */               = true,                 // Style status
        force       /* boolean */               = false                 // Force change
    ) {/* Enables or disables given style. */}
    
    setStyles(
        styles      /* Array */                 = [],                   // Array of style names
        force       /* boolean */               = false                 // Force change
    ) {/* Enables only given styles. */}
    
    setWrap(
        wrap        /* boolean */               = true                  // wrap status
    ) {/* Enables or disables wrapping text to next line. */}
    
    setScroll(
        scroll      /* boolean */               = true                  // scroll status
    ) {/* Enables or disables scrolling screen when wrapping text. */}
    
    setLock(
        lock        /* boolean */               = true                  // lock status
    ) {/* Enables or disables locking cursor position. */}
    
    setOptions(
        options     /* object */                = {},                   // Key/value pairs of objects
                    /* Possible options:
                        encoding, cursor, x, y,
                        bgColor, fgColor, styles,
                        wrap, scroll, lock
                    */
        force       /* boolean */               = false                 // Force change
    ) {/* Sets multiple options at once. */}
    
    reset(
        clear       /* boolean */               = false,                // Clears screen
        color       /* string */                = 'black'               // Color name
    ) {/* Resets all settings to defaults, moves cursor to top left, optionally clears screen. */}
    
    clear(
        color       /* string */                = 'black'               // Color name
    ) {/* Clears screen. */}
    
    write(
        text        /* string */                = ''                    // Text to write
    ) {/* Writes text on current position. */}
    
    w(
        text        /* string */                = ''                    // Text to write,
        options     /* object */                = {},                   // Key/value pairs of objects
                    /* Possible options:
                        encoding, cursor, x, y,
                        bgColor, fgColor, styles,
                        wrap, scroll, lock
                    */,
        revert      /* boolean */               = false,                // Reverts options back
        force       /* boolean */               = false                 // Force change
    ) {/* Shortcut method for changing options and writing text, optionally reverting changes. */}
}
```

# []()

### Colors
Possible color values:
```javascript
[
    /* basic (8) */     'black', 'red', 'green', 'yellow',
                        'blue', 'magenta', 'cyan', 'white',

    /* bright (8) */    'brightBlack', 'brightRed', 'brightGreen', 'brightYellow',
                        'brightBlue', 'brightMagenta', 'brightCyan', 'brightWhite',

    /* gray (24) */     'gray1', /* ... */ 'gray24',

    /* rgb (216) */     '000', /* ... */ '555'
]
```

Color availability and representations might differ between systems and configurations. For maximum compatibility, only **basic** and **bright** colors should be used.

Even though there are 256 colors, it's not the usual 256 color space. On most systems, these color groups partially overlap with each other. (`'brightWhite'` == `'555'` == **#ffffff**)

![terminal-screen colors](http://i.imgur.com/1IL56NZ.png)

# []()

### Styles
Possible style values:
```javascript
[
    'bold', 'italic', 'underline', 'blink',
    'reverse', 'hidden', 'strikethrough'
]
```

Style availability depends on system. For maximum compatibility, only `'bold'`, `'underline'` and `'reverse'` should be used. Combining multiple styles causes even more compatibility problems.

# []()

### License
[MIT](https://github.com/eozan/terminal-brush/blob/master/LICENSE)
