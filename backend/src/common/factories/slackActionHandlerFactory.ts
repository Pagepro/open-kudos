import { ISlackActionBlock } from "../../controllers/definitions/slackController"
import BaseSlackActionHandler from "../slackActionHandlers/baseSlackActionHandler"
import BuyGiftSlackActionHandler from "../slackActionHandlers/buyGiftSlackActionHandler"
import DefaultSlackActionHandler from "../slackActionHandlers/defaultSlackActionHandler"
import SelectGiftPageSlackActionHandler from "../slackActionHandlers/selectGiftPageSlackActionHandler"
import { SlackActionsCallbacks } from "./definitions/slackCommandHandlerFactory"

export default class SlackActionHandlerFactory {
  constructor(private action: ISlackActionBlock) { }

  private get actionCallbackId() {
    return Object.tryGetProperty(
      this.action,
      ({ actions }) => actions[0].action_id,
      String.empty
    )
  }

  private get actionType() {
    const actionCallbackId = this.actionCallbackId.toPascalCase()
    const actionType = SlackActionsCallbacks[
      actionCallbackId as keyof typeof SlackActionsCallbacks
    ]

    return actionType
  }

  public createSlackActionHandler(): BaseSlackActionHandler {
    switch (this.actionType) {
      case SlackActionsCallbacks.BuyGift:
        return new BuyGiftSlackActionHandler(this.action)
      case SlackActionsCallbacks.SelectGiftPage:
        return new SelectGiftPageSlackActionHandler(this.action)
      default:
        return new DefaultSlackActionHandler(this.action)
    }
  }
}
