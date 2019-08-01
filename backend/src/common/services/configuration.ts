import cron from 'node-cron'
import LoggerService from './logger'
import SettingsService from './settings'
import UserService from './user'

export default class ConfigurationService {
  private userService = new UserService()
  private settingsService = new SettingsService()
  private logger = new LoggerService()

  public setResetKudosTask() {
    cron.schedule('0 0 1 * *', async () => {
      try {
        this.logger.logInfo('Cron task start')
        const kudosAmountForWorkspace = await this.settingsService
          .getAllTeamsKudosMonthlyAmount()

        await this.userService
          .resetAllUsersGiveableKudos(kudosAmountForWorkspace)

        this.logger.logInfo('Cron task end successful')
      } catch (error) {
        this.logger.logError(error)
      }
    })
  }
}
