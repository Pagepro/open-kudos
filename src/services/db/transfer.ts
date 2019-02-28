import { database, CustomDb } from '../../config/mongodb'
import Transfer, { schema } from '../../models/transfer'

export function initWorkspaceTransfers(teamId: string) {
    database.then((db: CustomDb) => {
        db.createCollection(`${teamId}_transfers`, {
            validator: {
                $jsonSchema: schema
            }
        })
    })
}

export function saveTransfer(teamId: string, transfer: Transfer) {
    return database.then((db: CustomDb) => {
        return db.workspaceCollection(teamId, 'transfers').insertOne(transfer)
    })
}
