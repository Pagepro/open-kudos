import { WebClient } from '@slack/client'

const clients : any = {}
export function initWebApi(workspace: any) {
    clients[workspace.teamId] = new WebClient(workspace.botAccessToken)
}

export function getWebClient(teamId: string): WebClient {
    return clients[teamId]
}
