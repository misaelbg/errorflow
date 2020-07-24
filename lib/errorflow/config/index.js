/**
 * index.js: Default settings.
 *
 * (C) 2020 Misael Borges
 * MIT LICENCE
 */

 'use strict';

/**
 * Export config set for the CLI.
 * @type {Object}
 */
exports.cli = {
  debug: false,
  color: 'default',
  environment: 'development'
};

/**
 * Export config set for the Sentry.
 * @type {Object}
 */
exports.sentry = {
  dsn: '',
  environment: 'development' 
};