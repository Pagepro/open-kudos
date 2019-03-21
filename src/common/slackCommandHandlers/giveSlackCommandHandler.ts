
import TransferService from "../../services/transfer"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class GiveSlackCommandHandler extends BaseSlackCommandHandler {
  public validate() {
    try {
      if (this.isReceiverUserIdInvalid) {
        throw new Error(this.translationsService
          .getTranslation('couldntFindThePersonYouWantedToGivePointsTo'))
      }

      if (this.validReceiverId === this.senderId) {
        throw new Error(this.translationsService
          .getTranslation('youCantGivePointsToYourself'))
      }

      if (!this.validValue) {
        throw new Error(this.translationsService
          .getTranslation('youTriedToGiveXPointsButThisIsNotValid', this.value))
      }

      this.errorObject.isValid = true
    } catch (ex) {
      this.errorObject.isValid = false
      this.errorObject.message = ex.message
    }
  }

  public handleCommand() {
    this.validate()
    if (this.isValid) {
      try {
        TransferService.transferKudos(this.transfer)
        const {
          senderId,
          receiverId,
          value,
          comment
        } = this.transfer
        const message = this.translationsService
          .getTranslation('xGaveYZPoints', senderId, receiverId, value, comment)
        this.sendMessage(message, this.eventInfo)
      } catch (ex) {
        // handle and log error
        this.sendMessage(ex.message, this.eventInfo)
      }
    } else {
      this.sendMessage(this.errorMessage, this.eventInfo)
    }
  }
}
