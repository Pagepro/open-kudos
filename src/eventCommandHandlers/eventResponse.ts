import { ISlackEventInfo } from './interfaces'
import { getWebClient } from '../services/webApi/client'

export function sendResponseMessageToSlack(text: string, slackEventInfo: ISlackEventInfo) {
    const { channel } = slackEventInfo.event

    getWebClient(slackEventInfo.team_id).chat.postMessage({ channel, text })
}