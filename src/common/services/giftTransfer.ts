import GiftTransfer, { IGiftTransfer } from "../../models/giftTransfer.model"
import GiftService from "./gift"
import TranslationsService from "./translationsService"
import UserService from "./user"

export default class GiftTransferService {
  private translationsService: TranslationsService
  private userService: UserService
  private giftService: GiftService

  constructor() {
    this.translationsService = new TranslationsService()
    this.userService = new UserService()
    this.giftService = new GiftService()
  }

  public async transferGift(transfer: IGiftTransfer) {
    const { userId, teamId, giftId } = transfer
    try {
      const [user, gift] = await Promise.all([
        this.userService.getUser(teamId, userId),
        this.giftService.getGiftById(teamId, giftId)
      ])
      user.kudosSpendable -= gift.cost
      gift.amount -= 1
      await Promise.all([
        user.save(),
        gift.save(),
        GiftTransfer.create(transfer)
      ])
    } catch (ex) {
      // TODO: Add logger here when implemented
      // tslint:disable-next-line:no-console
      console.log(ex.message)
      throw new Error(ex.message)
    }
  }

  public async validateTransfer(transfer: IGiftTransfer) {
    const { userId, teamId, giftId } = transfer
    try {
      const [user, gift] = await Promise.all([
        this.userService.getUser(teamId, userId),
        this.giftService.getGiftById(teamId, giftId)
      ])
      if (gift.amount > 0 && gift.cost <= user.kudosSpendable) {
        return true
      } else {
        return false
      }
    } catch (ex) {
      // TODO: Add logger here when implemented
      // tslint:disable-next-line:no-console
      console.log(ex.message)
      return false
    }
  }

}
