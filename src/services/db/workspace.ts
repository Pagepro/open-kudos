import { database, CustomDb } from '../../config/mongodb'
import Workspace, { schema } from '../../models/workspace'
import { initWebApi } from '../webApi/client'
import { initWorkspaceUsers } from './users'

export function insertWorkspace(workspaceObj: {}) {
    const workspace = new Workspace(workspaceObj)
    database.subscribe({
        next: (db: CustomDb) => {
            db.collection('workspaces').updateOne({
                teamId: { $eq: workspace.teamId }
            }, {
                $set: workspace
            }, {
                upsert: true
            })
            db.workspaces[workspace.teamName] = { ...workspace }
            initWebApi(db.workspaces[workspace.teamName])
            initWorkspaceUsers(workspace.teamName)
        }
    })
}

export function initWorkspaces() {
    database.subscribe({
        next: (db: CustomDb) => {
            db.createCollection('workspaces', {
                validator: {
                    $jsonSchema: schema
                }
            })
            db.collection('workspaces').find().forEach((workspace) => {
                db.workspaces[workspace.teamName] = { ...workspace }
                initWebApi(db.workspaces[workspace.teamName])
                initWorkspaceUsers(workspace.teamName)
            })
        }
    })
}

