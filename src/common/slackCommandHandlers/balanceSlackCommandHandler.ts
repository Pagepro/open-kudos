import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import TransferService from "../services/transfer"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class BalanceSlackCommandHandler extends
  BaseSlackCommandHandler {
  public async onHandleCommand() {
    this.sendMessage(
      await this.getBalanceInformation(),
      this.messageConsumer,
      SlackResponseType.hidden
    )
  }

  public getBalanceInformation() {
    const transferService = new TransferService()

    return transferService.getKudosBalance(
      this.teamId,
      this.senderId
    )
  }
}
