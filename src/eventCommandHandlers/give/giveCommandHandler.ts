import { ITransfer } from '../../models/transfer.model'
import TransferService from '../../services/transfer'
import getText from '../../services/translations'
import dictionary from '../../services/translations/dictionary'
import { sendResponseMessageToSlack } from '../eventResponse'
import { ISlackEventInfo } from '../interfaces'

export default class GiveCommandHandler {
  public slackEvent: ISlackEventInfo
  public points: string
  public senderId: string
  public receiverId: string
  public fullSlackCommand: string
  public channel: string
  public team_id: string
  public errorObject = {
    isValid: false,
    message: ''
  }

  constructor(slackEventInfo: ISlackEventInfo) {
    const { team_id } = slackEventInfo
    const { text, user, channel } = slackEventInfo.event
    const [
      _firstWord,
      _command,
      receiverId = '',
      points = ''
    ] = text.split(' ')
    this.channel = channel
    this.team_id = team_id
    this.senderId = user
    this.points = points
    this.receiverId = receiverId
    this.fullSlackCommand = text
    this.slackEvent = slackEventInfo
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

  get validValue() {
    const points = Number(this.points)
    return Number.isInteger(points) && points > 0 && points
  }

  get transfer() {
    return {
      comment: this.getInformationWhyUserGetsPoints(),
      receiverId: this.validReceiverId,
      senderId: this.senderId,
      teamId: this.team_id,
      value: this.validValue
    } as ITransfer
  }

  get isReceiverUserIdValid() {
    return (!Boolean(this.receiverId.match(/^<@.*>$/)) || this.receiverId.match(/^<@.*>$/).length <= 0)
  }

  public getInformationWhyUserGetsPoints() {
    const wordsInCommand = this.fullSlackCommand.split(/\s+/)
    return wordsInCommand.length > 4 ?
      `${wordsInCommand.slice(4, wordsInCommand.length).join(' ')}` :
      getText(dictionary.NO_REASON)
  }

  public validate() {
    try {
      if (this.isReceiverUserIdValid) {
        throw new Error(getText(dictionary.NO_RECEIVER_ERROR))
      }

      if (this.validReceiverId === this.senderId) {
        throw new Error(getText(dictionary.TRANSFER_TO_MYSELF_ERROR))
      }

      if (!this.validValue) {
        throw new Error(getText(dictionary.NOT_VALID_AMOUNT_ERROR, { points: this.points }))
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
        const message = getText(dictionary.TRANSFER_RESPONSE, {
          sender: `<@${senderId}>`,
          receiver: `<@${receiverId}>`,
          value,
          comment
        })
        sendResponseMessageToSlack(message, this.slackEvent)
      } catch (ex) {
        sendResponseMessageToSlack(ex, this.slackEvent)
      }
    } else {
      sendResponseMessageToSlack(this.errorMessage, this.slackEvent)
    }
  }
}
