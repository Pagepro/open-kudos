import { IMessageConsumer } from "../../controllers/definitions/slackController"
import { IGiftTransfer } from "../../models/giftTransfer.model"
import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import GiftTransferService from "../services/giftTransfer"
import LoggerService from "../services/logger"
import BaseSlackActionHandler from "./baseSlackActionHandler"

export default class BuyGiftSlackActionHandler extends BaseSlackActionHandler {
  private giftTransferService = new GiftTransferService()
  get giftAction() {
    const [giftClickAction] = this.action.actions
    return giftClickAction
  }

  get giftId() {
    return this.giftAction.value
  }

  get giftTransfer(): IGiftTransfer {
    return {
      giftId: this.giftId,
      teamId: this.teamId,
      userId: this.userId
    }
  }

  public async validate(): Promise<void> {
    const giftInStockAndUserHasKudos =
      await this.giftTransferService.validateTransfer(this.giftTransfer)

    if (!giftInStockAndUserHasKudos) {
      throw new Error(
        this.translationsService.getTranslation(
          "youDontHaveEnoughKudosOrGiftOut"
        )
      )
    }
  }

  public async onHandleAction(): Promise<void> {
    const { name, cost } = await this.giftTransferService
      .transferGift(this.giftTransfer)

    this.sendResponse(this.translationsService
      .getTranslation(
        "notifyAdminNewGiftPurchase",
        this.userId,
        name,
        cost
      ))

    const admin = await this.userService.getAdmin(this.teamId)

    if (admin) {
      const { userId } = admin
      const channelId = await this.slackClientService.getKudosBotChannelId(
        this.teamId,
        userId
      )
      const messageConsumer: IMessageConsumer = {
        channel: channelId,
        teamId: this.teamId,
        user: userId,
      }

      this.sendMessage(
        this.translationsService.getTranslation(
          "notifyAdminNewGiftPurchase",
          this.userId,
          name,
          cost
        ),
        messageConsumer,
        SlackResponseType.Hidden
      )
    }
  }
}
