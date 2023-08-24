import { NODE_ENV } from '../config/server.config.js'
import winston from 'winston'

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'redBG black',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'blue',
    debug: 'cyan'
  }
}

const winstonLoggerDev = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
          return `[ ${info.level} ] ${info.message} - ${info.timestamp}`
        })
      )
    })
  ]
})

const winstonLoggerProd = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.File({
      level: "info",
      filename: 'events.log',
      format: winston.format.json()
    })
  ]
})

export let winstonLogger
if (NODE_ENV === 'production') {
  winstonLogger = winstonLoggerProd
} else {
  winstonLogger = winstonLoggerDev
}