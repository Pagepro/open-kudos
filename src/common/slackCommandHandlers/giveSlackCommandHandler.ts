import { ITransfer } from "../../models/transfer.model"
import TransferService from "../services/transfer"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class GiveSlackCommandHandler extends BaseSlackCommandHandler {
  get transactionComment() {
    const wordsInCommand = this.eventText.split(" ")
    return wordsInCommand.length > 4
      ? `${wordsInCommand.slice(4, wordsInCommand.length).join(" ")}`
      : this.translationsService.getTranslation("forNoReason")
  }

  get receiverId() {
    const [, , receiverId = String.empty] = this.eventText.split(" ")

    return receiverId
  }

  get validReceiverId() {
    return this.receiverId.substring(2, this.receiverId.length - 1)
  }

  get transferKudosCount() {
    const [, , , points = String.empty] = this.eventText.split(" ")

    return points
  }

  get validTransferKudosCount() {
    const [, , , points = String.empty] = this.eventText.split(" ")
    const validPoints = Number(points)

    return Number.isInteger(validPoints) && validPoints > 0 && validPoints
  }

  get isReceiverUserIdInvalid() {
    const receiverIdRegexMatches = this.receiverId.match(/^<@.*>$/)

    return !receiverIdRegexMatches
  }

  get transfer(): ITransfer {
    return {
      comment: this.transactionComment,
      receiverId: this.validReceiverId,
      senderId: this.senderId,
      teamId: this.teamId,
      value: this.validTransferKudosCount
    }
  }

  public async onHandleCommand() {
    try {
      const { senderId, receiverId, value, comment } = this.transfer

      const transferService = new TransferService()
      await transferService.transferKudos(this.transfer)

      const message = this.translationsService.getTranslation(
        "xGaveYZPoints",
        senderId,
        receiverId,
        value,
        comment
      )

      this.sendMessage(message, this.eventInfo)
    } catch (ex) {
      // TODO: handle log error
      // tslint:disable-next-line:no-console
      console.log(ex.message)
      // tslint:disable-next-line:no-console
      console.log(this.eventInfo)
    }
  }

  protected async validate() {
    if (this.isReceiverUserIdInvalid) {
      throw new Error(
        this.translationsService.getTranslation(
          "couldntFindThePersonYouWantedToGivePointsTo"
        )
      )
    }

    if (this.validReceiverId === this.senderId) {
      throw new Error(
        this.translationsService.getTranslation("youCantGivePointsToYourself")
      )
    }

    if (!this.validTransferKudosCount) {
      throw new Error(
        this.translationsService.getTranslation(
          "youTriedToGiveXPointsButThisIsNotValid",
          this.transferKudosCount
        )
      )
    }
  }
}
