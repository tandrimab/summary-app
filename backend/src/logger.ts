import 'dotenv/config';
import path from "path";
import fs from "fs";
import winston from "winston";

// Ensure the "logs" directory exists
const logDir = path.resolve(process.cwd(), process.env.LOGS_DIR || 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
  console.log(`Created log directory at ${logDir}`);
}

// Winston logger
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    defaultMeta: { service: 'summary-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or higher to `error.log`
        //   (i.e., error, fatal, but not other levels)
        //
        new winston.transports.File({
            filename: path.join(logDir, 'error.log'), level: 'error'
        }),
        //
        // - Write all logs with importance level of `info` or higher to `combined.log`
        //   (i.e., fatal, error, warn, and info, but not trace)
        //
        new winston.transports.File({
            filename: path.join(logDir, 'combined.log')
        }),

        new winston.transports.Console({})
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// Override console methods to use Winston
console.log = (...args) => logger.info(args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' '));
console.error = (...args) => logger.error(args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' '));
console.warn = (...args) => logger.warn(args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' '));
console.info = console.log; // Alias info to log
console.debug = (...args) => logger.debug(args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' '));

console.log("Console logging overridden to use Winston");

export default logger;