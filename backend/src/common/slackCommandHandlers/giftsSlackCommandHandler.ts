import CommonConst from "../consts/common"
import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import GiftService from "../services/gift"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class GiftsSlackCommandHandler extends
  BaseSlackCommandHandler {
  private giftService = new GiftService()
  public async onHandleCommand() {
    this.sendMessage(
      this.getGiftsText(),
      await this.getMessageConsumer(),
      SlackResponseType.Hidden,
      await this.getGiftsAsBlocks(this.teamId)
    )
  }

  public getGiftsText() {
    return this.translationsService.getTranslation(
      "giftsList"
    )
  }

  public async getGiftsAsBlocks(teamId: string) {
    const paginatedGiftAsBlocks = await this.giftService
      .getAllPaginatedGiftBlocks(
        teamId,
        CommonConst.giftsCountPerPage,
        CommonConst.firstPageNumber
      )

    return paginatedGiftAsBlocks
  }
}
