import TransferService from "../../services/transfer"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class BalanceSlackCommandHandler extends
  BaseSlackCommandHandler {
    public getBalanceInformation() {
      return TransferService.getKudosBalance(
        this.teamId,
        this.senderId
      )
    }

    public async handleCommand() {
      this.sendMessage(
        await this.getBalanceInformation(),
        this.eventInfo
      )
    }
  }
