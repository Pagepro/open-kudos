import { database, CustomDb } from '../../config/mongodb'
import Workspace, { schema } from '../../models/workspace'
import { initWebApi } from '../webApi/client'
import { initWorkspaceUsers } from './users'
import { initWorkspaceTransfers } from './transfer';

export function insertWorkspace(workspaceObj: {}) {
    const workspace = new Workspace(workspaceObj)
    database.then((db: CustomDb) => {
        db.collection('workspaces').updateOne({
            teamId: { $eq: workspace.teamId }
        }, {
            $setOnInsert: workspace
        }, {
            upsert: true
        })
        initWorkspace(db, workspace)
    })
}

export function initWorkspaces() {
    database.then((db: CustomDb) => {
        db.createCollection('workspaces', {
            validator: {
                $jsonSchema: schema
            }
        })
        db.collection('workspaces').find().forEach((workspace) => {
            initWorkspace(db, workspace)
        })
    })
}

function initWorkspace(db: CustomDb, workspace: any) {
    db.workspaces[workspace.teamName] = { ...workspace }
    initWebApi(db.workspaces[workspace.teamName])
    initWorkspaceUsers(workspace.teamName)
    initWorkspaceTransfers(workspace.teamName)
}