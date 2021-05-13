import winston from 'winston';

const myFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => `${timestamp} ${level}: ${stack || message}`,
);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    myFormat,
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
