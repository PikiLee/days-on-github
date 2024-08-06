import { createLogger, format, transports } from 'winston'
import { isDev } from './isDev'

export const logger = createLogger({
  level: isDev ? 'silly' : 'info',
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.prettyPrint({
      depth: null,
      colorize: true,
    }),
  ),
  transports: [
    new transports.Console({
      level: 'silly',
    }),
  ],
})
