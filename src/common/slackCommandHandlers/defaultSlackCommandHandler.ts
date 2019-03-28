import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class DefaultSlackCommandHandler
  extends BaseSlackCommandHandler {
    public onHandleCommand(): void {
      this.sendMessage(
        this.translationsService.getTranslation(
          "iCouldntRecognizeThatCommandPleaseUseHelp"
        ),
        this.eventInfo
      )
    }
  }
