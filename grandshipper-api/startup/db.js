const dotenv = require('dotenv')
dotenv.config()
const connectionString = process.env.DB_CONNECTION;
const mongoose = require('mongoose');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

module.exports = () => {
    // Connect to the database server.
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
    console.log('connectionString',connectionString)
    const db = `${connectionString}`;
    
    async function connectToDatabase(db) {
        try {
            await mongoose.connect(db, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true, 
                })
                logger.info(`Connected to ${db}...`);
                

        } catch (error) {
            console.log('error',error)
            logger.error('Error connecting to the database:', error);
        }
    }

    connectToDatabase(db);
};