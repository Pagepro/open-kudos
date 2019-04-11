import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import GiftService from "../services/gift"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class GiftsSlackCommandHandler extends
  BaseSlackCommandHandler {
  public async onHandleCommand() {

    this.sendMessage(
      this.getGiftsText(),
      this.messageConsumer,
      SlackResponseType.hidden,
      await this.getGiftsAsAttachment(this.teamId)
    )
  }

  public getGiftsText() {
    return this.translationsService.getTranslation(
      "giftsList"
    )
  }
  public async getGiftsAsAttachment(teamId: string) {
    const giftService = new GiftService()
    const allGiftsAsAttachment = await giftService
      .getAllGiftsAsAttachment(teamId)

    return allGiftsAsAttachment
  }
}
