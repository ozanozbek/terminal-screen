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

#### constructor(stream, encoding) [^](#api-)

> Creates terminal-screen instance.
> * **stream**: WritableStream. Default: `process.stdout`
> * **encoding**: String. Default: `'utf8'`

#### setStream(stream) [^](#api-)

> Sets stream.
> * **stream**: WritableStream. Default: `process.stdout`

#### setEncoding(encoding) [^](#api-)

> Sets encoding.
> * **encoding**: String. Default: `'utf8'`

#### setOptions(options, force) [^](#api-)

> Sets multiple options at a time.
> * **options**: Object. Possible keys: `wrap`, `x`, `y`, `bgColor`, `fgColor`, `cursor`, `styles`
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setWrap(wrap) [^](#api-)

> Enables/disables wrapping at the end of the line.
> * **wrap**: Boolean. Default: `true`

#### setPosition(x, y, force) [^](#api-)

> Sets cursor position.
> * **x**: Number. Default: `0`
> * **y**: Number. Default: `0`
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setX(x, force) [^](#api-)

> Sets cursor x position.
> * **x**: Number. Default: `0`
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setY(y, force) [^](#api-)

> Sets cursor y position.
> * **y**: Number. Default: `0`
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setBgColor(color, force) [^](#api-)

> Sets background color. See [Colors](#colors) for more information.
> * **color**: Number.
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setFgColor(color, force) [^](#api-)

> Sets foreground color. See [Colors](#colors) for more information.
> * **color**: Number.
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### resetBgColor(force) [^](#api-)

> Resets background color to terminal default.
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### resetFgColor(force) [^](#api-)

> Resets foreground color to terminal default.
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setCursor(cursor, force) [^](#api-)

> Shows/hides cursor.
> * **cursor**: Boolean. Default: `true`
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### setStyles(styles, force) [^](#api-)

> Enables/disables multiple styles at once. See [Styles](#styles) for more information.
> * **styles**: Object. Should be structured as {styleName: styleState}
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### enableStyles(styleList, force) [^](#api-)

> Enables multiple styles at once. See [Styles](#styles) for more information.
> * **styleList**: Array. List of style names.
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### disableStyles(styleList, force) [^](#api-)

> Disables multiple styles at once. See [Styles](#styles) for more information.
> * **styleList**: Array. List of style names.
> * **force**: Boolean. Forces operation even if not needed. Default: `false`

#### reset() [^](#api-)

> Resets terminal and instance state.

#### clear() [^](#api-)

> Clears terminal screen.

#### write(text) [^](#api-)

> Writes text on terminal screen.
> * **text**: String.

#### w(text, options, revert, force) [^](#api-)

> Shortcut method for changing options, writing text, and optionally reverting options back.
> * **text**: String.
> * **options**: Object. See `setOptions` method.
> * **revert**: Boolean. Whether to revert options back after writing. Default: `false`
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