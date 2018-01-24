# terminal-screen

[Installation](#installation-) |
[Usage](#usage-) |
[API](#api-) |
[Colors](#colors-) |
[Styles](#styles-) |
[Notes](#notes-) |
[License](#license-)

terminal-screen is a terminal wrapper, providing easy access without ANSI codes or dirty details.
- Manages terminal states
- Handles position, color and styling
- Supports 256 color
- No dependencies

# []()

### Installation [^](#terminal-screen)
```bash
npm install --save terminal-screen
```

# []()

### Usage [^](#terminal-screen)
```javascript
'use strict';

const TerminalScreen = require('terminal-screen');

// initialize
const t = new TerminalScreen();

// clear screen
t.clear();

// show/hide cursor
t.setCursor(false);

// set background/foreground color
t.setBgColor(t.colors.basic.magenta);
t.setFgColor(t.colors.rgb6(4, 5, 1));

// set styles
t.setStyles({bold: true, underline: true});

// set position
t.setPosition(10, 5);

// write
t.write('Hello world!');

// shortcut methods
t.w('Goodbye world!', {
    x: 10, y: 7,
    bgColor: t.colors.basic.white,
    fgColor: t.colors.gray[3],
    styles: ['strikethrough', 'dim'],
    wrap: true
});
```

# []()

### API [^](#terminal-screen)

### Instance methods

#### constructor(stream, encoding)

> Creates terminal-screen instance.

#### setStream(stream)

> Sets stream.

#### setEncoding(encoding)

> Sets encoding.

#### setOptions(options, force)

> Sets multiple options at a time.

#### setWrap(wrap)

> Enables/disables wrapping at the end of the line.

#### setPosition(x, y, force)

> Sets cursor position.

#### setX(x, force)

> Sets cursor x position.

#### setY(y, force)

> Sets cursor y position.

#### setBgColor(color, force)

> Sets background color. See [Colors](#colors) for more information.

#### setFgColor(color, force)

> Sets foreground color. See [Colors](#colors) for more information.

#### resetBgColor(force)

> Resets background color to terminal default.

#### resetFgColor(force)

> Resets foreground color to terminal default.

#### setCursor(cursor, force)

> Shows/hides cursor.

#### setStyles(styles, force)

> Enables/disables multiple styles at once. See [Styles](#styles) for more information.

#### enableStyles(styleList, force)

> Enables multiple styles at once. See [Styles](#styles) for more information.

#### disableStyles(styleList, force)

> Disables multiple styles at once. See [Styles](#styles) for more information.

#### reset()

> Resets terminal and instance state.

#### clear()

> Clears terminal screen.

#### write(text)

> Writes text on terminal screen.

#### w(text, options, revert, force)

> Shortcut method for changing options, writing text, and optionally reverting options back.

**Parameters**
###### stream: WritableStream. Default: `process.stdout`
###### encoding: String. Default: `'utf8'`
###### options: Object. Possible keys: `wrap`, `x`, `y`, `bgColor`, `fgColor`, `cursor`, `styles`
###### wrap: Boolean. Default: `true`
###### x: Number. Default: `0`
###### y: Number. Default: `0`
###### color: Number.
###### cursor: Boolean. Default: `true`
###### styles: Object. Should be structured as {styleName: styleState}
###### styleList: Array. List of style names.
###### text: String.
###### revert: Boolean. Whether to revert options back after writing. Default: `false`
###### force: Boolean. Forces operation even if not needed. Default: `false`

### Instance properties

#### stream
#### encoding
#### width
#### height
#### state

### Helper objects

Helper objects can be accessed on either instance properties or class properties.

#### writer
#### colors
#### codes

# []()

### Colors [^](#terminal-screen)

Color availability and representations might differ between systems and configurations. For maximum compatibility, only **basic** and **bright** colors should be used.

Even though there are 256 colors, it's not the usual 256 color space. On most systems, these color groups partially overlap with each other.

# []()

### Styles [^](#terminal-screen)

Style availability depends on system. For maximum compatibility, only **bold**, **underline** and **reverse** should be used. Combining multiple styles causes even more compatibility problems.

# []()

### Notes [^](#terminal-screen)

# []()

### License [^](#terminal-screen)
[MIT](https://github.com/ozanozbek/terminal-screen/blob/master/LICENSE)
