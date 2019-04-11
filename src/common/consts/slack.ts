import { SlackActionsCallbacks } from "../factories/definitions/slackCommandHandlerFactory"

export default class SlackConsts {
  public static get slackAuthUrl(): string {
    return 'https://slack.com/api/oauth.access'
  }

  public static get mainChannelName(): string {
    return 'general'
  }

  public static get buyGiftCallback(): string {
    return SlackActionsCallbacks.buyGift.toString()
  }
}
