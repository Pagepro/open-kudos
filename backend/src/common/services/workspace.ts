import { DocumentQuery } from 'mongoose'
import ISettings, { SettingsEnum } from '../../controllers/settingsController/models/ISettings'
import { ISettingDocument } from '../../models/setting.model'
import '../../models/workspace.model'
import Workspace, { IWorkspace } from '../../models/workspace.model'
import LoggerService from './logger'
import SettingService from './settings'
import SlackClientService from './slackClient'

export interface IKudosAmountForWorkspace {
  teamId: string
  monthlyKudosAmount: number
}

export default class WorkspaceService {
  private logger = new LoggerService()
  private settingService = new SettingService()
  private slackClientService = new SlackClientService()

  public async create(workspace: IWorkspace) {
    try {
      const defaultSettings = await this.settingService.createDefaultSettings()
      const defaultSettingsIds = SettingService
        .getDefaultSettingsIds(defaultSettings)

      await Workspace.updateOne(
        { teamId: workspace.teamId },
        { ...workspace, settings: defaultSettingsIds },
        { upsert: true }
      )
    } catch (error) {
      this.logger.logError(error)
    }
  }

  public async getAllTeamsKudosMonthlyAmount() {
    return await Workspace
      .find({})
      .select({
        monthlyKudosAmount: 1,
        teamId: 1
      }) as IKudosAmountForWorkspace[]
  }

  public async getKudosMonthlyAmount(teamId: string): Promise<number> {
    const workspace = await Workspace.findOne({ teamId })
    return workspace.monthlyKudosAmount || 100
  }

  public async updateSetting(teamId: string, settings: ISettings) {
    try {
      const operations:
        Array<DocumentQuery<ISettingDocument, ISettingDocument, {}>> = []
      const workspace = await Workspace.findOne({ teamId }).populate('settings')
      const { settings: workspaceSettings } = workspace
      const { botResponseChannelId } = settings

      this.slackClientService
        .setBotResponseChannel(teamId, botResponseChannelId)

      for (const settingKey of Object.keys(settings)) {
        const workspaceSetting = workspaceSettings
          .find(({ key }) => key === settingKey)

        operations.push(this.settingService
          .updateSetting(workspaceSetting._id, settings[settingKey]))
      }

      await Promise.all(operations)
    } catch (error) {
      this.logger.logError(error.message)
    }
  }

  public async getResponseBotChannelId(teamId: string): Promise<string> {
    let responseChannelId = SlackClientService.botResponseChannelsIds[teamId]
    if (responseChannelId) {
      return responseChannelId
    } else {
      responseChannelId = await this.
        getWorkspaceSetting(teamId, SettingsEnum.BotResponseChannelId)

      if (responseChannelId) {
        return responseChannelId
      } else {
        return await this.slackClientService.getGeneralChannelId(teamId)
      }
    }
  }

  private async getWorkspaceSetting(teamId: string, settingKey: string) {
    const workspace = await Workspace.findOne({ teamId }).populate('settings')
    const { settings } = workspace
    const workspaceSetting = settings.find(({ key }) => key === settingKey)
    return workspaceSetting.value || ''
  }

}
