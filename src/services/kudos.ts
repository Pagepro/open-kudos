import cron from 'node-cron'
import { getUser, updateUser, resetAllUsersGiveableKudos } from './db/users'
import { saveTransfer } from './db/transfer'
import User from '../models/user'
import Transfer from '../models/transfer'
import dictionary from './translations/dictionary';
import getText from './translations';

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
                reject(getText(dictionary.NOT_ENOUGH_KUDOS_TO_TRANSFER))
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

export async function getKudosBalance(teamId: string, userId: string) {
    const user = await getUser(teamId, userId)
    return `Here is your current balance \n\nGiveable Balance\n${user.kudosGiveable} Kudos\nGiveable balances reset at the beginning of the month. Use 'em or lose 'em\n\nSpendable Balance\n${user.kudosSpendable} Kudos \nSpendable Kudos never expire. Use them to buy cool things in the store`
}