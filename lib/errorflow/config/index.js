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
exports.logger = {
  enable: false,
  filename: 'logs/error.log',
  level: 'error',
  traceError: true,
  color: 'default',
  environment: 'development'
};

/**
 * Export config set for the Sentry.
 * @type {Object}
 */
exports.sentry = {
  enable: false,
  initOptions: {
    dsn: '',
    environment: 'development',
  },
  defaultHandler: 'error'
};

/**
 * Export config set for the handler validator.
 * @type {Mixed}
 */
exports.shouldHandleError = null;