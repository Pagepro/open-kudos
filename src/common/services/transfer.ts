import '../../models/transfer.model'
import Transfer, { ITransfer } from '../../models/transfer.model'
import TranslationsService from './translationsService'
import UserService from './user'

export default class TransferService {
  private translationsService: TranslationsService
  private userService: UserService

  constructor() {
    this.translationsService = new TranslationsService()
    this.userService = new UserService()
  }

  public async transferKudos(transfer: ITransfer) {
    const { teamId, senderId, receiverId, value } = transfer

    try {
      const [sender, receiver] = await Promise.all([
        this.userService.getUser(teamId, senderId),
        this.userService.getUser(teamId, receiverId)
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

  public async getKudosBalance(teamId: string, userId: string) {
    const user = await this.userService.getUser(teamId, userId)
    return this.translationsService
      .getTranslation('kudosBalance', user.kudosGiveable, user.kudosSpendable)
  }
}
