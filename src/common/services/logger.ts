import logger from 'heroku-logger'
import { LogMetadata } from './definitions/logMetadata'

export default class LoggerService {

  public logError(message: string, meta?: LogMetadata): void {
    logger.error(message, meta)
  }

  public logInfo(message: string, meta?: LogMetadata): void {
    logger.info(message, meta)
  }
}
