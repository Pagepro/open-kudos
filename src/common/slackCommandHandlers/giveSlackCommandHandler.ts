import { ISlackEventInfo } from "../../controllers/definitions/slackController"
import { ITransfer } from "../../models/transfer.model"
import TransferService from "../../services/transfer"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class GiveSlackCommandHandler extends BaseSlackCommandHandler {
  public errorObject = {
    isValid: false,
    message: ''
  }

  constructor(eventInfo: ISlackEventInfo) {
    super()
    this.eventInfo = eventInfo
  }

  get text() {
    const { text } = this.eventInfo.event
    return text
  }

  get receiverId() {
    const { text } = this.eventInfo.event
    const [, , receiverId = '',] = text.split(' ')
    return receiverId
  }

  get senderId() {
    const { user } = this.eventInfo.event
    return user
  }

  get validReceiverId() {
    return this.receiverId.substring(2, this.receiverId.length - 1)
  }

  get isValid() {
    return this.errorObject.isValid
  }

  get errorMessage() {
    return this.errorObject.message
  }

  get teamId() {
    const { team_id } = this.eventInfo
    return team_id

  }

  get value() {
    const [, , , points = ''] = this.text.split(' ')
    return points
  }

  get validValue() {
    const [, , , points = ''] = this.text.split(' ')
    const validPoints = Number(points)
    return Number.isInteger(validPoints) && validPoints > 0 && validPoints
  }

  public getInformationWhyUserGetsPoints() {
    const wordsInCommand = this.text.split(/\s+/)
    return wordsInCommand.length > 4 ?
      `${wordsInCommand.slice(4, wordsInCommand.length).join(' ')}` :
      this.translationsService.getTranslation('forNoReason')
  }

  get transfer() {
    return {
      comment: this.getInformationWhyUserGetsPoints(),
      receiverId: this.validReceiverId,
      senderId: this.senderId,
      teamId: this.teamId,
      value: this.validValue
    } as ITransfer
  }

  get isReceiverUserIdValid() {
    return (!Boolean(this.receiverId.match(/^<@.*>$/)) || this.receiverId.match(/^<@.*>$/).length <= 0)
  }

  public validate() {
    try {
      if (this.isReceiverUserIdValid) {
        throw new Error(this.translationsService.getTranslation('couldntFindThePersonYouWantedToGivePointsTo'))
      }

      if (this.validReceiverId === this.senderId) {
        throw new Error(this.translationsService.getTranslation('youCantGivePointsToYourself'))
      }

      if (!this.validValue) {
        throw new Error(this.translationsService.getTranslation('youTriedToGiveXPointsButThisIsNotValid', this.value))
      }

      this.errorObject.isValid = true
    } catch (ex) {
      this.errorObject.isValid = false
      this.errorObject.message = ex.message
    }
  }

  public async handleCommand() {
    this.validate()
    if (this.isValid) {
      try {
        await TransferService.transferPoints(this.transfer)
        const {
          senderId,
          receiverId,
          value,
          comment
        } = this.transfer
        const message = this.translationsService.getTranslation('xGaveYZPoints', senderId, receiverId, value, comment)
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
