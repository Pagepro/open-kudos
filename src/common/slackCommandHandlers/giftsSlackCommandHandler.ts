import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class BalanceSlackCommandHandler extends
  BaseSlackCommandHandler {
  public async onHandleCommand() {
    this.sendMessage(
      await this.getGiftsInformation(),
      this.eventInfo
    )
  }

  public getGiftsInformation() {
    return this.translationsService.getTranslation(
      "iCouldntRecognizeThatCommandPleaseUseHelp"
    )
  }
}
