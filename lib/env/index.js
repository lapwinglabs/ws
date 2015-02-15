/**
 * Module Dependencies
 */

var join = require('path').join;
var envvar = require('envvar');
var env = require('with-env');

/**
 * Root
 */

var root = join(__dirname, '..', '..');

/**
 * Production
 */

var production = 'production' == process.env.NODE_ENV;

/**
 * Export `env`
 */

module.exports = (function () {
  if (production) return;

  // load
  env();

  // ensure
  envvar.string('PORT');
  envvar.string('REDIS_URL');

})();
