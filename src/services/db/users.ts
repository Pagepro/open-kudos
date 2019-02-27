import { database, CustomDb } from '../../config/mongodb'
import User, { schema } from '../../models/user'
import { getWebClient } from '../webApi/client'

export function initWorkspaceUsers( teamName: string) {
    database.then((db: CustomDb) => {
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
                    $setOnInsert: user
                }, {
                    upsert: true
                })

            })
        })
    })
}

export function getUser(teamName: string, userId: string) {
    return database.then((db: CustomDb) => {
        return db.workspaceCollection(teamName, 'users').findOne({
            userId: { $eq: userId }
        })
    })

}

export function updateUser(teamName: string, userId: string, updatedUser: User) {
    return database.then((db: CustomDb) => {
        return db.workspaceCollection(teamName, 'users').updateOne({
            userId: { $eq: userId }
        }, {
            $set: updatedUser
        })
    })
}

export function resetUsersGiveableKudos(teamName: string) {
    return database.then((db: CustomDb) => {
        return db.workspaceCollection(teamName, 'users').updateMany({}, {
            $set: { kudosGiveable: 100 }
        })
    })
}

export function resetAllUsersGiveableKudos() {
    return database.then((db: CustomDb) => {
        return Promise.all([Object.keys(db.workspaces).map((teamName: string) => {
            return resetUsersGiveableKudos(teamName)
        })])
    })
}