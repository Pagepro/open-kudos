import cron from 'node-cron'
import UserService from './user'

export default class ConfigurationService {
  private userService: UserService
  public setResetKudosTask() {
    cron.schedule('0 0 1 * *', () => {
      // TODO: Change to logs when logger is added
      // tslint:disable-next-line:no-console
      console.log('Cron task start')
      this.userService.resetAllUsersGiveableKudos().then(() => {
        // tslint:disable-next-line:no-console
        console.log('Cron task end successful')
      })
    })
  }
}
