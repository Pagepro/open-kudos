import { WebAPICallResult, WebClient } from '@slack/client'
import { ISlackEventInfo } from '../controllers/definitions/slackController'
import { IUser } from '../models/user.model'
import { IWorkspace } from '../models/workspace.model'
import Workspace from '../models/workspace.model'

interface ISlackUserResponse {
  id: string
  team_id: string
  name: string
  deleted: boolean
  profile: ISlackProfileResponse
  is_admin?: boolean
  is_owner?: boolean
  is_primary_owner?: boolean
  is_bot: boolean
  is_app_user: boolean
}

interface ISlackProfileResponse {
  title: string
  phone: string
  skype: string
  real_name: string
  real_name_normalized: string
  display_name: string
  display_name_normalized: string
  status_text: string
  status_emoji: string
  status_expiration: number,
  avatar_hash: string
  email: string
  image_24: string
  image_32: string
  image_48: string
  image_72: string
  image_192: string
  image_512: string
  status_text_canonical: string,
  team: string
}

interface IExtendedWebApiCallResult extends WebAPICallResult {
  members: ISlackUserResponse[]
}

export default class SlackClientService {
  public static clients: StringTMap<WebClient> = {}

  public static initWebClient(workspace: IWorkspace) {
    this.clients[workspace.teamId] = new WebClient(workspace.botAccessToken)
  }

  public static async  getWebClient(teamId: string): Promise<WebClient> {
    if (this.clients[teamId]) {
      return this.clients[teamId]
    } else {
      const workspace = await Workspace.findOne({ teamId })
      this.clients[teamId] = new WebClient(workspace.botAccessToken)
      return this.clients[teamId]
    }
  }

  public static async sendMessage(text: string, eventInfo: ISlackEventInfo) {
    const { team_id, event: { channel } } = eventInfo
    const client = await this.getWebClient(team_id)
    client.chat.postMessage({ channel, text })
  }

  public static async getWorkspaceMembers(teamId: string) {
    const client = await this.getWebClient(teamId)
    const webApiResult = await client.users.list() as IExtendedWebApiCallResult
    if (webApiResult.ok) {
      return webApiResult.members
        .filter(user =>
          !user.is_bot && !user.deleted && user.name !== 'slackbot'
        ).map(user => {
          return {
            isAdmin: user.is_admin ? user.is_admin : false,
            name: user.name,
            realName: user.profile.real_name,
            teamId: user.team_id,
            userId: user.id
          } as IUser
        })
    }

    return []
  }
}
