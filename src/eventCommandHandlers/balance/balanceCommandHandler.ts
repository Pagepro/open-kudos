import { sendResponseMessageToSlack } from '../eventResponse'
import getText from '../../services/translations'
import dictionary from '../../services/translations/dictionary'
import { ISlackEventInfo } from '../interfaces'
import { getKudosBalance } from '../../services/kudos'

export default class BalanceCommandHandler {
    channel: string
    team_id: string
    userId: string
    slackEvent: ISlackEventInfo

    constructor(slackEventInfo: ISlackEventInfo) {
        const { team_id } = slackEventInfo
        const { user, channel } = slackEventInfo.event

        this.channel = channel
        this.team_id = team_id
        this.userId = user
        this.slackEvent = slackEventInfo
    }

    async getBalanceInformation() {
        const balanceInformation = await getKudosBalance(this.team_id, this.userId)
        return balanceInformation
    }

    async handleCommand() {
        const responseMessage = await this.getBalanceInformation()
        sendResponseMessageToSlack(responseMessage, this.slackEvent)
    }
}