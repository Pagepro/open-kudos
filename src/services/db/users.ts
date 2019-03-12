import { database, CustomDb } from '../../config/mongodb'
import User, { schema } from '../../models/user'
import { getWebClient } from '../webApi/client'

export interface IUser {
    userId: string,
    isAdmin: boolean,
    kudosGiveable: number,
    kudosGranted: number,
    kudosSpendable: number,
    locale: string,
    name: string,
    realName: string
}

export function initWorkspaceUsers(teamId: string) {
    database().then((db: CustomDb) => {
        db.createCollection(`${teamId}_users`, {
            validator: {
                $jsonSchema: schema
            }
        })
        getWebClient(teamId).users.list()
            .then((response: any) => {
                response.members
                    .filter((member: any) => {
                        return !member.is_bot && member.name !== 'slackbot' && !member.deleted
                    })
                    .forEach((member: any) => {
                        const user = new User(member)
                        db.workspaceCollection(teamId, 'users').updateOne({
                            userId: { $eq: user.userId }
                        }, {
                                $setOnInsert: user
                            }, {
                                upsert: true
                            })

                    })
            })
    })
}

export function getUser(teamId: string, userId: string): Promise<IUser> {
    return database().then((db: CustomDb) => {
        return db.workspaceCollection(teamId, 'users').findOne({
            userId: { $eq: userId }
        })
    })

}

export function updateUser(teamId: string, userId: string, updatedUser: User) {
    return database().then((db: CustomDb) => {
        return db.workspaceCollection(teamId, 'users').updateOne({
            userId: { $eq: userId }
        }, {
                $set: updatedUser
            })
    })
}

export function resetUsersGiveableKudos(teamId: string) {
    return database().then((db: CustomDb) => {
        return db.workspaceCollection(teamId, 'users').updateMany({}, {
            $set: { kudosGiveable: 100 }
        })
    })
}

export function resetAllUsersGiveableKudos() {
    return database().then((db: CustomDb) => {
        return Promise.all([Object.keys(db.workspaces).map((teamId: string) => {
            return resetUsersGiveableKudos(teamId)
        })])
    })
}