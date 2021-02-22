import { KnownBlock, WebClient } from '@slack/client'
import { IMessageConsumer } from '../../controllers/definitions/slackController'
import { SettingsEnum } from '../../controllers/settingsController/models/ISettings'
import { IUser } from '../../models/user.model'
import { IWorkspace } from '../../models/workspace.model'
import Workspace from '../../models/workspace.model'
import { SlackResponseType } from '../factories/definitions/slackCommandHandlerFactory'
import SettingService from '../services/settings'
import {
  IExtendedWebApiCallResult,
  IImOpenResponse
} from './definitions/slackApi'
import axios, { AxiosRequestConfig } from 'axios'


export default class SlackClientService {
  public static clients: IStringTMap<WebClient> = {}
  public static botResponseChannelsIds: IStringTMap<string> = {}
  public static authClient = new WebClient()
  private settingService = new SettingService()

  public initWebClient(workspace: IWorkspace) {
    SlackClientService.clients[workspace.teamId] =
      new WebClient(workspace.botAccessToken)
  }

  public async checkAuth(token: string) {
    return await SlackClientService.authClient.auth.test({ token })
  }

  public async userInfo(teamId: string, userId: string) {
    const client = await this.getWebClient(teamId)
    const workspace = await Workspace.findOne({ teamId })

    return await client
      .users
      .info({ token: workspace.botAccessToken, user: userId })
  }

  public async revoke(token: string) {
    return await SlackClientService.authClient.auth
      .revoke({ token, test: false })
  }

  public async getWebClient(teamId: string): Promise<WebClient> {
    if (SlackClientService.clients[teamId]) {
      return SlackClientService.clients[teamId]
    } else {
      const workspace = await Workspace.findOne({ teamId })
      SlackClientService.clients[teamId] =
        new WebClient(workspace.botAccessToken)
      return SlackClientService.clients[teamId]
    }
  }

  public async getAllConversations(teamId: string) {
    const workspace = await Workspace.findOne({ teamId })
    const configPublic: AxiosRequestConfig = {
      method: 'get',
      url: 'https://slack.com/api/conversations.list?types=public_channel&pretty=1',
      headers: {
        'Authorization': `Bearer ${workspace.botAccessToken}`
      }
    }
    const configPrivate: AxiosRequestConfig = {
      method: 'get',
      url: 'https://slack.com/api/conversations.list?types=private_channel&pretty=1',
      headers: {
        'Authorization': `Bearer ${workspace.botAccessToken}`
      }
    }
    const configMpim: AxiosRequestConfig = {
      method: 'get',
      url: 'https://slack.com/api/conversations.list?types=mpim&pretty=1',
      headers: {
        'Authorization': `Bearer ${workspace.botAccessToken}`
      }
    }
    const configIm: AxiosRequestConfig = {
      method: 'get',
      url: 'https://slack.com/api/conversations.list?types=im&pretty=1',
      headers: {
        'Authorization': `Bearer ${workspace.botAccessToken}`
      }
    }

    let channels = [];
    let { data: resPub } = await axios(configPublic)
    let { ok: okPub, channels: channelsPub } = resPub
    if (okPub) channels = channels.concat(channelsPub)

    let { data: resPri } = await axios(configPrivate)
    let { ok: okPri, channels: channelsPri } = resPri
    if (okPri) channels = channels.concat(channelsPri)

    let { data: resMpim } = await axios(configMpim)
    let { ok: okMpim, channels: channelsMpim } = resMpim
    if (okMpim) channels = channels.concat(channelsMpim)

    let { data: resIm } = await axios(configIm)
    let { ok: okIm, channels: channelsIm } = resIm
    if (okIm) channels = channels.concat(channelsIm)

    return channels
  }

  public async getDefaultChannelId(teamId: string): Promise<string> {
    if (SlackClientService.botResponseChannelsIds[teamId]) {
      return SlackClientService.botResponseChannelsIds[teamId]
    } else {
      const channels = await this.getAllConversations(teamId)
      const { id: generalChannelId } = channels.find(({ is_general }) => is_general)
      SlackClientService.botResponseChannelsIds[teamId] = generalChannelId
      return generalChannelId
    }
  }

  public async sendMessage(
    text: string,
    consumer: IMessageConsumer,
    type: SlackResponseType = SlackResponseType.Standard,
    blocks?: KnownBlock[],
  ) {
    const { teamId, channel, user } = consumer
    const client = await this.getWebClient(teamId)

    switch (type) {
      case SlackResponseType.Hidden:
        client.chat.postEphemeral({ channel, text, user, blocks })
        break

      case SlackResponseType.General:
        client.chat.postMessage({
          blocks,
          channel: await this.getResponseBotChannelId(teamId),
          text
        })
        break

      case SlackResponseType.Standard:
      default:
        client.chat.postMessage({ channel, text, blocks })
    }
  }

  public async getWorkspaceMembers(
    teamId: string,
    archived = false
  ): Promise<IUser[]> {
    const client = await this.getWebClient(teamId)
    const webApiResult = await client.users.list() as IExtendedWebApiCallResult

    if (webApiResult.ok) {
      return webApiResult.members
        .filter(({ is_bot, name, deleted }) =>
          !is_bot && deleted === archived && name !== 'slackbot'
        ).map(({
          is_admin,
          profile,
          name,
          team_id,
          id
        }) => ({
          email: profile.email,
          isAdmin: is_admin ? is_admin : false,
          name,
          realName: profile.real_name,
          teamId: team_id,
          userId: id
        })
        )
    }

    return []
  }

  public setBotResponseChannel(teamId: string, channelId: string) {
    SlackClientService.botResponseChannelsIds[teamId] = channelId
  }

  public async getResponseBotChannelId(teamId: string): Promise<string> {
    const responseChannelId = SlackClientService.botResponseChannelsIds[teamId]
    if (responseChannelId) {
      return responseChannelId
    }

    const settingsResponseChannelId = await this.settingService.
      getWorkspaceSetting(teamId, SettingsEnum.BotResponseChannelId)

    return settingsResponseChannelId || await this.getDefaultChannelId(teamId)
  }
}
