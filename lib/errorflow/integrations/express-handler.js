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
module.exports = class ExpressHandler {
  /**
   * TODO: add contructor description
   * @param {!Config} config - TODO: add param description
   */
  constructor(config) {
    if (!config) {
      // Loads default handler options
      config = require('../config');
    }

    this.handler = new ExceptionHandler(config);
  }
  
  /**
   * Callback method deciding whether error should be captured and sent to handler
   * @param {Error} err - Captured middleware error
   * @returns {Mixed}
   */
  handleErrors() {
    return async (err, req, res, next) => {
      let { code, message } = err;

      if (!this.handler.isTrustedError(err)) {
        // capture error and sent to handler
        await this.handler.handleError(err);
        message = 'Internal Server Error.'
        code = 500
      }

      res.status(code).json({
        status: 'error',
        statusCode: code,
        message: message
      });
    }
  }
}