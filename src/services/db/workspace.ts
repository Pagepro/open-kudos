import { database, CustomDb } from '../../config/mongodb'
import Workspace from '../../models/workspace'

export function insertWorkspace(workspaceObj: {}) {
    const workspace = new Workspace(workspaceObj)
    database.subscribe({
        next: (db: CustomDb) => {
            db.collection('workspaces').replaceOne({
                teamId: { $eq: workspace.teamId }
            }, workspace, {
                upsert: true
            })
            db.workspaces[workspace.teamName] = { ...workspace }
        }
    })
}

export function fetchWorkspaces() {
    database.subscribe({
        next: (db: CustomDb) => {
            db.collection('workspaces').find().forEach((workspace) => {
                db.workspaces[workspace.teamName] = { ...workspace }
            })
        }
    })
}
