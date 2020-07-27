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
  constructor(options) {
    this.options = options || this.options;

    if (this.options.sentry.enable) {
      Sentry.init(this.options.sentry.initOptions);
    }

    this.logger = new Logger(this.options.logger);
  }

  /**
   * Removes any handlers to `uncaughtException` events.
   * @param {Error} err - Error to get information about.
   * @returns {Mixed} - Input Error object.
   */
  defaultShouldHandleError(err) {
    return err instanceof BaseError ? err : false;
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
      const eventId = await Sentry.captureException(err);
    }
  }
}