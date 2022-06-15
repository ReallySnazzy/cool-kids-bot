const winston = require("winston");

let logger;

if (process.env.DEBUG != '0') {
    logger = winston.createLogger(
        {
            transports: [
                new winston.transports.Console(
                    { 
                        level: 'debug',
                        format: winston.format.combine(
                            winston.format.timestamp(),
                            winston.format.json(),
                        )
                    }
                ),
            ]
        }
    ); 
} else {
    logger = winston.createLogger(
        {
            transports: [
                new winston.transports.Console(
                    { 
                        level: 'info',
                        format: winston.format.combine(
                            winston.format.timestamp(),
                            winston.format.json(),
                        )
                    }
                ),
            ]
        }
    ); 
}

module.exports = logger;