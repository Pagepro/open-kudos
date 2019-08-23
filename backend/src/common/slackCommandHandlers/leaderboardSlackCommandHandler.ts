import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import UserService from "../services/user"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class LeaderboardSlackCommandHandler extends
  BaseSlackCommandHandler {
  public async onHandleCommand() {
    this.sendMessage(
      this.translationsService.getTranslation("leaderboard"),
      await this.getMessageConsumer(),
      SlackResponseType.Hidden,
      await this.getLeaderboardBlocks()
    )
  }

  public getLeaderboardBlocks() {
    const userService = new UserService()

    return userService.getLeaderboardBlocks(this.teamId)
  }
}
