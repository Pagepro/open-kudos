import ISettings from "../../controllers/settingsController/models/ISettings"
import Workspace, { IWorkspace } from "../../models/workspace.model"
import LoggerService from "./logger"
import SlackClientService from "./slackClient"


export default class SettingsService {
  private slackClientService: SlackClientService
  private logger: LoggerService

  constructor() {
    this.slackClientService = new SlackClientService()
    this.logger = new LoggerService()
  }

  public async save(teamId: string, settings: ISettings) {
    const { channelId } = settings
    try {
      this.slackClientService.setBotResponseChannel(teamId, channelId)
      await Workspace.findOneAndUpdate(
        { teamId },
        { botResponseChannelId: channelId }
      )
    } catch (error) {
      this.logger.logError(error.message)
    }
  }
}
