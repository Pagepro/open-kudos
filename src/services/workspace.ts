import '../models/workspace.model'
import Workspace, { IWorkspace } from '../models/workspace.model'

export default class WorkspaceService {
  public static async create(workspace: IWorkspace) {
    let operationResult = false
    try {
      await Workspace.updateOne(
        { teamId: workspace.teamId },
        workspace,
        { upsert: true }
      )
      operationResult = true
    } catch (ex) {
      operationResult = false
      // handle error
    }
    return operationResult
  }
}
