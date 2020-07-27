/**
 * exception-handler.js: Logging error from handler.
 *
 * (C) 2020 Misael Borges
 * MIT LICENCE
 */

const winston = require('winston');

var __rest = (this && this.__rest) || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};
const isDevEnvironment = () => process.env.NODE_ENV === 'development';
const formatter = winston.format.combine(winston.format.colorize(), winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.splat(), winston.format.printf((info) => {
  const { timestamp, level, message } = info, meta = __rest(info, ["timestamp", "level", "message"]);
  return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
}));

class Logger {
  constructor(config) {
    if (!config) {
      config = require('./config');
    }

    const prodTransport = new winston.transports.File({
      filename: config.filename,
      level: config.level,
    });
    const transport = new winston.transports.Console({
      format: formatter,
    });
    this.logger = winston.createLogger({
      level: config.traceError ? 'trace' : 'error',
      levels: customLevels.levels,
      transports: [config.traceError ? transport : prodTransport],
    });
    winston.addColors(customLevels.colors);
  }
  trace(msg, meta) {
    this.logger.log('trace', msg, meta);
  }
  debug(msg, meta) {
    this.logger.debug(msg, meta);
  }
  info(msg, meta) {
    this.logger.info(msg, meta);
  }
  warn(msg, meta) {
    this.logger.warn(msg, meta);
  }
  error(msg, meta) {
    this.logger.error(msg, meta);
  }
  fatal(msg, meta) {
    this.logger.log('fatal', msg, meta);
  }
}

export default new Logger();