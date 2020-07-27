/**
 * exception-handler.js: Object for handling uncaughtException events.
 *
 * (C) 2020 Misael Borges
 * MIT LICENCE
 */

'use strict';

const Sentry = require('@sentry/node');
const Logger = require('./logger');
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
    if (config.sentry.enable) {
      Sentry.init(config.sentry.initOptions);
    }

    this.options = config;
    this.logger = new Logger(config.logger);
  }

  /**
   * Removes any handlers to `uncaughtException` events.
   * @param {Error} err - Error to get information about.
   * @returns {Mixed} - Input Error object.
   */
  isTrustedError(err) {
    return err instanceof BaseError ? err : false
  }
  
  /**
   * Create cli debug and send new alert to Sentry server.
   * @param {Error} err - Error to get information about.
   * @returns {undefined}
   */
  async handleError(err) {
    const { sentry, logger } = this.options;

    if (logger.enable) {
      await this.logger.debug(
        'Error message from the centralized error-handling component', 
        err
      );
    }
    if (sentry.enable) {
      const eventId = Sentry.captureException(err);
      console.log(eventId)
    }
  }
}