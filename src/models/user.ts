interface UserInterface {
    slackId: string,
    kudosRemaining: number,
    kudosReceived: number
}

export default class User implements UserInterface {
    slackId: string;
    kudosRemaining: number;
    kudosReceived: number;
    constructor() {
        this.kudosReceived = 0
        this.kudosRemaining = 0
    }
}
