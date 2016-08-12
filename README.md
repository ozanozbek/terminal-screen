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
codes
stream
width
height
options
```

#### Instance methods
```javascript
constructor(stream)
setStream(stream, force)
setEncoding(encoding, force)
setCursor(cursor, force)
setPosition(x, y, force)
setBgColor(color, force)
setFgColor(color, force)
setStyle(style, value, force)
setStyles(styles, force)
setWrap(wrap, force)
setScroll(scroll, force)
setLock(lock, force)
setOptions(options, force)
reset(clear, color)
clear(color)
write(text)
w(text, options, revert, force)
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

Style availability depends on system. For maximum compatibility, only `'bold'`, `'underline'` and `'reverse'` should be used. Combining multiple styles causes even more compatibility problems and should be done carefully.

# []()

### License
[MIT](https://github.com/eozan/terminal-brush/blob/master/LICENSE)
