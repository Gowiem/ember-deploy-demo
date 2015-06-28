/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var env = EmberApp.env()|| 'development';
var isProductionLikeBuild = ['production', 'staging'].indexOf(env) > -1;

var fingerprintOptions = {
    enabled: true,
    extensions: ['js', 'css', 'png', 'jpg', 'gif']
};

switch (env) {
  case 'development':
    fingerprintOptions.prepend = 'http://localhost:4200/';
  break;
  case 'staging':
    fingerprintOptions.prepend = 'TODO';
  break;
  case 'production':
    fingerprintOptions.prepend = 'https://d34ffs4dj251fe.cloudfront.net/';
  break;
}

var app = new EmberApp({
  fingerprint: fingerprintOptions,

  sourcemaps: {
    enabled: !isProductionLikeBuild,
  },
  minifyCSS: { enabled: isProductionLikeBuild },
  minifyJS: { enabled: isProductionLikeBuild },

  tests: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild,
  hinting: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

module.exports = app.toTree();