import { WebAPICallResult } from '@slack/client/dist/WebClient'
import axios from 'axios'
import SlackConsts from '../consts/slack'
import SlackClientService from './slackClient'

interface IAuthCommon {
  ok: boolean
  team_id: string
  user_id: string
}

interface IAuthTestResponse extends IAuthCommon {
  url: string
  team: string
  user: string
}

interface IAuthAccessResponse extends IAuthCommon {
  access_token: string
  scope: string
  team_name: string
}

export default class AuthService {
  private slackClientService: SlackClientService

  constructor() {
    this.slackClientService = new SlackClientService()
  }

  public async checkAuth(token: string) {
    return await this.slackClientService.checkAuth(token) as IAuthTestResponse
  }

  public async login(code: string) {
    const response = await axios
      .get<IAuthAccessResponse>(SlackConsts.slackAuthUrl, {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code,
          redirect_uri: process.env.SLACK_AUTH_REDIRECT_URI
        }
      })

    return response.data
  }
}
