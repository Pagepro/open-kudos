import { IGiftTransferResult } from "../../controllers/definitions/giftTransfer"
import GiftTransfer, { IGiftTransfer } from "../../models/giftTransfer.model"
import GiftService from "./gift"
import LoggerService from "./logger"
import SlackClientService from "./slackClient"
import UserService from "./user"

export default class GiftTransferService {
  private userService = new UserService()
  private giftService = new GiftService()
  private logger = new LoggerService()
  private slackClientService = new SlackClientService()

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
    } catch (error) {
      this.logger.logError(error)
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

    } catch (error) {
      this.logger.logError(error)
      return false
    }
  }

  public async getAllPaginated(
    teamId: string,
    limit?: number,
    page?: number
  ) {
    const aggregate = GiftTransfer.aggregate()
    aggregate.match({
      teamId
    })

    const members = await this.slackClientService.getWorkspaceMembers(
      teamId,
      false
    )

    const giftTransfers = await GiftTransfer.aggregatePaginate(aggregate, {
      limit,
      page,
      sort: {
        giftRequestDate: -1
      }
    })

    return {
      ...giftTransfers,
      docs: giftTransfers.docs.map(giftTransfer => ({
        ...giftTransfer,
        userName: members.find(
          member => member.userId === giftTransfer.userId
        ).name
      }))
    }
  }

  public async patchGiftTransfer (
    id: string,
    teamId: string,
    isNewStatus: boolean
  ) {
    return await GiftTransfer.findOneAndUpdate({
      _id: id,
      teamId
    }, {
      isNewStatus
    }, {
      new: true
    })
  }
}
