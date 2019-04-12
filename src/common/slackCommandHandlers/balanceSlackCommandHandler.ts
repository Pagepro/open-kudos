import TransferService from "../services/transfer"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class BalanceSlackCommandHandler extends
  BaseSlackCommandHandler {
  public async onHandleCommand() {
    this.sendMessage(
      await this.getBalanceInformation(),
      this.messageConsumer
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
