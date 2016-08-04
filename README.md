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
t.hideCursor();

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

#### Properties
```javascript
{
    codes       /*object*/,                             // Lookup table of ANSI codes
    stream      /*WritableStream*/,                     // Wrapped stream
    encoding    /*string*/,                             // Encoding
    width       /*number*/,                             // Screen width
    height      /*number*/,                             // Screen height
    cursor      /*boolean*/,                            // Current cursor visibility
    position    /*object*/,                             // Current cursor position {x, y} 
    bgColor     /*string*/,                             // Current background color
    fgColor     /*string*/,                             // Current foreground color
    styles      /*object*/                              // Current styles {bold, dim, italic, underline, blink, reverse, hidden, strikethrough}
}
```

#### Methods
```javascript
constructor(
    stream      /*WritableStream*/  = process.stdout,  // Output stream
    encoding    /*string*/          = 'utf8'           // Encoding to set the stream to
)
```

```javascript
setStream(      // Sets stream, resets all settings.
    stream      /*WritableStream*/  = process.stdout,   // Output stream
    force       /*boolean*/         = false             // Forces change even if it is not needed
)
```

```javascript
setEncoding(    // Sets encoding of current stream.
    encoding    /*string*/          = 'utf8',           // Encoding to set the stream to
    force       /*boolean*/         = false             // Forces change even if it is not needed
)
```

```javascript
reset(          // Resets all position, color and style settings.
    force       /*boolean*/         = false             // Forces change even if it is not needed
)
```

```javascript
clear(          // Clears screen.
    bgColor     /*string*/          = 'black'           // Color name
)
```

```javascript
showCursor(     // Shows cursor.
    force       /*boolean*/         = false             // Forces change even if it is not needed
)
```

```javascript
hideCursor(     // Hides cursor.
    force       /*boolean*/         = false             // Forces change even if it is not needed
)
```

```javascript
setPosition(    // Sets cursor position.
    x           /*number*/          = 0,                // Zero-indexed X coordinate
    y           /*number*/          = 0,                // Zero-indexed Y coordinate
    force       /*boolean*/         = false             // Forces change even if it is not needed
)
```

```javascript
setBgColor(     // Sets background color.
    color       /*string*/          = 'black',          // Color name
    force       /*boolean*/         = false             // Forces change even if it is not needed
)
```

```javascript
setFgColor(     // Sets foreground color.
    color       /*string*/          = 'white',          // Color name
    force       /*boolean*/         = false             // Forces change even if it is not needed
)
```

```javascript
setStyle(       // Enables/disables a style.
    style       /*string*/          = undefined,        // Style name
    value       /*boolean*/         = true,             // Value to set the style to
    force       /*boolean*/         = false             // Forces change even if it is not needed
)
```

```javascript
setStyles(      // Disables all styles, enables only given ones.
    styles      /*array*/          = [],                // Style names
    force       /*boolean*/        = false              // Forces change even if it is not needed
)
```

```javascript
resetStyles(    // Resets all styles.
)
```

```javascript
setAll(         // Sets position, colors and styles.
    options     /*object*/          = {},               // Container with x, y, bgColor, fgColor, styles keys
    force       /*boolean*/         = false             // Forces change even if it is not needed
)
```

```javascript
write(          // Writes text to screen.
    text        /*string*/          = '',               // Text to write
    wrap        /*boolean*/         = false,            // Enables/disables wrapping
    scroll      /*boolean*/         = false             // Enables/disables scrolling
)
```

```javascript
put(            // Writes text to screen. Does not change cursor position.
    text        /*string*/          = '',               // Text to write
    wrap        /*boolean*/         = false,            // Enables/disables wrapping
    scroll      /*boolean*/         = false             // Enables/disables scrolling
)
```

```javascript
w(              // Shortcut method for changing all settings and then writing text.
    text        /*string*/          = '',               // Text to write
    options     /*object*/          = {},               // Container with x, y, bgColor, fgColor, styles, wrap and scroll keys
    force       /*boolean*/         = false             // Forces change even if it is not needed
)
```

```javascript
p(              // Shortcut method for changing all settings and then putting text.
    text        /*string*/          = '',               // Text to write
    options     /*object*/          = {},               // Container with x, y, bgColor, fgColor, styles, wrap and scroll keys
    force       /*boolean*/         = false             // Forces change even if it is not needed
)
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

Style availability depends on system. For maximum compatibility, only `'bold'`, `'underline'` and `'reverse'` should be used. Combining multiple styles poses another compatibility problem and should be done carefully.

# []()

### License
[MIT](https://github.com/eozan/terminal-brush/blob/master/LICENSE)
