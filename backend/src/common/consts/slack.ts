import { SlackActionsCallbacks } from "../factories/definitions/slackCommandHandlerFactory"
import Config from './config'

export default class SlackConsts {
  public static get slackAuthUrl(): string {
    return 'https://slack.com/api/oauth.access'
  }

  public static get buyGiftCallback(): string {
    return SlackActionsCallbacks.BuyGift.toString()
  }

  public static get directMessageType(): string {
    return 'directmessage'
  }

  public static get slackInstallLink(): string {
    // tslint:disable-next-line: max-line-length
    return `https://slack.com/oauth/authorize?client_id=${Config.clientId}&scope=bot,channels:read,chat:write:bot,groups:read,users:read,commands&redirect_uri=${Config.installRedirectUrl}`
  }

  public static get slackLoginLink(): string {
    // tslint:disable-next-line: max-line-length
    return `https://slack.com/oauth/authorize?scope=identify&amp;client_id=${Config.clientId}&redirect_uri=${Config.authRedirectUrl}`
  }

  public static get slackClientId(): string {
    return process.env.CLIENT_ID
  }
}
