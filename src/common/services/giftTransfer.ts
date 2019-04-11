import { IGiftTransferResult } from "../../controllers/definitions/giftTransfer"
import GiftTransfer, { IGiftTransfer } from "../../models/giftTransfer.model"
import GiftService from "./gift"
import UserService from "./user"

export default class GiftTransferService {
  private userService = new UserService()
  private giftService = new GiftService()

  public async transferGift(transfer: IGiftTransfer):
    Promise<IGiftTransferResult> {
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

      const { name, cost } = gift

      return { name, cost }
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

      return gift.amount > 0 && gift.cost <= user.kudosSpendable

    } catch (ex) {
      // TODO: Add logger here when implemented
      // tslint:disable-next-line:no-console
      console.log(ex.message)
      return false
    }
  }
}
