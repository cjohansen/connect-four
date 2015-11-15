# Connect four

This is (not yet) an implementation of the classic game of connect four. The
rules are simple: There are two players, usually red and yellow, but any two
colors will do. The first player is chosen at random by the game. The players
take turns in placing one token in any of the available columns. If a player
manages to connect four pieces either horizontally, vertically, or diagonally,
they are victorious.

# Run it

```js
npm start
```

# Test it

```js
npm run autotest
```

# Work it

The core game logic is implemented in `src/game.js`. This file, along with
`src/ui.js` (the React UI components), is pulled into `index.js`, which
initializes the game and renders it on screen. `index.js` is built using
[browserify](https://github.com/substack/node-browserify). The result is put in
`public/connect-four.js`. The building is achieved by running `npm run watch`,
which `npm start` conveniently does for you. Keep this process running to have
the file rebuilt every time you change any of the source files.

All source and test files are passed through [babel](http://babeljs.io/),
which compiles EcmaScript 6 features into 2015-browser-friendly ES5.
