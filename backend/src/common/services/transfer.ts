import '../../models/transfer.model'
import Transfer, { ITransfer } from '../../models/transfer.model'
import LoggerService from './logger'
import TranslationsService from './translationsService'
import UserService from './user'

export default class TransferService {
  private translationsService = new TranslationsService()
  private userService = new UserService()
  private logger = new LoggerService()

  public async transferKudos(transfer: ITransfer) {
    const { teamId, senderId, receiverId, value } = transfer

    try {
      const [sender, receiver] = await Promise.all([
        this.userService.getUser(teamId, senderId),
        this.userService.getUser(teamId, receiverId)
      ])

      sender.kudosGiveable -= value
      receiver.kudosGranted += value
      receiver.kudosSpendable += value

      await Promise.all([
        sender.save(),
        receiver.save(),
        Transfer.create(transfer)
      ])

    } catch (error) {
      this.logger.logError(error)
    }
  }

  public async isKudosAmountToLow(transfer: ITransfer) {
    const { teamId, senderId, value } = transfer
    try {
      const sender = await this.userService.getUser(teamId, senderId)
      return sender.kudosGiveable < value
    } catch (error) {
      this.logger.logError(error)
    }
  }

  public async getKudosBalance(teamId: string, userId: string) {
    const {
      kudosGiveable,
      kudosSpendable
    } = await this.userService.getUser(teamId, userId)

    return this.translationsService.getTranslation(
      'kudosBalance',
      kudosGiveable,
      kudosSpendable
    )
  }
}
