import cron from 'node-cron'
import LoggerService from './logger'
import UserService from './user'
import WorkspaceService from './workspace'

export default class ConfigurationService {
  private userService = new UserService()
  private workspaceService = new WorkspaceService()
  private logger = new LoggerService()

  public setResetKudosTask() {
    cron.schedule('0 0 1 * *', async () => {
      try {
        this.logger.logInfo('Cron task start')
        const kudosAmountForWorkspace = await this.workspaceService
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
