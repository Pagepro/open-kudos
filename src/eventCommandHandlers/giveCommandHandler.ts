import Transfer from '../models/transfer';
import { ISlackEventInfo } from './interfaces';
import { transferKudos } from '../services/kudos';
import { sendResponseMessageToSlack } from './eventResponse';

export default class GiveCommandHandler {
    slackEvent: ISlackEventInfo
    points: string
    giverId: string
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
        this.giverId = user
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
            senderId: this.giverId,
            receiverId: this.validReceiverId,
            value: this.validValue,
            comment: this.getInformationWhyUserGetsPoints()
        })
    }

    get isReceiverUserIdValid() {
        return (!Boolean(this.receiverId.match(/^<@.*>$/)) || this.receiverId.match(/^<@.*>$/).length <= 0)
    }

    getInformationWhyUserGetsPoints() {
        const wordsInCommand = this.fullSlackCommand.split(/\s+/)
        return wordsInCommand.length > 4 ?
            `<@${this.giverId}> give ${this.receiverId} ${this.points} ${wordsInCommand.slice(4, wordsInCommand.length).join(' ')}` :
            `<@${this.giverId}> didn't give reason for giving points.`;
    }

    validate() {
        try {
            if (this.isReceiverUserIdValid) {
                throw new Error(`I can't see for who you want to give points :(`);
            }

            if (this.validReceiverId === this.giverId) {
                throw new Error('You cant add points for your self :(');
            }

            if (Number.isNaN(Number(this.points))) {
                throw new Error(`You gave: ${this.points} and it is not valid amount of points :(`);
            }

            this.errorObject.isValid = true
        } catch (ex) {
            this.errorObject.isValid = false
            this.errorObject.message = ex.message
        }
    }

    async handleCommand() {
        this.validate()
        if (this.isValid) {
            try {
                await transferKudos(this.team_id, this.transfer)
                sendResponseMessageToSlack(this.getInformationWhyUserGetsPoints(), this.slackEvent)
            } catch (ex) {
                sendResponseMessageToSlack(ex, this.slackEvent)
            }
        } else {
            sendResponseMessageToSlack(this.errorMessage, this.slackEvent)
        }
    }
}