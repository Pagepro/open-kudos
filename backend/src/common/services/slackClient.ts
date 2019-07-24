import { MessageAttachment, WebClient } from '@slack/client'
import { IMessageConsumer } from '../../controllers/definitions/slackController'
import { IUser } from '../../models/user.model'
import { IWorkspace } from '../../models/workspace.model'
import Workspace from '../../models/workspace.model'
import { SlackResponseType } from '../factories/definitions/slackCommandHandlerFactory'
import {
  IChannelsListResponse,
  IExtendedWebApiCallResult,
  IImOpenResponse,
  ISlackUserResponse
} from './definitions/slackApi'

export default class SlackClientService {
  public static clients: IStringTMap<WebClient> = {}
  public static generalChannels: IStringTMap<string> = {}
  public static authClient = new WebClient()

  public initWebClient(workspace: IWorkspace) {
    SlackClientService.clients[workspace.teamId] =
      new WebClient(workspace.botAccessToken)
  }

  public async checkAuth(token: string) {
    return await SlackClientService.authClient.auth.test({ token })
  }

  public async revoke(token: string) {
    return await SlackClientService.authClient.auth
      .revoke({ token, test: false })
  }

  public async  getWebClient(teamId: string): Promise<WebClient> {
    if (SlackClientService.clients[teamId]) {
      return SlackClientService.clients[teamId]
    } else {
      const workspace = await Workspace.findOne({ teamId })
      SlackClientService.clients[teamId] =
        new WebClient(workspace.botAccessToken)
      return SlackClientService.clients[teamId]
    }
  }

  public async  getGeneralChannelId(teamId: string): Promise<string> {
    if (SlackClientService.generalChannels[teamId]) {
      return SlackClientService.generalChannels[teamId]
    } else {
      try {
        const client = await this.getWebClient(teamId)
        const response: IChannelsListResponse = await client.channels.list()
        const { ok, channels, error } = response

        if (ok) {
          const { id: generalChannelId } = channels
            .find(({ is_general }) => is_general)
          SlackClientService.generalChannels[teamId] = generalChannelId
          return generalChannelId
        } else {
          throw new Error(error)
        }
      } catch (error) {
        throw error
      }
    }
  }

  public async sendMessage(
    text: string,
    consumer: IMessageConsumer,
    type: SlackResponseType = SlackResponseType.Standard,
    attachments?: MessageAttachment[],
  ) {
    const { teamId, channel, user } = consumer
    const client = await this.getWebClient(teamId)

    switch (type) {
      case SlackResponseType.Hidden:
        client.chat.postEphemeral({ channel, text, user, attachments })
        break

      case SlackResponseType.General:
        client.chat.postMessage({
          attachments,
          channel: await this.getGeneralChannelId(teamId),
          text
        })
        break

      case SlackResponseType.Standard:
      default:
        client.chat.postMessage({ channel, text, attachments })
    }
  }

  public async getWorkspaceMembers(teamId: string, onlyActive = true) {
    const client = await this.getWebClient(teamId)
    const webApiResult = await client.users.list() as IExtendedWebApiCallResult

    if (webApiResult.ok) {
      return webApiResult.members
      .filter(user =>
        !user.is_bot && user.deleted === onlyActive && user.name !== 'slackbot'
        ).map(user => {
          return {
            email: user.is_admin ? user.profile.email : '',
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

  public async getKudosBotChannelId(teamId: string, userId: string) {
    try {
      const client = await this.getWebClient(teamId)
      const response: IImOpenResponse = await client.im.open({ user: userId })
      const { ok, channel: { id }, error } = response

      if (ok) {
        return id
      } else {
        throw new Error(error)
      }
    } catch (error) {
      throw error
    }
  }
}
