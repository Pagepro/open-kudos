import cron from 'node-cron'
import { getUser, updateUser, resetAllUsersGiveableKudos } from './db/users'
import { saveTransfer } from './db/transfer'
import User from '../models/user'
import Transfer from '../models/transfer'

export function transferKudos(teamName: string, transfer: Transfer) {
    const {
        senderId,
        receiverId,
        value
    } = transfer
    return new Promise((resolve, reject) => {
        Promise.all([
            getUser(teamName, senderId),
            getUser(teamName, receiverId)
        ]).then(([sender, receiver]: [User, User]) => {
            if (sender.kudosGiveable >= value) {
                sender.kudosGiveable -= value
                receiver.kudosGranted += value
                receiver.kudosSpendable += value
                Promise.all([
                    updateUser(teamName, senderId, sender),
                    updateUser(teamName, receiverId, receiver),
                    saveTransfer(teamName, transfer)
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