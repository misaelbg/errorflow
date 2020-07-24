/**
 * express-handler.js: Object for `node-express` handling middleware.
 *
 * (C) 2020 Misael Borges
 * MIT LICENCE
 */

'use strict';

const Sentry = require('@sentry/node');
const ExceptionHandler = require('./exception-handler');

/**
 * Object for handling `node-express` uncaughtException events.
 * @type {ExpressHandler}
 */
module.exports = class ExpressHandler {
  /**
   * TODO: add contructor description
   * @param {!Config} config - TODO: add param description
   */
  constructor(config) {
    if (!config) {
      // Loads default handler options
      const config = require('./config');
    }

    this.options = config;
    this.handler = new ExceptionHandler(this.options);
  }
  
  /**
   * Callback method deciding whether error should be captured and sent to handler
   * @param {Error} err - Captured middleware error
   * @returns {Mixed}
   */
  async handleErrors(err, req, res, next) {
    const { statusCode, message } = err;

    if (!this.handler.isTrustedError(err)) {
      res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: message
      }); 
    } else {
      await this.handler.handleError(err);
      res.status(500).json({
        status: 'error',
        statusCode: statusCode,
        message: 'Internal Server Error.'
      });
    }
  }
}