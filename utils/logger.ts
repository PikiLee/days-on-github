import { createLogger, format, transports } from 'winston'
import { isDev } from './isDev'

export const logger = createLogger({
  level: isDev ? 'silly' : 'info',
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.prettyPrint({
      depth: null,
      colorize: true
    })
  ),
  transports: isDev
    ? [
        // If we're not in production then log to the `console` with the format
        new transports.Console({
          level: 'debug'
        })
      ]
    : [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({
          filename: '/var/log/server/error.log',
          level: 'error'
        }),
        new transports.File({
          filename: '/var/log/server/combined.log',
          level: 'info'
        })
      ]
})
