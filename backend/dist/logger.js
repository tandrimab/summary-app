"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const winston_1 = __importDefault(require("winston"));
// Ensure the "logs" directory exists
const logDir = path_1.default.resolve(process.cwd(), process.env.LOGS_DIR || 'logs');
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir, { recursive: true });
    console.log(`Created log directory at ${logDir}`);
}
// Winston logger
const logger = winston_1.default.createLogger({
    level: 'debug',
    format: winston_1.default.format.json(),
    defaultMeta: { service: 'summary-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or higher to `error.log`
        //   (i.e., error, fatal, but not other levels)
        //
        new winston_1.default.transports.File({
            filename: path_1.default.join(logDir, 'error.log'), level: 'error'
        }),
        //
        // - Write all logs with importance level of `info` or higher to `combined.log`
        //   (i.e., fatal, error, warn, and info, but not trace)
        //
        new winston_1.default.transports.File({
            filename: path_1.default.join(logDir, 'combined.log')
        }),
        new winston_1.default.transports.Console({})
    ],
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
// Override console methods to use Winston
console.log = (...args) => logger.info(args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' '));
console.error = (...args) => logger.error(args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' '));
console.warn = (...args) => logger.warn(args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' '));
console.info = console.log; // Alias info to log
console.debug = (...args) => logger.debug(args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' '));
console.log("Console logging overridden to use Winston");
exports.default = logger;
