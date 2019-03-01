import Transfer from '../models/transfer'
import { ISlackEventInfo } from './interfaces'
import { transferKudos } from '../services/kudos'
import { sendResponseMessageToSlack } from './eventResponse'
import getText from '../services/translations'
import dictionary from '../services/translations/dictionary';

export default class GiveCommandHandler {
    slackEvent: ISlackEventInfo
    points: string
    senderId: string
    receiverId: string
    fullSlackCommand: string
    channel: string
    team_id: string
    errorObject = {
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
        return Number(this.points)
    }

    get transfer() {
        return new Transfer({
            senderId: this.senderId,
            receiverId: this.validReceiverId,
            value: this.validValue,
            comment: this.getInformationWhyUserGetsPoints()
        })
    }

    getInformationWhyUserGetsPoints() {
        const wordsInCommand = this.fullSlackCommand.split(/\s+/)
        return wordsInCommand.length > 4 ?
            `${wordsInCommand.slice(4, wordsInCommand.length).join(' ')}` :
            getText(dictionary.NO_REASON);
    }

    async validate() {
        try {
            if (this.receiverId.match(/^<@.*>$/).length <= 0) {
                throw new Error(getText(dictionary.NO_RECEIVER_ERROR));
            }

            if (this.validReceiverId === this.senderId) {
                throw new Error(getText(dictionary.TRANSFER_TO_MYSELF_ERROR));
            }

            if (Number.isNaN(Number(this.points))) {
                throw new Error(getText(dictionary.NOT_VALID_AMOUNT_ERROR, { points: this.points }));
            }

            this.errorObject.isValid = true
        } catch (ex) {
            this.errorObject.isValid = false
            this.errorObject.message = ex.message
        }
    }

    async handleCommand() {
        await this.validate()
        if (this.isValid) {
            try {
                await transferKudos(this.team_id, this.transfer)
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