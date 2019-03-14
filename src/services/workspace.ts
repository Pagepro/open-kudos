import '../models/workspace.model'
import Workspace, { IWorkspace } from '../models/workspace.model'

export default class WorkspaceService {
  public static create(workspace: IWorkspace) {
    return Workspace.update(workspace, { upsert: true })
  }
}
