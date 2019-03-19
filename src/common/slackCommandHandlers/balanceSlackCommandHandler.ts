import { ISlackEventInfo } from "../../controllers/definitions/slackController"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class BalanceSlackCommandHandler extends BaseSlackCommandHandler {
  public eventInfo: ISlackEventInfo
  constructor(eventInfo: ISlackEventInfo) {
    super()
    this.eventInfo = eventInfo
  }

  public handleCommand(): void {
    throw new Error("Method not implemented.")
  }
}
