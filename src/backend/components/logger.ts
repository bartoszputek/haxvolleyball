import winston, { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.prettyPrint(),
  ),
  defaultMeta: { service: 'Haxvolleyball' },
  transports: [
    new transports.File({ filename: 'logs.log' }),
  ],
});

dotenv.config();

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.prettyPrint(),
  }));
}

export default logger;
