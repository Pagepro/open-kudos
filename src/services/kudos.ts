import { getUser, updateUser } from './users'
import User from '../../models/user'


export function transferKudos(teamName: string, senderId: string, receiverId: string, value: number) {
    return new Promise((resolve, reject) => {
        Promise.all([
            getUser(teamName, senderId),
            getUser(teamName, receiverId)
        ]).then(([sender, receiver]: [User, User]) => {
            if (sender.kudosGiveable >= value) {
                sender.kudosGiveable -= value
                receiver.kudosGranted += value
                receiver.kudosSpendable += value
                updateUser(teamName, senderId, sender)
                updateUser(teamName, receiverId, receiver)
                resolve()
            } else {
                reject('Not enough kudos')
            }
        })
    })
}
