export default class GiveCommandHandler {
    points: string
    giverUserId: string
    receiverUserId: string
    messageWhyPointsWasGiven: string
    errorObject = {
        isValid: false,
        message: ''
    }

    constructor(giverUserId: string, points: string, receiverUserId: string, messageWhyPointsWasGiven: string) {
        this.giverUserId = giverUserId
        this.points = points
        this.receiverUserId = receiverUserId
        this.messageWhyPointsWasGiven = messageWhyPointsWasGiven
    }

    get validReceiverUserId() {
        return this.receiverUserId.substring(2, this.receiverUserId.length - 1)
    }

    get isValid() {
        return this.errorObject.isValid
    }

    get errorMessage() {
        return this.errorObject.message
    }

    async validate() {
        try {
            if (this.receiverUserId.match(/^<@.*>$/).length <= 0) {
                throw new Error(`I can't see for who you want to give points :(`);
            }

            if (this.validReceiverUserId === this.giverUserId) {
                throw new Error('You cant add points for your self :(');
            }

            if (Number.isNaN(Number(this.points))) {
                throw new Error(`You gave: ${this.points} and it is not valid amount of points :(`);
            }

            this.errorObject.isValid = true
        } catch (ex) {
            this.errorObject.isValid = false
            this.errorObject.message = ex.message
            // TODO: add logger service
        }
    }

    givePoints() { }
}