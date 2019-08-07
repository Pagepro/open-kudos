import { KnownBlock } from "@slack/client"
import { IMessageConsumer, ISlackCommandInfo } from "../../controllers/definitions/slackController"
import SlackConsts from "../consts/slack"
import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import LoggerService from "../services/logger"
import SlackClientService from "../services/slackClient"
import TranslationsService from "../services/translationsService"
import UserService from "../services/user"

abstract class BaseSlackCommandHandler {
  get commandText() {
    const { text } = this.commandInfo

    return text
  }

  get senderId() {
    const { user_id } = this.commandInfo

    return user_id
  }

  get teamId() {
    const { team_id } = this.commandInfo

    return team_id
  }

  protected translationsService = new TranslationsService()
  protected slackClientService = new SlackClientService()
  protected userService = new UserService()
  protected logger = new LoggerService()

  constructor(protected commandInfo: ISlackCommandInfo) { }

  public sendMessage(
    text: string,
    consumer: IMessageConsumer,
    type?: SlackResponseType,
    blocks?: KnownBlock[],
  ): void {
    this.slackClientService.sendMessage(text, consumer, type, blocks)
  }

  public async handleCommand(): Promise<void> {
    try {
      await this.validate()
      await this.onHandleCommand()
    } catch ({ message }) {
      this.sendMessage(
        message,
        await this.getMessageConsumer(),
        SlackResponseType.Hidden
      )
    }
  }

  public abstract onHandleCommand(): void

  public getCustomMessageConsumer(
    teamId: string,
    channel: string,
    user?: string
  ): IMessageConsumer {
    return { teamId, channel, user }
  }

  protected async validate(): Promise<void> {
    return
  }

  protected async getMessageConsumer() {
    const { team_id, channel_id, channel_name, user_id } = this.commandInfo
    const channel = channel_name === SlackConsts.directMessageType
      ? await this.getKudosBotChannelId(team_id, user_id)
      : channel_id

    const messageConsumer: IMessageConsumer = {
      channel,
      teamId: team_id,
      user: user_id
    }

    return messageConsumer
  }

  private async getKudosBotChannelId(teamId, userId) {
    return await this.slackClientService.getKudosBotChannelId(teamId, userId)
  }
}

export default BaseSlackCommandHandler
