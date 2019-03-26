import cron from 'node-cron'
import UserService from './user'

export default class ConfigurationService {
  private userService: UserService
  public setResetKudosTask() {
    // tslint:disable-next-line:no-console
    cron.schedule('0 0 1 * *', () => {
      // tslint:disable-next-line:no-console
      console.log('cron task start')
      this.userService.resetAllUsersGiveableKudos().then(() => {
        // tslint:disable-next-line:no-console
        console.log('cron task end successful')
      })
    })
  }
}
