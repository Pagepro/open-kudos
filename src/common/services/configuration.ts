import cron from 'node-cron'
import LoggerService from './logger'
import UserService from './user'
/* tslint:disable */
export default class ConfigurationService {
  private userService = new UserService()
  private logger = new LoggerService()
  public setResetKudosTask() {
    cron.schedule('0 0 1 * *', async () => {
      try {
        this.logger.logError('Cron task start')
        await this.userService.resetAllUsersGiveableKudos()
        this.logger.logError('Cron task end successful')
      } catch (error) {
        this.logger.logError(error)
      }
    })
  }
}
