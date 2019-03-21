import { ISlackEventInfo } from "../../controllers/definitions/slackController"
import { ITransfer } from "../../models/transfer.model"
import SlackClientService from "../../services/slackClient"
import TranslationsService from "../services/translationsService"

abstract class BaseSlackCommandHandler {
  protected translationsService = new TranslationsService()
  protected errorObject = {
    isValid: false,
    message: ''
  }

  constructor(protected eventInfo: ISlackEventInfo) { }

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

  get transfer(): ITransfer {
    return {
      comment: this.getInformationWhyUserGetsPoints(),
      receiverId: this.validReceiverId,
      senderId: this.senderId,
      teamId: this.teamId,
      value: this.validValue
    }
  }

  get isReceiverUserIdInvalid() {
    const receiverIdRegexMatches = this.receiverId.match(/^<@.*>$/)

    return !receiverIdRegexMatches
  }

  public sendMessage(text: string, eventInfo: ISlackEventInfo): void {
    SlackClientService.sendMessage(text, eventInfo)
  }
  public abstract handleCommand(): void
}

export default BaseSlackCommandHandler
