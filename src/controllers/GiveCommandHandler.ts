import Transfer from '../models/transfer';

export default class GiveCommandHandler {
    points: string
    giverId: string
    receiverId: string
    fullSlackCommand: string
    errorObject = {
        isValid: false,
        message: ''
    }

    constructor(giverId: string, points: string, receiverId: string, fullSlackCommand: string) {
        this.giverId = giverId
        this.points = points
        this.receiverId = receiverId
        this.fullSlackCommand = fullSlackCommand
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

    getInformationWhyUserGetsPoints() {
        const wordsInCommand = this.fullSlackCommand.split(/\s+/)
        return wordsInCommand.length > 4 ?
            `<@${this.giverId}> give ${this.receiverId} ${this.points} ${wordsInCommand.slice(4, wordsInCommand.length).join(' ')}` :
            `<@${this.giverId}> didn't give reason for giving points.`;
    }

    async validate() {
        try {
            if (this.receiverId.match(/^<@.*>$/).length <= 0) {
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
}