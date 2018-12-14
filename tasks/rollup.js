/**
 * Creates a task for rollup related build steps.
 * */
module.exports = function(grunt) {
  grunt.registerMultiTask('rollup', 'Grunt plugin for rollup', function() {
    const done = this.async();

    const options = this.options({
      rollup: {
        rollup: async () => {
          throw new Error('Rollup should be given as an external depencency');
        },
      },
      bundles: [],
    });

    const rollup = options.rollup;

    const promises = options.bundles.map(bundleOptions => {
      const inputOptions = bundleOptions.input;
      inputOptions.plugins =
        typeof bundleOptions.input.plugins === 'function'
          ? bundleOptions.input.plugins()
          : [];

      const outputOptions = bundleOptions.output;

      return rollup
        .rollup(inputOptions)
        .then(bundle => bundle.write(outputOptions))
        .then(() => {
          grunt.log.writeln(`Created bundle ${outputOptions.file}`);
        });
    });

    Promise.all(promises)
      .then(() => done())
      .catch(error => grunt.fail.warn(error));
  });
};
