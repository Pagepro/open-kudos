import '../../models/workspace.model'
import Workspace, { IWorkspace } from '../../models/workspace.model'
import LoggerService from './logger'
import SettingService from './settings'

export default class WorkspaceService {
  private logger = new LoggerService()
  private settingService = new SettingService()

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

  public async update(workspace: IWorkspace) {
    try {
      await Workspace.updateOne(
        { teamId: workspace.teamId },
        { ...workspace },
        { upsert: true }
      )
    } catch (error) {
      this.logger.logError(error)
    }
  }

  public async isTeamExists(teamId: string) {
    const workspace = await Workspace.findOne({ teamId })
    return !!workspace
  }
}
