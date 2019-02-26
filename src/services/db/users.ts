import { database, CustomDb } from '../../config/mongodb'
import User, { schema } from '../../models/user'
import { getWebClient } from '../webApi/client'

export function initWorkspaceUsers( teamName: string) {
    database.subscribe({
        next: (db: CustomDb) => {
            db.createCollection(`${teamName}_users`, {
                validator: {
                    $jsonSchema: schema
                }
            })
            getWebClient(teamName).users.list()
            .then((response: any) => {
                response.members
                .filter((member: any) => {
                    return !member.is_bot && member.name !== 'slackbot'
                })
                .forEach((member: any) => {
                    const user = new User(member)
                    db.workspaceCollection(teamName, 'users').updateOne({
                        userSlackId: { $eq: user.userSlackId }
                    }, {
                        $set: user
                    }, {
                        upsert: true
                    })

                })
            })
        }
    })
}