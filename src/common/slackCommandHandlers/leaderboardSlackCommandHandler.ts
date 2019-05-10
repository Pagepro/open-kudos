import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import UserService from "../services/user"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class LeaderboardSlackCommandHandler extends
  BaseSlackCommandHandler {
  public async onHandleCommand() {
    this.sendMessage(
      this.translationsService.getTranslation("leaderboard"),
      this.messageConsumer,
      SlackResponseType.Hidden,
      await this.getLeaderboardAttachments(),
    )
  }

  public getLeaderboardAttachments() {
    const userService = new UserService()

    return userService.getLeaderboardAttachments(this.teamId)
  }
}
