import '../../models/workspace.model'
import Workspace, { IWorkspace } from '../../models/workspace.model'
import LoggerService from './logger'

export default class WorkspaceService {
  private logger = new LoggerService()
  public async create(workspace: IWorkspace) {
    let operationResult = false
    try {
      await Workspace.updateOne(
        { teamId: workspace.teamId },
        workspace,
        { upsert: true }
      )
      operationResult = true
    } catch (error) {
      operationResult = false
      this.logger.logError(error)
    }
    return operationResult
  }
}
