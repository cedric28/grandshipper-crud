const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Error handling middleware.
module.exports = ((err, req, res, next) => {
    if (err) {
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
        logger.error(err.message, err);
    }

    // If an exception occurred, return 500 - Internal Server Error.
    return res.status(500).send('Something went wrong.');
});