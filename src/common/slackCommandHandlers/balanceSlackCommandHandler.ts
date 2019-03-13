import { ISlackEventInfo } from "../../controllers/definitions/slackController"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class BalanceSlackCommandHandler extends BaseSlackCommandHandler {
  constructor(private eventInfo: ISlackEventInfo) {
    super()
  }

  public handleCommand(): void {
    throw new Error("Method not implemented.")
  }
}
