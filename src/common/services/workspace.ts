import '../../models/workspace.model'
import Workspace, { IWorkspace } from '../../models/workspace.model'
import LoggerService from './logger'

export default class WorkspaceService {
  private logger = new LoggerService()
  public async create(workspace: IWorkspace) {
    try {
      await Workspace.updateOne(
        { teamId: workspace.teamId },
        workspace,
        { upsert: true }
      )
      return true
    } catch (error) {
      this.logger.logError(error)
    }

    return false
  }
}
