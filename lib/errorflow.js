/**
 * errorflow.js: Top-level include defining ErrorFlowJS.
 *
 * (C) 2020 Misael Borges
 * MIT LICENCE
 */

'use strict';

/**
 * Setup to expose.
 * @type {Object}
 */
const errorflow = exports

/**
 * Expose version. Use `require` method for `webpack` support.
 * @type {string}
 */
errorflow.version = require('../package.json').version;
/**
 * Expose utility methods
 * @type {Object}
 */
errorflow.config = require('./errorflow/config');
/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */
errorflow.ErrorHandler = require('./errorflow/exception-handler');
/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */
errorflow.exceptions = require('./errorflow/exceptions');
/**
 * Expose core Logging-related prototypes.
 * @type {function}
 */
errorflow.integrations = require('./errorflow/integrations');
