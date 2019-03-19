import TranslationsService from '../common/services/translationsService'
import Transfer, { ITransfer } from '../models/transfer.model'
import '../models/transfer.model'
import UserService from './user'

export default class TransferService {
  public static async transferPoints(transfer: ITransfer) {
    const translationsService = new TranslationsService()
    const { senderId, receiverId, value } = transfer
    try {
      const [sender, receiver] = await Promise.all([
        UserService.getUser(senderId),
        UserService.getUser(receiverId)
      ])

      if (sender.kudosGiveable >= value) {
        sender.kudosGiveable -= value
        receiver.kudosGranted += value
        receiver.kudosSpendable += value
        await sender.save()
        await receiver.save()
        await Transfer.create(transfer)
      }
      else {
        throw new Error(translationsService.getTranslation('youDontHaveEnoughKudosToTransfer'))
      }
    } catch (ex) {
      throw new Error(ex.message)
      // handle error
    }
  }
}
