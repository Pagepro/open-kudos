import cron from 'node-cron'
import UserService from './user'
/* tslint:disable */
export default class ConfigurationService {
  private userService = new UserService()
  public setResetKudosTask() {
    cron.schedule('0 0 1 * *', async () => {
      // TODO: Change to logs when logger is added
      try {
        console.log('Cron task start')
        await this.userService.resetAllUsersGiveableKudos()
        console.log('Cron task end successful')
      } catch ({ message }) {
        console.log(message)
      }
    })
  }
}
