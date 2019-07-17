import axios from 'axios'
import Config from '../consts/config'
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
          client_id: Config.clientId,
          client_secret: Config.clientSecret,
          code,
          redirect_uri: Config.authRedirectUrl
        }
      })

    return response.data
  }
}
