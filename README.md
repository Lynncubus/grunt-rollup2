# Grunt rollup

**Disclaimer:** I personally do not use grunt as much anymore so new features will most likely not be implemented. I'm open to resolve any bugs / issues though.

A Rollup task for grunt with the ability to create multiple bundles.

This is not a fork of [grunt-rollup](https://github.com/chrisprice/grunt-rollup), but is inspired by it.

## Task reference

### `options.rollup`

The Rollup module itself. This task has a peer dependency to Rollup, so you have to install it yourself. This makes the task non-dependent of a Rollup version and more flexible for future Rollup versions.

### `options.bundles`

An array of objects which define your bundles.

### `options.bundles[].input`

Input options for your Rollup bundle. You can find a reference of all the available options here: https://rollupjs.org/guide/en#inputoptions

The only difference here is that `options.bundle[].input.plugins` options should be a function that returns an array. Many plugins for Rollup are stateful and we don't want that when we are building multiple bundles.

### `options.bundles[].output`

Output options for your Rollup bundle. You can find a reference of all the available options here: https://rollupjs.org/guide/en#outputoptions

## Usage

```js
// Gruntfile.js

const rollup = require('rollup')
const babel = require('rollup-plugin-babel')

module.exports = function(grunt) {
  grunt.initConfig({
    rollup: {
      prod: {
        options: {
          bundles: [
            {
              input: {
                input: 'src/index.js'
                plugins: () => [
                  babel()
                ],
              },
              output: {
                file: 'dist/build.js'
              }
            }
          ],
          rollup: rollup,
        },
      },
    },
  });
};
```

## Roadmap

- [x] Multiple bundles

- [ ] Tests

- [ ] Watch task efficiency. Only rebuild the bundle that got changed.

  The task currently rebuilds every bundle on a reload in any watch task, the ability to only rebuild the bundle that actually got changed would be a nice performance boost. I currently personally use `https://github.com/gruntjs/grunt-contrib-watch` for watch tasks, but i'd love to hear from different options.
