import axios from 'axios'
import SlackClientService from "./slackClient"

interface IAuthTestResponse {
  ok: boolean
  url: string
  team: string
  user: string
  team_id: string
  user_id: string
}

export default class AuthService {
  private slackClientService: SlackClientService

  constructor() {
    this.slackClientService = new SlackClientService()
  }

  public async checkAuth(token: string) {
    return await this.slackClientService
      .checkAuth(token) as IAuthTestResponse
  }

  public async login(code: string) {
    return await axios.get('https://slack.com/api/oauth.access', {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: process.env.SLACK_AUTH_REDIRECT_URI
      }
    })
  }
}
