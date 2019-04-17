import { ITransfer } from "../../models/transfer.model"
import { IUser } from "../../models/user.model"
import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import TransferService from "../services/transfer"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class GiveSlackCommandHandler extends BaseSlackCommandHandler {
  private transferService = new TransferService()

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

    await this.transferService.transferKudos(this.transfer)
    this.sendMessage(
      this.getCommandResponse(),
      this.messageConsumer,
      SlackResponseType.general
    )
  }

  public getCommandResponse() {
    const { senderId, receiverId, value, comment } = this.transfer
    return this.translationsService.getTranslation(
      "xGaveYZPoints",
      senderId,
      receiverId,
      value,
      comment
    )
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

    if (await this.transferService.isKudosAmountToLow(this.transfer)) {
      throw new Error(
        this.translationsService
          .getTranslation("youDontHaveEnoughKudosToTransfer")
      )
    }

    await this.userService.handleUserIfNotExist(
      this.teamId,
      this.validReceiverId
    )
  }
}
