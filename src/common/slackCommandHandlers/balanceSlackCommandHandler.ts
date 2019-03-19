import TransferService from "../../services/transfer"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class BalanceSlackCommandHandler extends BaseSlackCommandHandler {
  public async getBalanceInformation() {
    const balanceInformation = await TransferService.getKudosBalance(this.teamId, this.senderId)
    return balanceInformation
  }

  public async handleCommand() {
    const message = await this.getBalanceInformation()
    this.sendMessage(message, this.eventInfo)
  }
}
