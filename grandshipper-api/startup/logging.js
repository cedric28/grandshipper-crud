const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
require('express-async-errors');

module.exports = () => {
    // Set winston logger.
    const myFormat = printf(({ level, message, timestamp, ...meta }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message} ${meta}`;
      });
    
    const logger = createLogger({
        format: combine(
            timestamp(),
            myFormat
        ),
        transports: [
            new transports.Console(),  // Output logs to console
            new transports.File({ filename: 'logfile.log' })  // Output logs to a file
        ]
    });

    // Subscribe to catch any exception in the application.
    process.on('uncaughtException', (err) => {
        logger.error(err.message, err);
        process.exit(1);
    });

    // Subscribe to catch any promise rejection in the application.
    process.on('unhandledRejection', (err) => {
        throw (err);
    });
};