import { database, CustomDb } from '../../config/mongodb'
import Transfer, { schema } from '../../models/transfer'

export function initWorkspaceTransfers( teamName: string) {
    database.then((db: CustomDb) => {
        db.createCollection(`${teamName}_transfers`, {
            validator: {
                $jsonSchema: schema
            }
        })
    })
}

export function saveTransfer(teamName: string, transfer: Transfer) {
    return database.then((db: CustomDb) => {
        return db.workspaceCollection(teamName, 'transfers').insertOne(transfer)
    })

}
