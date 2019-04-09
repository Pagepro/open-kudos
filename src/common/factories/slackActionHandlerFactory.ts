import { ISlackAction } from "../../controllers/definitions/slackController"
import BaseSlackActionHandler from "../slackActionHandlers/baseSlackActionHandler"
import BuyGiftSlackActionHandler from "../slackActionHandlers/buyGiftSlackActionHandler"
import DefaultSlackActionHandler from "../slackActionHandlers/defaultSlackActionHandler"
import { SlackActionsCallbacks } from "./definitions/slackCommandHandlerFactory"


export default class SlackActionHandlerFactory {
  constructor(private action: ISlackAction) { }

  private get actionCallbackId() {
    return Object.tryGetProperty(
      this.action,
      a => a.callback_id,
      String.empty
    )
  }

  private get actionType() {
    const actionCallbackId = this.actionCallbackId
    const actionType = SlackActionsCallbacks[
      actionCallbackId as keyof typeof SlackActionsCallbacks
    ]

    return actionType
  }

  public createSlackActionHandler(): BaseSlackActionHandler {
    switch (this.actionType) {
      case SlackActionsCallbacks.buyGift:
        return new BuyGiftSlackActionHandler(this.action)
      default:
        return new DefaultSlackActionHandler(this.action)
    }
  }
}
