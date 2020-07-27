/**
 * express-handler.js: Object for `node-express` handling middleware.
 *
 * (C) 2020 Misael Borges
 * MIT LICENCE
 */

'use strict';

const ExceptionHandler = require('../exception-handler');

/**
 * Object for handling `node-express` uncaughtException events.
 * @type {ExpressHandler}
 */
module.exports = class ExpressHandler extends ExceptionHandler {
  /**
   * TODO: add contructor description
   * @param {!Config} config - TODO: add param description
   */
  constructor(config) {
    super(config);
    if (!config) {
      // Loads default handler options
      config = require('../config');
    }

    this.options = config;
  }
  
  /**
   * Callback method deciding whether error should be captured and sent to handler
   * @param {Error} err - Captured middleware error
   * @returns {Mixed}
   */
  handleErrors() {
    return async (err, req, res, next) => {
      const shouldHandleError = this.options.shouldHandleError || this.defaultShouldHandleError;
      let { statusCode, message } = err;

      if (!shouldHandleError(err)) {
        // capture error and sent to handler
        await this.handleError(err);
        message = 'Internal Server Error.';
        statusCode = 500;
      } else if(!statusCode) {
        statusCode = 500;
      }

      res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: message
      });
    }
  }
}