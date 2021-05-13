import winston from 'winston';

const myFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => `[${timestamp}] ${level}: ${stack || message}`,
);

export default winston.createLogger({
  level: 'http',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    myFormat,
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true, colors: { http: 'bold magentaBG' } })),
    }),
    new winston.transports.File({
      filename: './logs/api.log',
      level: 'error',
    }),
  ],
});
