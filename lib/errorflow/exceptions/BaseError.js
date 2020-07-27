/**
 * index.js: Default settings.
 *
 * (C) 2020 Misael Borges
 * MIT LICENCE
 */

 'use strict';

module.exports = class BaseError extends Error {
  /**
   * TODO: add contructor description
   * @param {!StatusCode} statusCode - TODO: add param description
   * @param {!Message} message - TODO: add param description
   */
  constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
  }
}