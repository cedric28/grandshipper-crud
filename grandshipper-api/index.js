const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const express = require('express');
const app = express();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/prod')(app);

// Listen to the server.
const port = process.env.PORT || 3000;
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
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

module.exports = app.listen(port, () => {
    logger.info(`Listening to port ${port}...`);
    logger.info(`Server on ${process.env.NODE_ENV} environment...`);
});