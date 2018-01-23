# terminal-screen

[Status](#status) |
[Installation](#installation) |
[Usage](#usage) |
[API](#api) |
[Colors](#colors) |
[Styles](#styles) |
[Notes](#notes) |
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

### API

### Instance methods

#### constructor(stream, encoding)

> Creates terminal-screen instance.
> * **stream**: WritableStream. Default: `process.stdout`
> * **encoding**: String. Default: `'utf8'`

#### setStream(stream)

> Sets stream.
> * **stream**: WritableStream. Default: `process.stdout`

#### setEncoding(encoding)

> Sets encoding.
> * **encoding**: String. Default: `'utf8'`

#### setOptions(options, force)

> Sets multiple options at a time.
> * **options**: Object. Possible keys: `wrap`, `x`, `y`, `bgColor`, `fgColor`, `cursor`, `styles`
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setWrap(wrap)

> Enables/disables wrapping at the end of the line.
> * **wrap**: Boolean.

#### setPosition(x, y, force)

> Sets cursor position.
> * **x**: Number. Default: `0`
> * **y**: Number. Default: `0`
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setX(x, force)

> Sets cursor x position.
> * **x**: Number. Default: `0`
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setY(y, force)

> Sets cursor y position.
> * **y**: Number. Default: `0`
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setBgColor(color, force)

> Sets background color. See [Colors](#colors) for more information.
> * **color**: Number.
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setFgColor(color, force)

> Sets foreground color. See [Colors](#colors) for more information.
> * **color**: Number.
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### resetBgColor(force)

> Resets background color to terminal default.
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### resetFgColor(force)

> Resets foreground color to terminal default.
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setCursor(cursor, force)

> Shows/hides cursor.
> * **cursor**: Boolean. Default: `true`
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setStyles(styles, force)

> Enables/disables multiple styles at once. See [Styles](#styles) for more information.
> * **styles**: Object. Should be structured as {styleName: styleState}
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### enableStyles(styleList, force)

> Enables multiple styles at once. See [Styles](#styles) for more information.
> * **styleList**: Array. List of style names.
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### disableStyles(styleList, force)

> Disables multiple styles at once. See [Styles](#styles) for more information.
> * **styleList**: Array. List of style names.
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### reset()

> Resets terminal and instance state.

#### clear()

> Clears terminal screen.

#### write(text)

> Writes text on terminal screen.
> * **text**: String.

#### w(text, options, revert, force)

> Shortcut method for changing options, writing text, and optionally revert options back.
> * **text**: String.
> * **options**: Object. See `setOptions` method.
> * **revert**: Boolean. Whether to revert options back after writing.
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

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

### Colors

Color availability and representations might differ between systems and configurations. For maximum compatibility, only **basic** and **bright** colors should be used.

Even though there are 256 colors, it's not the usual 256 color space. On most systems, these color groups partially overlap with each other.

# []()

### Styles

Style availability depends on system. For maximum compatibility, only **bold**, **underline** and **reverse** should be used. Combining multiple styles causes even more compatibility problems.

# []()

### Notes

# []()

### License
[MIT](https://github.com/ozanozbek/terminal-screen/blob/master/LICENSE)
