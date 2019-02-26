import { WebClient } from '@slack/client'

let clients : any = {}
export function initWebApi(workspace: any) {
    clients[workspace.teamName] = new WebClient(workspace.botAccessToken)
}

export function getWebClient(teamName: string): WebClient {
    return clients[teamName]
}