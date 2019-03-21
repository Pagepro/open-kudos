import cron from 'node-cron'
import TranslationsService from '../common/services/translationsService'
import '../models/transfer.model'
import Transfer, { ITransfer } from '../models/transfer.model'
import UserService from './user'

export default class TransferService {
  public static translationsService = new TranslationsService()
  public static async transferKudos(transfer: ITransfer) {
    const { teamId, senderId, receiverId, value } = transfer
    try {
      const [sender, receiver] = await Promise.all([
        UserService.getUser(teamId, senderId),
        UserService.getUser(teamId, receiverId)
      ])

      if (sender.kudosGiveable >= value) {
        sender.kudosGiveable -= value
        receiver.kudosGranted += value
        receiver.kudosSpendable += value
        sender.save()
        receiver.save()
        Transfer.create(transfer)
      }
      else {
        throw new Error(this.translationsService
          .getTranslation('youDontHaveEnoughKudosToTransfer'))
      }
    } catch (ex) {
      throw new Error(ex.message)
      // handle error
    }
  }

  public static async getKudosBalance(teamId: string, userId: string) {
    const user = await UserService.getUser(teamId, userId)
    return this.translationsService
      .getTranslation('kudosBalance', user.kudosGiveable, user.kudosSpendable)
  }

  public static setResetKudosTask() {
    // tslint:disable-next-line:no-console
    cron.schedule('0 0 1 * *', () => {
      // tslint:disable-next-line:no-console
      console.log('cron task start')
      UserService.resetAllUsersGiveableKudos().then(() => {
        // tslint:disable-next-line:no-console
        console.log('cron task end successful')
      })
    })
  }
}
