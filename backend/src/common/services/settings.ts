import { DocumentQuery } from "mongoose"
import ISettings, { SettingsEnum } from "../../controllers/settingsController/models/ISettings"
import Setting, { ISetting, ISettingDocument } from "../../models/setting.model"
import Workspace from "../../models/workspace.model"
import { IKudosAmountForWorkspace } from "./definitions/settingsService"
import LoggerService from "./logger"

export default class SettingsService {
  public static getDefaultSettingsIds(settings: ISettingDocument[]) {
    return settings.map(({ _id }) => _id)
  }

  private logger = new LoggerService()
  private defaultSettings: ISetting[] = [
    {
      key: SettingsEnum.BotResponseChannelId,
      value: String.empty
    },
    {
      key: SettingsEnum.MonthlyKudosAmount,
      value: '100'
    }
  ]

  public async createDefaultSettings() {
    return await Setting.insertMany(this.defaultSettings)
  }

  public updateSetting(id: string, value: string) {
    return Setting.findByIdAndUpdate(id, { value })
  }

  public async getWorkspaceSetting(teamId: string, settingKey: string) {
    const workspace = await Workspace.findOne({ teamId }).populate('settings')
    const { settings } = workspace
    const workspaceSetting = settings.find(({ key }) => key === settingKey)

    return workspaceSetting.value || String.empty
  }

  public async getKudosMonthlyAmount(teamId: string): Promise<number> {
    const kudosAmount =
      await this.getWorkspaceSetting(teamId, SettingsEnum.MonthlyKudosAmount)

    return Number(kudosAmount) || 100
  }

  public async updateWorkspaceSettings(teamId: string, settings: ISettings) {
    try {
      const operations:
        Array<DocumentQuery<ISettingDocument, ISettingDocument, {}>> = []
      const workspace = await Workspace.findOne({ teamId }).populate('settings')
      const { settings: workspaceSettings } = workspace

      for (const settingKey of Object.keys(settings)) {
        const workspaceSetting = workspaceSettings
          .find(({ key }) => key === settingKey)

        operations.push(this.updateSetting(
          workspaceSetting._id,
          settings[settingKey]
        ))
      }

      await Promise.all(operations)
    } catch (error) {
      this.logger.logError(error.message)
    }
  }

  public async getAllTeamsKudosMonthlyAmount() {
    const allWorkspaces = await Workspace
      .find({})
      .populate('settings')

    const monthlyKudosAmountForTeam = allWorkspaces
      .map(workspace => {
        const teamId = workspace.teamId
        const settingMonthlyKudosAmount =
          workspace
            .settings
            .find(({ key }) => key === SettingsEnum.MonthlyKudosAmount)

        const monthlyKudosAmount = settingMonthlyKudosAmount.value || 100
        return { teamId, monthlyKudosAmount }
      })

    return monthlyKudosAmountForTeam as IKudosAmountForWorkspace[]
  }
}
