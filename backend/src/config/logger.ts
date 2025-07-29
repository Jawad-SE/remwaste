import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info', // or 'debug' if you want everything
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(
      ({ timestamp, level, message, stack }) =>
        `${timestamp} [${level}]: ${stack || message}`
    )
  ),
  transports: [
    new winston.transports.Console({ level: 'debug' }), // always log to console
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});
