import { IMessageConsumer } from "../../controllers/definitions/slackController"
import { IGiftTransfer } from "../../models/giftTransfer.model"
import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import GiftTransferService from "../services/giftTransfer"
import LoggerService from "../services/logger"
import SettingsService from "../services/settings"
import BaseSlackActionHandler from "./baseSlackActionHandler"

export default class BuyGiftSlackActionHandler extends BaseSlackActionHandler {
  private giftTransferService = new GiftTransferService()
  private settingsService = new SettingsService()

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

    const adminId =
      await this.settingsService.getGiftRequestsReceiver(this.teamId)

    if (adminId) {
      const messageConsumer: IMessageConsumer = {
        channel: adminId,
        teamId: this.teamId,
        user: adminId,
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
