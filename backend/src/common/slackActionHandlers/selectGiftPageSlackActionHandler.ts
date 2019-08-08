import CommonConst from "../consts/common";
import GiftService from "../services/gift"
import BaseSlackActionHandler from "./baseSlackActionHandler"
export default class SelectGiftPageSlackActionHandler
  extends BaseSlackActionHandler {
  private giftService = new GiftService()

  get pageAction() {
    const [pageClickAction] = this.action.actions
    return pageClickAction
  }

  get pageSelectedOption() {
    const { value } = this.pageAction.selected_option
    return parseInt(value)
  }

  public async onHandleAction(): Promise<void> {
    const giftsBlocks = await this.giftService
      .getAllPaginatedGiftBlocks(
        this.teamId,
        CommonConst.giftsCountPerPage,
        this.pageSelectedOption
      )

    this.sendResponse(
      this.translationsService.getTranslation(
        "giftsList"
      ),
      giftsBlocks
    )
  }
}
