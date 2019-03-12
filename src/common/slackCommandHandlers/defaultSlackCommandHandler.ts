import TranslationsService from "../services/translationsService"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class DefaultSlackCommandHandler extends BaseSlackCommandHandler {
  private translationsService = new TranslationsService()

  public handleCommand(): void {
    throw new Error(this.translationsService.getTranslation("iCouldntRecognizeThatCommandPleaseUseHelp"))
  }
}
