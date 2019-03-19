import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class DefaultSlackCommandHandler extends BaseSlackCommandHandler {
  public handleCommand(): void {
    const message = this.translationsService.getTranslation("iCouldntRecognizeThatCommandPleaseUseHelp")
    this.sendMessage(message, this.eventInfo)
  }
}
