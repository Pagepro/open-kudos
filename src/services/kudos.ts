import cron from 'node-cron'
import { getUser, updateUser, resetAllUsersGiveableKudos } from './db/users'
import { saveTransfer } from './db/transfer'
import User from '../models/user'
import Transfer from '../models/transfer'

export function transferKudos(teamId: string, transfer: Transfer) {
    const {
        senderId,
        receiverId,
        value
    } = transfer
    return new Promise((resolve, reject) => {
        Promise.all([
            getUser(teamId, senderId),
            getUser(teamId, receiverId)
        ]).then(([sender, receiver]: [User, User]) => {
            if (sender.kudosGiveable >= value) {
                sender.kudosGiveable -= value
                receiver.kudosGranted += value
                receiver.kudosSpendable += value
                Promise.all([
                    updateUser(teamId, senderId, sender),
                    updateUser(teamId, receiverId, receiver),
                    saveTransfer(teamId, transfer)
                ]).then(() => {
                    resolve()
                })
            } else {
                reject('Not enough kudos')
            }
        })
    })
}

export function setCronTask() {
    cron.schedule('0 0 1 * *', () => {
        console.log('cron task start')
        resetAllUsersGiveableKudos().then(() => {
            console.log('cron task end successful')
        })
    })
}