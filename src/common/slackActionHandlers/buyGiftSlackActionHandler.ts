import { IGiftTransfer } from "../../models/giftTransfer.model"
import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import GiftTransferService from "../services/giftTransfer"
import BaseSlackActionHandler from "./baseSlackActionHandler"

export default class BuyGiftSlackActionHandler extends BaseSlackActionHandler {

  get giftId() {
    return this.action.actions[0].value
  }

  get giftName() {
    return this.action.actions[0].name
  }

  get gitTransfer(): IGiftTransfer {
    return {
      giftId: this.giftId,
      teamId: this.teamId,
      userId: this.userId
    }
  }

  public async onHandleAction(): Promise<void> {
    try {
      let message = ""
      const giftTransferService = new GiftTransferService()
      if (await giftTransferService.validateTransfer(this.gitTransfer)) {
        await giftTransferService.transferGift(this.gitTransfer)
        message = this.translationsService.getTranslation(
          "youBoughtGift",
          this.giftName
        )
      } else {
        message = this.translationsService.getTranslation(
          "youDontHaveEnoughKudosOrGiftOut"
        )
      }

      this.sendMessage(
        message,
        this.messageConsumer,
        SlackResponseType.hidden,
      )
    } catch (ex) {
      // TODO: handle log error
      // tslint:disable-next-line:no-console
      console.log(ex.message)
      // tslint:disable-next-line:no-console
      console.log(this.action)
    }
  }
}

