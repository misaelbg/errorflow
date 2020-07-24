/**
 * exception-handler.js: Object for handling uncaughtException events.
 *
 * (C) 2020 Misael Borges
 * MIT LICENCE
 */

'use strict';

const Sentry = require('@sentry/node');
const logger = require('./logger');
const { BaseError } = require('./exceptions');

/**
 * Object for handling uncaughtException events.
 * @type {ExceptionHandler}
 */
module.exports = class ExceptionHandler {
  /**
   * TODO: add contructor description
   * @param {!Config} config - TODO: add param description
   */
  constructor(config) {
    if (config.sentry.dsn) {
      Sentry.init(config.sentry);
    }

    this.logger = logger;
  }

  /**
   * Removes any handlers to `uncaughtException` events.
   * @param {Error} err - Error to get information about.
   * @returns {Mixed} - Input Error object.
   */
  isTrustedError(err) {
    if (!err instanceof BaseError) {
      return err
    }

    return false
  }

  /**
   * Create cli debug and send new alert to Sentry server.
   * @param {Error} err - Error to get information about.
   * @returns {undefined}
   */
  async handleError(err) {
    await this.logger.debug('Error message from the centralized error-handling component', err)
    await Sentry.captureException(err)
  }
}